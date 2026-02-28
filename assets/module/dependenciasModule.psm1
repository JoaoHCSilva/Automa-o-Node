# dependenciasModule.psm1 — Instala dependências do projeto gerado
# Ajusta deps de Inertia conforme o framework frontend escolhido

function installDependencies {
    param(
        [string]$path,
        [string]$template = "react"
    )
    Write-Host "Instalando dependecias..." -ForegroundColor white

    # Dependências de produção — pacotes necessários em runtime
    $depProducao = @("express", "dotenv", "cors", "jsonwebtoken", "bcrypt", "express-validator", "express-rate-limit", "winston")
    
    # Dependências de desenvolvimento — comuns a todos os templates
    $depDesenvolvimento = @("tsx", "typescript", "@types/express", "@types/node", "@types/cors", "@types/jsonwebtoken", "@types/bcrypt", "concurrently")

    # Determina o framework base (remove sufixo -ts)
    $frameworkBase = $template -replace "-ts$", ""

    # Adiciona dependências específicas do Inertia por framework
    switch ($frameworkBase) {
        "react" {
            $depProducao += "express-session"
            $depDesenvolvimento += @("@inertiajs/react", "@types/express-session")
            Write-Host "  Framework: React + Inertia.js" -ForegroundColor Cyan
        }
        "vue" {
            $depProducao += "express-session"
            $depDesenvolvimento += @("@inertiajs/vue3", "@types/express-session")
            Write-Host "  Framework: Vue 3 + Inertia.js" -ForegroundColor Cyan
        }
        "vanilla" {
            # Vanilla não usa Inertia — comunicação via REST API
            Write-Host "  Framework: Vanilla (REST API, sem Inertia)" -ForegroundColor Cyan
        }
    }

    Write-Host "Instalando dependencias de producao..." -ForegroundColor Yellow
    Write-Host "  $($depProducao -join ', ')" -ForegroundColor Gray
    npm install $depProducao
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Erro ao instalar dependências de producao!" -ForegroundColor Red
        return
    }
    
    Write-Host "Instalando dependencias de desenvolvimento..." -ForegroundColor Yellow
    Write-Host "  $($depDesenvolvimento -join ', ')" -ForegroundColor Gray
    npm install --save-dev $depDesenvolvimento
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Erro ao instalar dependências de desenvolvimento!" -ForegroundColor Red
        return
    }
    
    Write-Host "Dependecias instaladas com sucesso!" -ForegroundColor green
    return
}

Export-ModuleMember -Function installDependencies  