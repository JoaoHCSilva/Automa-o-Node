<#
.SYNOPSIS
Cria um Controller de exemplo para o projeto.

.DESCRIPTION
Este modulo copia o arquivo UserController do skeleton
correspondente a linguagem escolhida (js ou ts).

.PARAMETER caminho
O caminho raiz do projeto onde o Controller sera criado.

.PARAMETER extensao
A extensao do arquivo (js ou ts).

.NOTES
Autor: Joao Henrique
Data: 30/01/2026
Refatorado: Agora usa skeletons em vez de Here-Strings
#>

function New-ExampleController {
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
    $controllerSkeleton = Join-Path $skeletonsLang "Controllers\UserController.$extensao"

    # Lê o conteúdo do skeleton
    $conteudoController = Get-Content $controllerSkeleton -Raw -Encoding UTF8
    
    # Define o destino no projeto
    $arquivoController = "UserController.$extensao"
    $pastaControllers = "$caminho\Controllers"
    $caminhoCompleto = "$pastaControllers\$arquivoController"
    
    # Cria a pasta Controllers se não existir
    if (-not (Test-Path -Path $pastaControllers)) {
        Write-Host "  [AVISO] Pasta Controllers nao existe em: $pastaControllers" -ForegroundColor Yellow
        Write-Host "  Criando pasta Controllers..." -ForegroundColor Yellow
        New-Item -Path $pastaControllers -ItemType Directory -Force | Out-Null
    }
    
    # Cria o arquivo no destino
    try {
        New-Item -Path $caminhoCompleto -ItemType File -Value $conteudoController -Force | Out-Null
        Write-Host "  [OK] Controller criado: $caminhoCompleto" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "  [ERRO] Erro ao criar Controller: $_" -ForegroundColor Red
        Write-Host "  Caminho tentado: $caminhoCompleto" -ForegroundColor Red
        return $false
    }
}

Export-ModuleMember -Function New-ExampleController
