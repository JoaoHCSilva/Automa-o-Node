<#
.SYNOPSIS
Adiciona scripts personalizados ao package.json para desenvolvimento full-stack.

.DESCRIPTION
Este módulo atualiza o package.json gerado pelo Vite para incluir scripts
adicionais para executar o backend Node.js/Express.
Option B: Usa tsx em vez de ts-node e node --watch em vez de nodemon.

.PARAMETER caminho
O caminho raiz do projeto onde o package.json está localizado.

.PARAMETER extensao
A extensão do arquivo principal (js ou ts).

.NOTES
Autor: João Henrique
Data: 02/02/2026
Atualizado: tsx + node --watch (sem nodemon/ts-node)
#>

function Add-BackendScripts {
    param(
        [Parameter(Mandatory = $true)]
        [string]$caminho,
        
        [Parameter(Mandatory = $false)]
        [ValidateSet("js", "ts")]
        [string]$extensao = "js"
    )
    
    $packageJsonPath = Join-Path $caminho "package.json"
    
    if (-not (Test-Path $packageJsonPath)) {
        Write-Host "  [ERRO] package.json não encontrado em: $packageJsonPath" -ForegroundColor Red
        return $false
    }
    
    try {
        # Lê o package.json existente (gerado pelo Vite)
        $packageJson = Get-Content $packageJsonPath -Raw | ConvertFrom-Json
        
        # Define scripts baseados na extensão
        # tsx: compilação instantânea via esbuild (substitui ts-node)
        # node --watch: hot-reload nativo do Node 22+ (substitui nodemon)
        if ($extensao -eq "ts") {
            $serverScript = "tsx app.ts"
            $devBackendScript = "node --watch --import tsx app.ts"
        }
        else {
            $serverScript = "node app.js"
            $devBackendScript = "node --watch app.js"
        }
        
        # Garante que o objeto scripts existe
        if (-not $packageJson.scripts) {
            $packageJson | Add-Member -MemberType NoteProperty -Name "scripts" -Value @{}
        }
        
        # Preserva scripts do Vite e adiciona scripts de backend
        $packageJson.scripts | Add-Member -MemberType NoteProperty -Name "server" -Value $serverScript -Force
        $packageJson.scripts | Add-Member -MemberType NoteProperty -Name "dev:backend" -Value $devBackendScript -Force
        $devFrontendScript = if ($packageJson.scripts.dev) { $packageJson.scripts.dev } else { "vite" }
        $packageJson.scripts | Add-Member -MemberType NoteProperty -Name "dev:frontend" -Value $devFrontendScript -Force
        
        # Script fullstack: roda frontend e backend simultaneamente (requer concurrently)
        $packageJson.scripts | Add-Member -MemberType NoteProperty -Name "dev:fullstack" -Value "concurrently `"npm run dev:backend`" `"npm run dev:frontend`"" -Force
        $packageJson.scripts | Add-Member -MemberType NoteProperty -Name "start" -Value $serverScript -Force
        
        # Salva o package.json atualizado
        $packageJson | ConvertTo-Json -Depth 10 | Set-Content $packageJsonPath -Encoding UTF8
        
        Write-Host "  [OK] Scripts adicionados ao package.json:" -ForegroundColor Green
        Write-Host "    - server: $serverScript" -ForegroundColor Gray
        Write-Host "    - dev:backend: $devBackendScript" -ForegroundColor Gray
        Write-Host "    - dev:frontend: preservado do Vite" -ForegroundColor Gray
        Write-Host "    - dev:fullstack: executa frontend + backend simultaneamente" -ForegroundColor Gray
        Write-Host "    - start: $serverScript" -ForegroundColor Gray
        
        return $true
    }
    catch {
        Write-Host "  [ERRO] Falha ao atualizar package.json: $_" -ForegroundColor Red
        return $false
    }
}

Export-ModuleMember -Function Add-BackendScripts
