#Requires -Version 7.0
# test-frontend-skeletons.ps1 — Valida que cada skeleton frontend compila sem erros
#
# Uso (a partir da raiz do projeto):
#   .\tests\test-frontend-skeletons.ps1
#   .\tests\test-frontend-skeletons.ps1 -Templates react
#   .\tests\test-frontend-skeletons.ps1 -Templates vue,vue-ts

param(
    # Aceita um ou vários templates. Via -File: -Templates react  ou  -Templates react,react-ts
    # Via -Command: & '.\tests\test-frontend-skeletons.ps1' -Templates 'vue','vue-ts'
    [string[]]$Templates = @("react", "react-ts", "vue", "vue-ts", "vanilla", "vanilla-ts")
)

# Expande eventuais entradas com vírgula (ex: "vue,vue-ts" passado como string única)
$Templates = $Templates | ForEach-Object { $_ -split "," } | ForEach-Object { $_.Trim() } | Where-Object { $_ }

$templateValidos = @("react", "react-ts", "vue", "vue-ts", "vanilla", "vanilla-ts")
foreach ($t in $Templates) {
    if ($t -notin $templateValidos) {
        Write-Error "Template inválido: '$t'. Válidos: $($templateValidos -join ', ')"
        exit 1
    }
}

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# ── Módulo ────────────────────────────────────────────────────────────────────
$moduloPath = Join-Path $PSScriptRoot ".." "assets" "module" "templates" "frontendSkeletonModule.psm1"
Import-Module (Resolve-Path $moduloPath) -Force

# ── Mapeamento de templates ───────────────────────────────────────────────────
# Template interno → flag do Vite
$viteTemplateMap = @{
    "react"      = "react"
    "react-ts"   = "react-ts"
    "vue"        = "vue"
    "vue-ts"     = "vue-ts"
    "vanilla"    = "vanilla"
    "vanilla-ts" = "vanilla-ts"
}

# Dependências extras necessárias para o build (além das do Vite)
# Inertia precisa estar presente para o TypeScript resolver os tipos na compilação
$extraDeps = @{
    "react"      = @("@inertiajs/react@^1.0.0")
    "react-ts"   = @("@inertiajs/react@^1.0.0")
    "vue"        = @("@inertiajs/vue3@^1.0.0")
    "vue-ts"     = @("@inertiajs/vue3@^1.0.0")
    "vanilla"    = @()
    "vanilla-ts" = @()
}

# ── Helpers ───────────────────────────────────────────────────────────────────
function Write-Separator { Write-Host ("═" * 52) -ForegroundColor DarkCyan }

function Remove-TempDir ([string]$path) {
    if (Test-Path $path) {
        Remove-Item -Path $path -Recurse -Force -ErrorAction SilentlyContinue
    }
}

function Invoke-NpmCommand {
    param([string[]]$NpmArgs, [string]$ErrorLabel)
    $out = & npm @NpmArgs 2>&1
    if ($LASTEXITCODE -ne 0) {
        $detail = ($out | Select-Object -Last 30) -join "`n"
        throw "${ErrorLabel}:`n${detail}"
    }
    # Não retorna $out para não poluir o pipeline do chamador
}

# ── Teste por template ────────────────────────────────────────────────────────
function Test-Template {
    param([string]$Template, [int]$Index, [int]$Total)

    $viteTemplate = $viteTemplateMap[$Template]
    $startTime    = Get-Date
    $tempDir      = Join-Path $env:TEMP "skel-test-$Template-$(Get-Date -Format 'HHmmss')"

    Write-Host ""
    Write-Host "[$Index/$Total] " -ForegroundColor DarkCyan -NoNewline
    Write-Host $Template -ForegroundColor Cyan

    try {
        # 1 — Scaffold Vite em subpasta temporária e move arquivos para $tempDir
        Write-Host "       [1/4] Criando projeto Vite ($viteTemplate)..." -ForegroundColor Gray
        New-Item -Path $tempDir -ItemType Directory -Force | Out-Null
        $viteSubdir = Join-Path $tempDir "_vite_tmp"
        New-Item -Path $viteSubdir -ItemType Directory | Out-Null

        Push-Location $viteSubdir
        try {
            Invoke-NpmCommand -NpmArgs @("create", "vite@latest", "project", "-y", "--", "--template", $viteTemplate, "--no-interactive") `
                              -ErrorLabel "npm create vite@latest"
            Get-ChildItem -Path ".\project" -Force | Move-Item -Destination $tempDir -Force
        }
        finally { Pop-Location }

        Remove-TempDir $viteSubdir

        # 2 — Aplica skeleton
        Write-Host "       [2/4] Aplicando skeleton..." -ForegroundColor Gray
        $ok = Copy-FrontendSkeleton -caminho $tempDir -template $Template 6>$null
        if (-not $ok) { throw "Copy-FrontendSkeleton retornou falso" }

        # 3 — Instala dependências
        Write-Host "       [3/4] Instalando dependências..." -ForegroundColor Gray
        Push-Location $tempDir
        try {
            Invoke-NpmCommand -NpmArgs @("install") -ErrorLabel "npm install"

            $deps = $extraDeps[$Template]
            if ($deps.Count -gt 0) {
                Invoke-NpmCommand -NpmArgs (@("install", "--save-dev") + $deps) `
                                  -ErrorLabel "npm install (deps Inertia)"
            }

            # 4 — Build
            Write-Host "       [4/4] Compilando (npm run build)..." -ForegroundColor Gray
            Invoke-NpmCommand -NpmArgs @("run", "build") -ErrorLabel "npm run build"
        }
        finally { Pop-Location }

        $elapsed = [math]::Round(((Get-Date) - $startTime).TotalSeconds, 1)
        Write-Host ("       PASSOU ({0}s)" -f $elapsed) -ForegroundColor Green

        return [PSCustomObject]@{ Template = $Template; Passed = $true; Error = ""; Seconds = $elapsed }
    }
    catch {
        $elapsed  = [math]::Round(((Get-Date) - $startTime).TotalSeconds, 1)
        $errMsg   = $_.Exception.Message

        Write-Host ("       FALHOU ({0}s)" -f $elapsed) -ForegroundColor Red
        # Mostra apenas as primeiras 5 linhas do erro para não poluir o terminal
        ($errMsg -split "`n" | Select-Object -First 5) | ForEach-Object {
            Write-Host "       $_" -ForegroundColor DarkRed
        }

        return [PSCustomObject]@{ Template = $Template; Passed = $false; Error = $errMsg; Seconds = $elapsed }
    }
    finally {
        Remove-TempDir $tempDir
    }
}

# ── Main ──────────────────────────────────────────────────────────────────────
Write-Separator
Write-Host "  TESTE DE SKELETONS FRONTEND" -ForegroundColor Cyan
Write-Host ("  Templates: " + ($Templates -join ", ")) -ForegroundColor DarkGray
Write-Separator

$results = @()
$total   = $Templates.Count

for ($i = 0; $i -lt $total; $i++) {
    $results += Test-Template -Template $Templates[$i] -Index ($i + 1) -Total $total
}

# ── Resumo ────────────────────────────────────────────────────────────────────
Write-Host ""
Write-Separator
Write-Host "  RESUMO" -ForegroundColor Cyan
Write-Separator

foreach ($r in $results) {
    $status = if ($r.Passed) { "PASSOU" } else { "FALHOU" }
    $color  = if ($r.Passed) { "Green" } else { "Red" }
    Write-Host ("  {0}  {1,-12}  ({2}s)" -f $status, $r.Template, $r.Seconds) -ForegroundColor $color
}

$passCount = @($results | Where-Object { $_.Passed }).Count
$failCount = $total - $passCount

Write-Host ""
if ($failCount -eq 0) {
    Write-Host ("  {0}/{1} templates passaram" -f $passCount, $total) -ForegroundColor Green
} else {
    Write-Host ("  {0}/{1} passaram  |  {2} falharam" -f $passCount, $total, $failCount) -ForegroundColor Yellow

    Write-Host ""
    Write-Host "  Detalhes dos erros:" -ForegroundColor DarkRed
    $results | Where-Object { -not $_.Passed } | ForEach-Object {
        Write-Host ""
        Write-Host ("  [$($_.Template)]") -ForegroundColor Red
        ($_.Error -split "`n" | Select-Object -First 15) | ForEach-Object {
            Write-Host "    $_" -ForegroundColor DarkRed
        }
    }
}

Write-Separator

# Exit code = número de falhas (0 = tudo OK)
exit $failCount
