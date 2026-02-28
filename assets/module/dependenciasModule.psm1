# dependenciasModule.psm1 — Instala dependências do projeto gerado
# Separa deps de produção e desenvolvimento
# Option B: Usa tsx em vez de ts-node, remove nodemon (usa node --watch nativo)

function installDependencies {
    param(
        [string]$path,
        [string]$template
    )
    Write-Host "Instalando dependecias..." -ForegroundColor white

    # Normaliza nome do template para o pacote Inertia correto
    if ($template -eq "react" -or $template -eq "react-ts") {
        $template = "react"
    }
    elseif ($template -eq "vue" -or $template -eq "vue-ts") {
        $template = "vue"
    }
    
    # Dependências de produção — pacotes necessários em runtime
    $depProducao = @("express", "dotenv", "cors", "jsonwebtoken", "bcrypt", "express-validator", "express-rate-limit", "winston")
    
    # Dependências de desenvolvimento — pacotes usados apenas em dev/build
    # tsx: substitui ts-node com compilação instantânea via esbuild
    # Removido: nodemon (substituído por node --watch nativo) e ts-node (substituído por tsx)
    $depDesenvolvimento = @("tsx", "typescript", "@types/express", "express-inertia", "express-session", "@inertiajs/$template", "@types/node", "@types/cors", "@types/jsonwebtoken", "@types/bcrypt", "concurrently", "inertia-node", "@inertiajs/inertia", "@inertiajs/inertia-react")

    Write-Host "Instalando dependencias de producao..." -ForegroundColor Yellow
    Write-Host "  express, dotenv, cors, jsonwebtoken, bcrypt, express-validator, express-rate-limit, winston" -ForegroundColor Gray
    npm install $depProducao
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Erro ao instalar dependências de producao!" -ForegroundColor Red
        return
    }
    
    Write-Host "Instalando dependencias de desenvolvimento..." -ForegroundColor Yellow
    Write-Host "  tsx, typescript, @types/*, concurrently" -ForegroundColor Gray
    npm install --save-dev $depDesenvolvimento
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Erro ao instalar dependências de desenvolvimento!" -ForegroundColor Red
        return
    }
    
    Write-Host "Dependecias instaladas com sucesso!" -ForegroundColor green
    return
}

Export-ModuleMember -Function installDependencies  