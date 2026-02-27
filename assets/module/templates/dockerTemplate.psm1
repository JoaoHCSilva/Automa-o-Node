<#
.SYNOPSIS
Cria configuração Docker para o projeto.

.DESCRIPTION
Este módulo copia Dockerfile, Dockerfile.dev, docker-compose.yml e .dockerignore
dos skeletons shared (independentes de linguagem).

.NOTES
Autor: João Henrique
Refatorado: Agora usa skeletons em vez de Here-Strings
#>

function New-DockerConfig {
    param(
        [Parameter(Mandatory = $true)]
        [string]$caminho,
        
        [Parameter(Mandatory = $false)]
        [ValidateSet("js", "ts")]
        [string]$extensao = "js"
    )
    
    # Docker files são shared — independentes da linguagem
    $skeletonsBase = Join-Path $PSScriptRoot "..\..\skeletons"
    $skeletonsShared = Join-Path $skeletonsBase "shared"
    
    # Lista de arquivos Docker a copiar do skeleton
    $dockerFiles = @(
        @{ Skeleton = "Dockerfile"; Destino = "Dockerfile" },
        @{ Skeleton = "Dockerfile.dev"; Destino = "Dockerfile.dev" },
        @{ Skeleton = "docker-compose.yml"; Destino = "docker-compose.yml" },
        @{ Skeleton = ".dockerignore"; Destino = ".dockerignore" }
    )
    
    try {
        # Copia cada arquivo Docker do skeleton para o projeto
        foreach ($arquivo in $dockerFiles) {
            $skeletonPath = Join-Path $skeletonsShared $arquivo.Skeleton
            $conteudo = Get-Content $skeletonPath -Raw -Encoding UTF8
            New-Item -Path (Join-Path $caminho $arquivo.Destino) -ItemType File -Value $conteudo -Force | Out-Null
            Write-Host "  [OK] $($arquivo.Destino) criado" -ForegroundColor Green
        }
        
        return $true
    }
    catch {
        Write-Host "  [ERRO] Erro ao criar configuração Docker: $_" -ForegroundColor Red
        return $false
    }
}

Export-ModuleMember -Function New-DockerConfig
