# adicionarFiles.psm1 — Cria arquivos base do projeto (app, README, .env)
# Refatorado para copiar de skeletons em vez de usar Here-Strings inline

function adicionarFiles() {
    param(
        [string]$caminho,
        [string]$nomeProjeto,
        [string]$nomeArquiApp,
        [string]$extensao
    )

    Write-Host "Iniciando criacao dos arquivos . . . `n"

    # Determina o caminho base dos skeletons conforme a linguagem escolhida
    $skeletonsBase = Join-Path $PSScriptRoot "..\skeletons"
    $skeletonsLang = Join-Path $skeletonsBase $extensao
    $skeletonsShared = Join-Path $skeletonsBase "shared"

    # Copia o arquivo principal da aplicação (app.ts ou app.js) do skeleton
    $appSkeleton = Join-Path $skeletonsLang "app.$extensao"
    $appContent = Get-Content $appSkeleton -Raw -Encoding UTF8
    New-Item -ItemType File -Path . -Name $nomeArquiApp -Value $appContent | Out-Null
    Write-Host "Criado $nomeArquiApp ..." -ForegroundColor White

    # Copia o README.md do skeleton shared e substitui o token do nome do projeto
    $readmeSkeleton = Join-Path $skeletonsShared "README.md"
    $readmeContent = (Get-Content $readmeSkeleton -Raw -Encoding UTF8) -replace '__PROJECT_NAME__', $nomeProjeto
    New-Item -ItemType File -Path . -Name "README.md" -Value $readmeContent | Out-Null
    Write-Host "Criado README.md ...`n" -ForegroundColor White

    # Copia o .env.example do skeleton shared
    $envSkeleton = Join-Path $skeletonsShared ".env.example"
    $envContent = Get-Content $envSkeleton -Raw -Encoding UTF8
    New-Item -ItemType File -Path . -Name ".env.example" -Value $envContent | Out-Null
    Write-Host "Criado .env.example ...`n" -ForegroundColor White
    
    # Cria o .env copiando o .env.example para uso local imediato
    $caminhoCompleto = "."
    try {
        Copy-Item -Path "$caminhoCompleto\.env.example" -Destination "$caminhoCompleto\.env" -ErrorAction Stop
        Write-Host "Criado .env (cópia de .env.example) ...`n" -ForegroundColor Green
    } catch {
        Write-Host "[AVISO] Não foi possível criar .env automaticamente: $_" -ForegroundColor Yellow
    }

    # Se for TypeScript, copia o tsconfig.json rigoroso do skeleton
    if ($extensao -eq "ts") {
        $tsconfigSkeleton = Join-Path $skeletonsLang "tsconfig.json"
        if (Test-Path $tsconfigSkeleton) {
            $tsconfigContent = Get-Content $tsconfigSkeleton -Raw -Encoding UTF8
            New-Item -ItemType File -Path . -Name "tsconfig.json" -Value $tsconfigContent | Out-Null
            Write-Host "Criado tsconfig.json ...`n" -ForegroundColor Green
        }
    }
    
    # Exibe lista dos arquivos criados
    Write-Host "Arquivos criados:`n" -ForegroundColor Yellow
    $arquivos = @($nomeArquiApp, "README.md", ".env.example", ".env")
    if ($extensao -eq "ts") { $arquivos += "tsconfig.json" }
    foreach ($arquivo in $arquivos) {
        Write-Host " - $arquivo`n" -ForegroundColor White
    }
}

Export-ModuleMember -Function adicionarFiles