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
        return $true
    }
    catch {
        Write-Host "  [ERRO] Erro ao criar Middleware: $_" -ForegroundColor Red
        Write-Host "  Caminho tentado: $caminhoCompleto" -ForegroundColor Red
        return $false
    }
}

Export-ModuleMember -Function New-ExampleMiddleware
