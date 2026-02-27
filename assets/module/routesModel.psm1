# routesModel.psm1 — Cria o arquivo de rotas do projeto
# Refatorado para copiar do skeleton ao invés de usar Here-String

function routesModel {
    param (
        [string]$caminho,
        [string]$extensao
    )

    Write-Host "Iniciando a criacao do arquivo router.$extensao...`n" -ForegroundColor Yellow

    # Monta o caminho do skeleton conforme a linguagem
    $skeletonsBase = Join-Path $PSScriptRoot "..\skeletons"
    $skeletonsLang = Join-Path $skeletonsBase $extensao
    $routerSkeleton = Join-Path $skeletonsLang "Routes\router.$extensao"

    # Lê o conteúdo do arquivo skeleton
    $dadosRouter = Get-Content $routerSkeleton -Raw -Encoding UTF8

    # Define o destino dentro do projeto
    $arquivoRouter = "router.$extensao"
    $caminhoAtual = Get-Location
    $caminhoArquivoFinal = "$caminhoAtual\$caminho"

    # Remove arquivo anterior se existir (evita conflitos)
    if (Test-Path -Path "$caminhoArquivoFinal\$arquivoRouter") {
        Remove-Item -Path "$caminhoArquivoFinal\$arquivoRouter"
    }

    # Cria o arquivo de rotas no destino
    New-Item -Path "$caminhoArquivoFinal\$arquivoRouter" -ItemType File -Value $dadosRouter
    Write-Host "Arquivo router.$extensao criado com sucesso!`n" -ForegroundColor Green
}

Export-ModuleMember -Function routesModel
