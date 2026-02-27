<#
.SYNOPSIS
Cria um Service de exemplo para o projeto.

.DESCRIPTION
Este modulo copia o arquivo UserService do skeleton
correspondente a linguagem escolhida (js ou ts).

.NOTES
Autor: Joao Henrique
Refatorado: Agora usa skeletons em vez de Here-Strings
#>

function New-ExampleService {
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
    $serviceSkeleton = Join-Path $skeletonsLang "Services\UserService.$extensao"

    # Lê o conteúdo do skeleton
    $conteudoService = Get-Content $serviceSkeleton -Raw -Encoding UTF8
    
    # Define o destino no projeto
    $arquivoService = "UserService.$extensao"
    $pastaServices = "$caminho\Services"
    $caminhoCompleto = "$pastaServices\$arquivoService"
    
    # Cria a pasta Services se não existir
    if (-not (Test-Path -Path $pastaServices)) {
        Write-Host "  [AVISO] Pasta Services nao existe em: $pastaServices" -ForegroundColor Yellow
        Write-Host "  Criando pasta Services..." -ForegroundColor Yellow
        New-Item -Path $pastaServices -ItemType Directory -Force | Out-Null
    }
    
    # Cria o arquivo no destino
    try {
        New-Item -Path $caminhoCompleto -ItemType File -Value $conteudoService -Force | Out-Null
        Write-Host "  [OK] Service criado: $caminhoCompleto" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "  [ERRO] Erro ao criar Service: $_" -ForegroundColor Red
        Write-Host "  Caminho tentado: $caminhoCompleto" -ForegroundColor Red
        return $false
    }
}

Export-ModuleMember -Function New-ExampleService
