<#
.SYNOPSIS
Cria módulo de autenticação JWT para o projeto.

.DESCRIPTION
Este módulo copia o AuthController do skeleton
correspondente a linguagem escolhida (js ou ts).

.NOTES
Autor: João Henrique
Refatorado: Agora usa skeletons em vez de Here-Strings
#>

function New-AuthModule {
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
    $authSkeleton = Join-Path $skeletonsLang "Controllers\AuthController.$extensao"

    # Lê o conteúdo do skeleton
    $conteudoAuthController = Get-Content $authSkeleton -Raw -Encoding UTF8
    
    # Define o destino no projeto
    $arquivoAuthController = "AuthController.$extensao"
    $pastaControllers = Join-Path $caminho "Controllers"
    $caminhoAuthController = Join-Path $pastaControllers $arquivoAuthController
    
    # Cria a pasta Controllers se não existir
    if (-not (Test-Path -Path $pastaControllers)) {
        New-Item -Path $pastaControllers -ItemType Directory -Force | Out-Null
    }
    
    # Cria o arquivo no destino
    try {
        New-Item -Path $caminhoAuthController -ItemType File -Value $conteudoAuthController -Force | Out-Null
        Write-Host "  [OK] AuthController criado: $caminhoAuthController" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "  [ERRO] Erro ao criar AuthController: $_" -ForegroundColor Red
        return $false
    }
}

Export-ModuleMember -Function New-AuthModule
