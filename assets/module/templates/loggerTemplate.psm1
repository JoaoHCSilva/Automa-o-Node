<#
.SYNOPSIS
Cria configuração de logging com Winston.

.DESCRIPTION
Este módulo copia a configuração de logger do skeleton
correspondente a linguagem escolhida (js ou ts).
Também atualiza o .gitignore para incluir a pasta logs/.

.NOTES
Autor: João Henrique
Refatorado: Agora usa skeletons em vez de Here-Strings
#>

function New-LoggerModule {
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
    $loggerSkeleton = Join-Path $skeletonsLang "Config\logger.$extensao"

    # Lê o conteúdo do skeleton
    $conteudoLogger = Get-Content $loggerSkeleton -Raw -Encoding UTF8
    
    # Define o destino no projeto
    $arquivoLogger = "logger.$extensao"
    $pastaConfig = Join-Path $caminho "Config"
    $caminhoLogger = Join-Path $pastaConfig $arquivoLogger
    
    # Cria a pasta Config se não existir
    if (-not (Test-Path -Path $pastaConfig)) {
        New-Item -Path $pastaConfig -ItemType Directory -Force | Out-Null
    }
    
    try {
        # Cria o arquivo de logger no destino
        New-Item -Path $caminhoLogger -ItemType File -Value $conteudoLogger -Force | Out-Null
        Write-Host "  [OK] Logger criado: $caminhoLogger" -ForegroundColor Green
        
        # Adiciona logs/ ao .gitignore para evitar commit de arquivos de log
        $gitignorePath = Join-Path $caminho ".gitignore"
        if (Test-Path $gitignorePath) {
            $gitignoreContent = Get-Content $gitignorePath -Raw
            if ($gitignoreContent -notmatch "logs/") {
                Add-Content $gitignorePath "`nlogs/" -Encoding UTF8
                Write-Host "  [OK] Adicionado logs/ ao .gitignore" -ForegroundColor Green
            }
        }
        
        return $true
    }
    catch {
        Write-Host "  [ERRO] Erro ao criar logger: $_" -ForegroundColor Red
        return $false
    }
}

Export-ModuleMember -Function New-LoggerModule
