function typesTemplate {
    param (
        [string]$caminho
    )

    $templateInertia = @"

import { Inertia } from 'node-inertiajs';

declare module 'express-serve-static-core' {
    interface Response {
        inertia: Inertia;
    }
}

"@

$pastaTypes = "$caminho\types"

if(-not(Test-Path -Path $pastaTypes)){
    Write-Host "  [AVISO] Pasta Types nao existe em: $pastaTypes" -ForegroundColor Yellow
    Write-Host "  Criando pasta Types..." -ForegroundColor Yellow
    New-Item -Path $pastaTypes -ItemType Directory -Force | Out-Null
}

try {
    
    New-Item -ItemType File -Path $pastaTypes -Value $templateInertia -Force | Out-Null
    Write-Host "  [OK] Inertia types criada com sucesso" -ForegroundColor Green
        return $true
}
catch {
    Write-Host "  [ERRO] Erro ao criar Inertia Types: $_" -ForegroundColor Red
    return $false
}

}
Export-ModuleMember -Functio typesTemplate