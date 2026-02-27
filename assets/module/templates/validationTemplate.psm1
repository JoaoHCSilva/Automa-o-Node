<#
.SYNOPSIS
Cria arquivo de validação com express-validator.

.DESCRIPTION
Este módulo copia o módulo de validação do skeleton
correspondente a linguagem escolhida (js ou ts).

.NOTES
Autor: João Henrique
Refatorado: Agora usa skeletons em vez de Here-Strings
#>

function New-ValidationModule {
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
    $validationSkeleton = Join-Path $skeletonsLang "Helpers\validation.$extensao"

    # Lê o conteúdo do skeleton
    $conteudoValidation = Get-Content $validationSkeleton -Raw -Encoding UTF8
    
    # Define o destino no projeto
    $arquivoValidation = "validation.$extensao"
    $pastaHelpers = Join-Path $caminho "Helpers"
    $caminhoValidation = Join-Path $pastaHelpers $arquivoValidation
    
    # Cria a pasta Helpers se não existir
    if (-not (Test-Path -Path $pastaHelpers)) {
        New-Item -Path $pastaHelpers -ItemType Directory -Force | Out-Null
    }
    
    # Cria o arquivo no destino
    try {
        New-Item -Path $caminhoValidation -ItemType File -Value $conteudoValidation -Force | Out-Null
        Write-Host "  [OK] Módulo de validação criado: $caminhoValidation" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "  [ERRO] Erro ao criar módulo de validação: $_" -ForegroundColor Red
        return $false
    }
}

Export-ModuleMember -Function New-ValidationModule
