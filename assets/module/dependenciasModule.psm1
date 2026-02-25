# instala as dependecias do projeto
function installDependencies {
    param(
        [string]$path,
        [string]$template
    )
    Write-Host "Instalando dependecias..." -ForegroundColor white
    if($template -eq "react" -or $template -eq "react-ts"){
        $template = "react"
    } elseif($template -eq "vue" -or $template -eq "vue-ts"){
        $template = "vue"
    }
    
    # Dependências de produção
    $depProducao = @("express", "dotenv", "cors", "jsonwebtoken", "bcrypt", "express-validator", "express-rate-limit", "winston")
    
    # Dependências de desenvolvimento
    $depDesenvolvimento = @("nodemon", "ts-node", "typescript", "@types/express", "express-inertia", "express-session", "@inertiajs/$template", "@types/node", "@types/cors", "@types/jsonwebtoken", "@types/bcrypt", "concurrently", "inertia-node", "@inertiajs/inertia" ,"@inertiajs/inertia-react" )
    Write-Host "Instalando dependencias de producao..." -ForegroundColor Yellow
    Write-Host "  express, dotenv, cors, jsonwebtoken, bcrypt, express-validator, express-rate-limit, winston" -ForegroundColor Gray
    npm install $depProducao
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Erro ao instalar dependências de producao!" -ForegroundColor Red
        return
    }
    
    Write-Host "Instalando dependencias de desenvolvimento..." -ForegroundColor Yellow
    Write-Host "  nodemon, typescript, @types/*, concurrently" -ForegroundColor Gray
    npm install --save-dev $depDesenvolvimento
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Erro ao instalar dependências de desenvolvimento!" -ForegroundColor Red
        return
    }
    
    Write-Host "Dependecias instaladas com sucesso!" -ForegroundColor green
    return
}

Export-ModuleMember -Function installDependencies  