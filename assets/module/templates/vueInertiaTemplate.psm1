# vueInertiaTemplate.psm1 — Copia skeleton Vue + Inertia.js para o projeto
# Sobrescreve o main.js/main.ts padrão do Vite e adiciona Pages, Layouts e Components

<#
.SYNOPSIS
Copia a estrutura Inertia.js + Vue 3 do skeleton para o projeto.

.DESCRIPTION
Após o Vite criar a estrutura base do projeto, esta função copia os arquivos
do skeleton (Pages, Layouts, Components, types e main.js/ts) para a pasta src/
do projeto, sobrescrevendo os defaults do Vite.

.PARAMETER caminho
O caminho raiz do projeto onde os arquivos serão copiados.

.PARAMETER template
O template Vite selecionado (vue ou vue-ts).

.EXAMPLE
Copy-VueSkeleton -caminho "C:\meu-projeto" -template "vue"

.NOTES
Autor: João Henrique
Data: 27/02/2026
#>
function Copy-VueSkeleton {
    param(
        [Parameter(Mandatory = $true)]
        [string]$caminho,

        [Parameter(Mandatory = $true)]
        [ValidateSet("vue", "vue-ts")]
        [string]$template
    )

    Write-Host "`nConfigurando estrutura Inertia.js + Vue..." -ForegroundColor Cyan

    # Mapeia o template para a pasta do skeleton correspondente
    $skeletonMap = @{
        "vue"    = "vue-js"
        "vue-ts" = "vue-ts"
    }
    $skeletonFolder = $skeletonMap[$template]

    # Resolve o caminho absoluto do skeleton
    $skeletonsBase = Join-Path $PSScriptRoot "..\..\skeletons"
    $skeletonSrc = Join-Path $skeletonsBase "$skeletonFolder\src"

    if (-not (Test-Path $skeletonSrc)) {
        Write-Host "  [ERRO] Skeleton não encontrado: $skeletonSrc" -ForegroundColor Red
        return $false
    }

    $destSrc = Join-Path $caminho "src"

    # Garante que a pasta src/ existe
    if (-not (Test-Path $destSrc)) {
        New-Item -Path $destSrc -ItemType Directory -Force | Out-Null
    }

    # Lista de subpastas a copiar do skeleton
    $subPastas = @("Pages", "Layouts", "Components")

    # Adiciona pasta types se for TypeScript
    if ($template -eq "vue-ts") {
        $subPastas += "types"
    }

    # Cria subpastas e copia arquivos
    foreach ($pasta in $subPastas) {
        $origem = Join-Path $skeletonSrc $pasta
        $destino = Join-Path $destSrc $pasta

        if (Test-Path $origem) {
            # Cria a pasta destino se não existir
            if (-not (Test-Path $destino)) {
                New-Item -Path $destino -ItemType Directory -Force | Out-Null
            }

            # Copia todos os arquivos da pasta
            Get-ChildItem -Path $origem -File | ForEach-Object {
                Copy-Item -Path $_.FullName -Destination $destino -Force
                Write-Host "  [OK] src/$pasta/$($_.Name)" -ForegroundColor Green
            }
        }
    }

    # Sobrescreve o main.js ou main.ts do Vite com o do skeleton
    if ($template -eq "vue-ts") {
        $mainFile = "main.ts"
    }
    else {
        $mainFile = "main.js"
    }

    $mainOrigem = Join-Path $skeletonSrc $mainFile
    $mainDestino = Join-Path $destSrc $mainFile

    if (Test-Path $mainOrigem) {
        Copy-Item -Path $mainOrigem -Destination $mainDestino -Force
        Write-Host "  [OK] src/$mainFile (sobrescrito)" -ForegroundColor Green
    }

    # Remove arquivos desnecessários do Vite default
    $arquivosRemover = @(
        (Join-Path $destSrc "style.css"),
        (Join-Path $destSrc "App.vue"),
        (Join-Path $destSrc "components\HelloWorld.vue")
    )

    foreach ($arquivo in $arquivosRemover) {
        if (Test-Path $arquivo) {
            Remove-Item -Path $arquivo -Force
            $nomeRelativo = $arquivo.Replace($destSrc, "src")
            Write-Host "  [REMOVIDO] $nomeRelativo (default Vite)" -ForegroundColor DarkGray
        }
    }

    # Remove pasta components vazia do Vite (lowercase)
    $componentsPastaVite = Join-Path $destSrc "components"
    if ((Test-Path $componentsPastaVite) -and
        ((Get-ChildItem -Path $componentsPastaVite -Recurse | Measure-Object).Count -eq 0)) {
        Remove-Item -Path $componentsPastaVite -Force
        Write-Host "  [REMOVIDO] src/components/ (pasta vazia do Vite)" -ForegroundColor DarkGray
    }

    Write-Host "`nEstrutura Inertia.js + Vue configurada com sucesso!" -ForegroundColor Green
    return $true
}

Export-ModuleMember -Function Copy-VueSkeleton
