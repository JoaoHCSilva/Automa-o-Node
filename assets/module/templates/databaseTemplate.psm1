<#
.SYNOPSIS
Cria arquivo de configuracao de banco de dados para o projeto.

.DESCRIPTION
Este modulo copia a configuracao de banco de dados do skeleton
correspondente a linguagem escolhida (js ou ts).

.NOTES
Autor: Joao Henrique
Refatorado: Agora usa skeletons em vez de Here-Strings
#>

function New-DatabaseConfig {
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
    $dbSkeleton = Join-Path $skeletonsLang "Config\database.$extensao"

    # Lê o conteúdo do skeleton
    $conteudoConfig = Get-Content $dbSkeleton -Raw -Encoding UTF8
    
    # Define o destino no projeto
    $arquivoConfig = "database.$extensao"
    $pastaConfig = "$caminho\Config"
    $caminhoCompleto = "$pastaConfig\$arquivoConfig"
    
    # Cria a pasta Config se não existir
    if (-not (Test-Path -Path $pastaConfig)) {
        Write-Host "  [AVISO] Pasta Config nao existe em: $pastaConfig" -ForegroundColor Yellow
        Write-Host "  Criando pasta Config..." -ForegroundColor Yellow
        New-Item -Path $pastaConfig -ItemType Directory -Force | Out-Null
    }
    
    # Cria o arquivo no destino
    try {
        New-Item -Path $caminhoCompleto -ItemType File -Value $conteudoConfig -Force | Out-Null
        Write-Host "  [OK] Configuracao de banco criada: $caminhoCompleto" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "  [ERRO] Erro ao criar configuracao de banco: $_" -ForegroundColor Red
        Write-Host "  Caminho tentado: $caminhoCompleto" -ForegroundColor Red
        return $false
    }
}

Export-ModuleMember -Function New-DatabaseConfig
