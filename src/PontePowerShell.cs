// PontePowerShell.cs — Ponte entre a GUI (C#) e o script PowerShell (main.ps1)
// Executa o script como um processo externo e captura a saída em tempo real.

#nullable enable

using System;
using System.Diagnostics;
using System.IO;
using System.Threading.Tasks;

namespace TemplateNodeAppGUI
{
    /// <summary>
    /// Classe responsável por executar scripts PowerShell e capturar a saída.
    /// Funciona como a "ponte" entre a interface gráfica e o script main.ps1.
    /// </summary>
    public class PontePowerShell
    {
        // Evento disparado quando o PowerShell envia uma nova linha de texto
        public event Action<string>? OnOutput;

        // Evento disparado quando o script termina (true = sucesso, false = erro)
        public event Action<bool>? OnFinished;

        // Caminho da pasta onde estão os assets (main.ps1, module/, etc.)
        private readonly string _assetsPath;

        public PontePowerShell(string assetsPath)
        {
            _assetsPath = assetsPath;
        }

        /// <summary>
        /// Executa o script main.ps1 de forma modificada — em vez de usar Read-Host interativo,
        /// passamos os parâmetros como argumentos para um script wrapper que chama as funções.
        /// </summary>
        /// <param name="nomeProjeto">Nome do projeto a criar</param>
        /// <param name="caminho">Caminho onde criar o projeto</param>
        /// <param name="linguagem">Índice da linguagem: 0 = JavaScript, 1 = TypeScript</param>
        /// <param name="template">Índice do template Vite (0-10)</param>
        public async Task ExecutarAsync(string nomeProjeto, string caminho, int linguagem, int template)
        {
            // Monta o script PowerShell inline que importa os módulos e executa as funções
            // Isso evita o problema de Read-Host que pede input interativo
            string scriptWrapper = GerarScriptWrapper(nomeProjeto, caminho, linguagem, template);

            // Salva o script em um arquivo temporário para evitar problemas com
            // caracteres especiais e limites de tamanho na linha de comando
            string tempScript = Path.Combine(Path.GetTempPath(), $"TemplateNodeApp_{Guid.NewGuid():N}.ps1");

            await Task.Run(() =>
            {
                try
                {
                    // Escreve o script no arquivo temporário
                    File.WriteAllText(tempScript, scriptWrapper, System.Text.Encoding.UTF8);

                    // Configura o processo PowerShell para executar o arquivo de script
                    var startInfo = new ProcessStartInfo
                    {
                        FileName = "powershell.exe",
                        Arguments = $"-NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File \"{tempScript}\"",
                        UseShellExecute = false,          // Necessário para capturar saída
                        RedirectStandardOutput = true,    // Captura stdout
                        RedirectStandardError = true,     // Captura stderr
                        CreateNoWindow = true,            // Não abre janela do console
                        WorkingDirectory = _assetsPath
                    };

                    using var processo = new Process();
                    processo.StartInfo = startInfo;

                    // Captura cada linha de output em tempo real
                    processo.OutputDataReceived += (sender, e) =>
                    {
                        if (e.Data != null)
                        {
                            OnOutput?.Invoke(e.Data);
                        }
                    };

                    // Captura erros também
                    processo.ErrorDataReceived += (sender, e) =>
                    {
                        if (e.Data != null)
                        {
                            OnOutput?.Invoke($"[ERRO] {e.Data}");
                        }
                    };

                    processo.Start();
                    processo.BeginOutputReadLine();
                    processo.BeginErrorReadLine();
                    processo.WaitForExit();

                    // Informa se terminou com sucesso ou com erro
                    bool sucesso = processo.ExitCode == 0;
                    OnFinished?.Invoke(sucesso);
                }
                catch (Exception ex)
                {
                    OnOutput?.Invoke($"[ERRO FATAL] {ex.Message}");
                    OnFinished?.Invoke(false);
                }
                finally
                {
                    // Remove o arquivo temporário
                    try { File.Delete(tempScript); } catch { }
                }
            });
        }

        /// <summary>
        /// Gera um script PowerShell que executa as mesmas ações do main.ps1,
        /// mas sem pedir input interativo (Read-Host). Os valores vêm da GUI.
        /// </summary>
        private string GerarScriptWrapper(string nomeProjeto, string caminho, int linguagem, int template)
        {
            string modulePath = Path.Combine(_assetsPath, "module");

            // Frameworks: 0 = React, 1 = Vue, 2 = Vanilla (mesma ordem do index.html)
            string[] frameworks = { "react", "vue", "vanilla" };
            string[] extensoes = { "js", "ts" };

            string frameworkBase = template >= 0 && template < frameworks.Length ? frameworks[template] : "react";
            string extensaoEscolhida = linguagem >= 0 && linguagem < extensoes.Length ? extensoes[linguagem] : "js";

            // Combina framework + linguagem para o template Vite (ex: "react-ts", "vue", "vanilla-ts")
            string templateEscolhido = extensaoEscolhida == "ts" ? $"{frameworkBase}-ts" : frameworkBase;


            // Script PowerShell que replica a lógica do main.ps1 usando os parâmetros da GUI
            // Salvo em arquivo .ps1 temporário — usa sintaxe PowerShell padrão
            // NOTA: PowerShell single-quoted strings são literais, não precisam de escape de backslash
            return $@"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::InputEncoding = [System.Text.Encoding]::UTF8

$modulePath = '{modulePath}'

Import-Module (Join-Path $modulePath 'viteInstal.psm1') -Force
Import-Module (Join-Path $modulePath 'adicionarFiles.psm1') -Force
Import-Module (Join-Path $modulePath 'dependenciasModule.psm1') -Force
Import-Module (Join-Path $modulePath 'routesModel.psm1') -Force
Import-Module (Join-Path $modulePath 'templateModule.psm1') -Force
Import-Module (Join-Path $modulePath 'packageScriptsModule.psm1') -Force
Import-Module (Join-Path $modulePath 'templates\frontendSkeletonModule.psm1') -Force

$nomeProjeto = '{nomeProjeto}'
$caminho = '{caminho}'
$extensaoEscolhida = '{extensaoEscolhida}'
$templateEscolhido = '{templateEscolhido}'

Write-Host 'Verificando pre-requisitos...' -ForegroundColor Cyan

$nodeCmd = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodeCmd) {{
    Write-Host '[ERRO] Node.js nao esta instalado.' -ForegroundColor Red
    exit 1
}}
$nodeVersion = (node --version) -replace 'v', ''
Write-Host ""  [OK] Node.js v$nodeVersion"" -ForegroundColor Green

$npmCmd = Get-Command npm -ErrorAction SilentlyContinue
if (-not $npmCmd) {{
    Write-Host '[ERRO] npm nao esta instalado.' -ForegroundColor Red
    exit 1
}}
$npmVersion = npm --version
Write-Host ""  [OK] npm v$npmVersion"" -ForegroundColor Green

if (-not (Test-Path -Path $caminho)) {{
    New-Item -Path $caminho -ItemType Directory -Force | Out-Null
    Write-Host ""[OK] Caminho criado: $caminho"" -ForegroundColor Green
}}

$caminhoCompleto = Join-Path $caminho $nomeProjeto
if (Test-Path -Path $caminhoCompleto) {{
    Write-Host ""[ERRO] O projeto ja existe em: $caminhoCompleto"" -ForegroundColor Red
    exit 1
}}

New-Item -Path $caminho -Name $nomeProjeto -ItemType Directory -ErrorAction Stop | Out-Null
Write-Host ""Projeto criado em: $caminhoCompleto"" -ForegroundColor Green

$pastas = @('Controllers', 'Models', 'Views', 'Routes', 'Services', 'Helpers', 'Config', 'Database', 'Middleware')
foreach ($pasta in $pastas) {{
    $pastaPath = Join-Path $caminhoCompleto $pasta
    New-Item -Path $pastaPath -ItemType Directory -ErrorAction Stop | Out-Null
    Write-Host ""- $pasta"" -ForegroundColor White
}}

Set-Location -Path $caminhoCompleto -ErrorAction Stop

$nomeArquiApp = ""app.$extensaoEscolhida""
adicionarFiles -caminho $caminho -nomeProjeto $nomeProjeto -nomeArquiApp $nomeArquiApp -extensao $extensaoEscolhida

$skeletonsShared = Join-Path $modulePath '..\skeletons\shared'
$gitignoreSkeleton = Join-Path $skeletonsShared '.gitignore'
$gitignoreContent = Get-Content $gitignoreSkeleton -Raw -Encoding UTF8
$gitignorePath = Join-Path $caminhoCompleto '.gitignore'
New-Item -Path $gitignorePath -ItemType File -Value $gitignoreContent -Force | Out-Null
Write-Host 'Criado .gitignore (do skeleton)' -ForegroundColor Green

routesModel -caminho 'Routes' -extensao $extensaoEscolhida

$caminhoAtual = Get-Location
New-ProjectTemplates -caminho $caminhoAtual -extensao $extensaoEscolhida

instalarVite $nomeProjeto $templateEscolhido
Write-Host 'Vite instalado com sucesso!' -ForegroundColor Green

Copy-FrontendSkeleton -caminho $caminhoCompleto -template $templateEscolhido
Write-Host 'Skeleton frontend copiado!' -ForegroundColor Green

installDependencies -template $templateEscolhido
Write-Host 'Dependencias instaladas!' -ForegroundColor Green

Add-BackendScripts -caminho (Get-Location) -extensao $extensaoEscolhida

Write-Host ''
Write-Host '========================================'
Write-Host ""  Projeto $nomeProjeto criado com sucesso!""
Write-Host '========================================'
Write-Host ""Localizacao: $caminhoCompleto""
Write-Host ""Linguagem: $extensaoEscolhida""
Write-Host ""Framework: $templateEscolhido""
";
        }
    }
}

