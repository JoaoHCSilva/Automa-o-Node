<#
.SYNOPSIS
Cria um Model de exemplo para o projeto.

.DESCRIPTION
Este modulo copia o arquivo User model do skeleton
correspondente a linguagem escolhida (js ou ts).

.NOTES
Autor: Joao Henrique
Refatorado: Agora usa skeletons em vez de Here-Strings
#>

function New-ExampleModel {
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
    $modelSkeleton = Join-Path $skeletonsLang "Models\User.$extensao"

    # Lê o conteúdo do skeleton
    $conteudoModel = Get-Content $modelSkeleton -Raw -Encoding UTF8
    
    # Define o destino no projeto
    $arquivoModel = "User.$extensao"
    $pastaModels = "$caminho\Models"
    $caminhoCompleto = "$pastaModels\$arquivoModel"
    
    # Cria a pasta Models se não existir
    if (-not (Test-Path -Path $pastaModels)) {
        Write-Host "  [AVISO] Pasta Models nao existe em: $pastaModels" -ForegroundColor Yellow
        Write-Host "  Criando pasta Models..." -ForegroundColor Yellow
        New-Item -Path $pastaModels -ItemType Directory -Force | Out-Null
    }
    
    # Cria o arquivo no destino
    try {
        New-Item -Path $caminhoCompleto -ItemType File -Value $conteudoModel -Force | Out-Null
        Write-Host "  [OK] Model criado: $caminhoCompleto" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "  [ERRO] Erro ao criar Model: $_" -ForegroundColor Red
        Write-Host "  Caminho tentado: $caminhoCompleto" -ForegroundColor Red
        return $false
    }
}

Export-ModuleMember -Function New-ExampleModel
