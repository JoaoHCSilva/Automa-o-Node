# frontendSkeletonModule.psm1 — Copia skeletons frontend para o projeto
# Suporta React, Vue e Vanilla (JS e TS)

<#
.SYNOPSIS
Copia a estrutura frontend do skeleton para o projeto.

.DESCRIPTION
Após o Vite criar a estrutura base, esta função copia os arquivos
do skeleton correto (React/Vue/Vanilla em JS/TS) para o projeto,
sobrescrevendo os defaults do Vite.

.PARAMETER caminho
O caminho raiz do projeto.

.PARAMETER template
O template Vite selecionado (react, react-ts, vue, vue-ts, vanilla, vanilla-ts).

.EXAMPLE
Copy-FrontendSkeleton -caminho "C:\meu-projeto" -template "react-ts"

.NOTES
Autor: João Henrique
Data: 27/02/2026
#>
function Copy-FrontendSkeleton {
    param(
        [Parameter(Mandatory = $true)]
        [string]$caminho,

        [Parameter(Mandatory = $true)]
        [ValidateSet("react", "react-ts", "vue", "vue-ts", "vanilla", "vanilla-ts")]
        [string]$template
    )

    Write-Host "`nConfigurando estrutura frontend ($template)..." -ForegroundColor Cyan

    # Mapeia o template Vite para a pasta do skeleton correspondente
    $skeletonMap = @{
        "react"      = "react-js"
        "react-ts"   = "react-ts"
        "vue"        = "vue-js"
        "vue-ts"     = "vue-ts"
        "vanilla"    = "vanilla-js"
        "vanilla-ts" = "vanilla-ts"
    }
    $skeletonFolder = $skeletonMap[$template]

    # Resolve o caminho absoluto do skeleton
    $skeletonsBase = Join-Path $PSScriptRoot "..\..\skeletons"
    $skeletonPath = Join-Path $skeletonsBase $skeletonFolder

    if (-not (Test-Path $skeletonPath)) {
        Write-Host "  [ERRO] Skeleton não encontrado: $skeletonPath" -ForegroundColor Red
        return $false
    }

    # Vanilla usa root do projeto; React/Vue usam src/
    $isVanilla = $template -like "vanilla*"

    if ($isVanilla) {
        # Vanilla: skeleton tem arquivos na raiz, copia direto para o projeto
        $skeletonSrc = $skeletonPath
        $destBase = $caminho
    }
    else {
        # React/Vue: skeleton tem arquivos em src/, copia para src/ do projeto
        $skeletonSrc = Join-Path $skeletonPath "src"
        $destBase = Join-Path $caminho "src"
    }

    if (-not (Test-Path $destBase)) {
        New-Item -Path $destBase -ItemType Directory -Force | Out-Null
    }

    # Copia subpastas do skeleton
    $subPastas = Get-ChildItem -Path $skeletonSrc -Directory

    foreach ($pasta in $subPastas) {
        $destino = Join-Path $destBase $pasta.Name

        if (-not (Test-Path $destino)) {
            New-Item -Path $destino -ItemType Directory -Force | Out-Null
        }

        # Copia arquivos da subpasta (recursivo para subpastas aninhadas)
        Get-ChildItem -Path $pasta.FullName -Recurse -File | ForEach-Object {
            $relativePath = $_.FullName.Substring($pasta.FullName.Length + 1)
            $destFile = Join-Path $destino $relativePath
            $destDir = Split-Path $destFile -Parent

            if (-not (Test-Path $destDir)) {
                New-Item -Path $destDir -ItemType Directory -Force | Out-Null
            }

            Copy-Item -Path $_.FullName -Destination $destFile -Force

            if ($isVanilla) {
                Write-Host "  [OK] $($pasta.Name)/$relativePath" -ForegroundColor Green
            }
            else {
                Write-Host "  [OK] src/$($pasta.Name)/$relativePath" -ForegroundColor Green
            }
        }
    }

    # Copia arquivos soltos do skeleton (main.js, main.ts, style.css, etc.)
    Get-ChildItem -Path $skeletonSrc -File | ForEach-Object {
        $destFile = Join-Path $destBase $_.Name
        Copy-Item -Path $_.FullName -Destination $destFile -Force

        if ($isVanilla) {
            Write-Host "  [OK] $($_.Name) (sobrescrito)" -ForegroundColor Green
        }
        else {
            Write-Host "  [OK] src/$($_.Name) (sobrescrito)" -ForegroundColor Green
        }
    }

    # Remove arquivos desnecessários do Vite default
    $arquivosRemover = @()

    # Remove o index.html do Vite (Inertia gera o HTML via Express middleware)
    $viteIndexHtml = Join-Path $caminho "index.html"
    if (Test-Path $viteIndexHtml) {
        Remove-Item -Path $viteIndexHtml -Force
        Write-Host "  [REMOVIDO] index.html (Inertia usa HTML gerado pelo Express)" -ForegroundColor DarkGray
    }

    if ($isVanilla) {
        # Vanilla: remove o counter.js e javascript.svg padrão do Vite
        $arquivosRemover = @(
            (Join-Path $caminho "counter.js"),
            (Join-Path $caminho "counter.ts"),
            (Join-Path $caminho "javascript.svg"),
            (Join-Path $caminho "typescript.svg")
        )
    }
    else {
        # React/Vue: remove componentes de exemplo do Vite
        $srcPath = Join-Path $caminho "src"
        $arquivosRemover = @(
            (Join-Path $srcPath "App.vue"),
            (Join-Path $srcPath "App.jsx"),
            (Join-Path $srcPath "App.tsx"),
            (Join-Path $srcPath "App.css"),
            (Join-Path $srcPath "style.css"),
            (Join-Path $srcPath "index.css"),
            (Join-Path $srcPath "components\HelloWorld.vue"),
            (Join-Path $srcPath "components\HelloWorld.jsx"),
            (Join-Path $srcPath "components\HelloWorld.tsx"),
            (Join-Path $srcPath "assets\react.svg"),
            (Join-Path $srcPath "assets\vue.svg")
        )
    }

    foreach ($arquivo in $arquivosRemover) {
        if (Test-Path $arquivo) {
            Remove-Item -Path $arquivo -Force
            $nomeRelativo = Split-Path $arquivo -Leaf
            Write-Host "  [REMOVIDO] $nomeRelativo (default Vite)" -ForegroundColor DarkGray
        }
    }

    # Remove pastas vazias deixadas pela limpeza
    $pastasLimpar = @(
        (Join-Path $caminho "src\components"),
        (Join-Path $caminho "src\assets")
    )

    foreach ($pasta in $pastasLimpar) {
        if ((Test-Path $pasta) -and
            ((Get-ChildItem -Path $pasta -Recurse | Measure-Object).Count -eq 0)) {
            Remove-Item -Path $pasta -Force
            Write-Host "  [REMOVIDO] $(Split-Path $pasta -Leaf)/ (pasta vazia)" -ForegroundColor DarkGray
        }
    }

    Write-Host "`nEstrutura frontend ($template) configurada com sucesso!" -ForegroundColor Green
    return $true
}

Export-ModuleMember -Function Copy-FrontendSkeleton
