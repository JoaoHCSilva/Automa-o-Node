# instala as dependecias do projeto
function installDependencies {
    param(
        [string]$path
    )
    Write-Host "Instalando dependecias..." -ForegroundColor white
    
    # Dependências de produção
    $depProducao = @("express", "dotenv", "cors", "jsonwebtoken", "bcrypt", "express-validator", "express-rate-limit", "winston")
    
    # Dependências de desenvolvimento
    $depDesenvolvimento = @("nodemon", "ts-node", "typescript", "@types/express", "@types/node", "@types/cors", "@types/jsonwebtoken", "@types/bcrypt", "concurrently")
    
    Write-Host "Instalando dependencias de producao..." -ForegroundColor Yellow
    Write-Host "  express, dotenv, cors, jsonwebtoken, bcrypt, express-validator, express-rate-limit, winston" -ForegroundColor Gray
    $npmCmd = (Get-Command npm -ErrorAction SilentlyContinue).Source
    if ($npmCmd) {
        Start-Process -FilePath $npmCmd -ArgumentList "install $($depProducao -join ' ')" -NoNewWindow -Wait
    } else {
        npm install $depProducao
    }
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Erro ao instalar dependências de producao!" -ForegroundColor Red
        return
    }
    
    Write-Host "Instalando dependencias de desenvolvimento..." -ForegroundColor Yellow
    Write-Host "  nodemon, typescript, @types/*, concurrently" -ForegroundColor Gray
    if ($npmCmd) {
        Start-Process -FilePath $npmCmd -ArgumentList "install --save-dev $($depDesenvolvimento -join ' ')" -NoNewWindow -Wait
    } else {
        npm install --save-dev $depDesenvolvimento
    }
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Erro ao instalar dependências de desenvolvimento!" -ForegroundColor Red
        return
    }
    
    Write-Host "Dependecias instaladas com sucesso!" -ForegroundColor green
    return
}

Export-ModuleMember -Function installDependencies  