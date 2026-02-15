# release.ps1 — Script para criar e publicar uma nova release
# Uso: .\release.ps1 -Versao "1.0.0" -Mensagem "Primeira versão estável"

param(
    [Parameter(Mandatory=$true)]
    [string]$Versao,

    [string]$Mensagem = "Release v$Versao"
)

$tag = "v$Versao"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Publicando Release: $tag" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verifica se a tag já existe
$tagExiste = git tag -l $tag
if ($tagExiste) {
    Write-Host "[ERRO] A tag $tag ja existe!" -ForegroundColor Red
    Write-Host "Use uma versao diferente ou delete a tag com: git tag -d $tag" -ForegroundColor Yellow
    exit 1
}

# Verifica se há mudanças não commitadas
$status = git status --porcelain
if ($status) {
    Write-Host "Mudancas encontradas, commitando..." -ForegroundColor Yellow
    git add .
    git commit -m $Mensagem
} else {
    Write-Host "Nenhuma mudanca pendente." -ForegroundColor Gray
}

# Cria a tag
Write-Host "Criando tag $tag..." -ForegroundColor Yellow
git tag $tag

# Push do código e da tag
Write-Host "Enviando para o GitHub..." -ForegroundColor Yellow
git push origin main
git push origin $tag

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Release $tag publicada com sucesso!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "O GitHub Actions vai buildar o .exe automaticamente." -ForegroundColor White
Write-Host "Acompanhe em: https://github.com/JoaoHCSilva/Automa-o-Node/actions" -ForegroundColor Gray
Write-Host "Download em:  https://github.com/JoaoHCSilva/Automa-o-Node/releases" -ForegroundColor Gray
Write-Host ""
