<#
.SYNOPSIS
Cria Middlewares de exemplo para o projeto.

.DESCRIPTION
Este modulo copia o arquivo de middlewares do skeleton
correspondente a linguagem escolhida (js ou ts).

.NOTES
Autor: Joao Henrique
Refatorado: Agora usa skeletons em vez de Here-Strings
#>

function New-ExampleMiddleware {
    param(
        [Parameter(Mandatory = $true)]
        [string]$caminho,
        
        [Parameter(Mandatory = $false)]
        [ValidateSet("js", "ts")]
        [string]$extensao = "js"
    )
    
    # Monta caminho do skeleton conforme a linguagem
    $skeletonsBase = Join-Path $PSScriptRoot "..\..\skeletons"
    $skeletonsLang = Join-Path $skeletonsBase $extensao
    $middlewareSkeleton = Join-Path $skeletonsLang "Middleware\middlewares.$extensao"

    # Lê o conteúdo do skeleton
    $conteudoMiddleware = Get-Content $middlewareSkeleton -Raw -Encoding UTF8
    
    # Define o destino no projeto
    $arquivoMiddleware = "middlewares.$extensao"
    $pastaMiddleware = "$caminho\Middleware"
    $caminhoCompleto = "$pastaMiddleware\$arquivoMiddleware"
    
    # Cria a pasta Middleware se não existir
    if (-not (Test-Path -Path $pastaMiddleware)) {
        Write-Host "  [AVISO] Pasta Middleware nao existe em: $pastaMiddleware" -ForegroundColor Yellow
        Write-Host "  Criando pasta Middleware..." -ForegroundColor Yellow
        New-Item -Path $pastaMiddleware -ItemType Directory -Force | Out-Null
    }
    
    # Cria o arquivo no destino
    try {
        New-Item -Path $caminhoCompleto -ItemType File -Value $conteudoMiddleware -Force | Out-Null
        Write-Host "  [OK] Middleware criado: $caminhoCompleto" -ForegroundColor Green
    }
    catch {
        Write-Host "  [ERRO] Erro ao criar Middleware: $_" -ForegroundColor Red
        Write-Host "  Caminho tentado: $caminhoCompleto" -ForegroundColor Red
        return $false
    }

    # Copia o inertiaMiddleware (protocolo Inertia.js para Express)
    $inertiaSkeleton = Join-Path $skeletonsLang "Middleware\inertiaMiddleware.$extensao"
    if (Test-Path $inertiaSkeleton) {
        $conteudoInertia = Get-Content $inertiaSkeleton -Raw -Encoding UTF8
        $caminhoInertia = "$pastaMiddleware\inertiaMiddleware.$extensao"
        New-Item -Path $caminhoInertia -ItemType File -Value $conteudoInertia -Force | Out-Null
        Write-Host "  [OK] InertiaMiddleware criado: $caminhoInertia" -ForegroundColor Green
    }

    return $true
}

Export-ModuleMember -Function New-ExampleMiddleware
