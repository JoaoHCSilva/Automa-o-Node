# Automação Node

## Descricao

Projeto de automação de criação de pastas e arquivos de um projeto nodejs, a ideia surguiu, pois como eu sempre me embolava
ao iniciar meus projetos node, eu resolvi criar um script para automatizar esse processo. Fique a vontade para subir
uma issue ou pull request com alguma melhoria, ainda tem muito o que melhorar neste projeto, porém isso vou pensando ao decorrer
das semanas ou quando a necessidade surgir :p

## Pre-requisitos

- PowerShell 5.1 ou superior (Recomendado PowerShell 7.4 ou superior)
- Privilégios para criar pastas e arquivos
- Node.js 20.11.1 ou superior (Recomendado Node.js 22.12.0 ou superior)

## Como Executar

### Opcao 1: Via PowerShell

```powershell
.\main.ps1
```

### Opcao 2: Via release (Recomendado)

1. Baixe o arquivo `.zip` na página de [Releases](https://github.com/JoaoHCSilva/Automa-o-Node/releases)
2. Extraia em uma pasta de sua preferência
3. Execute o `TemplateNodeAppGUI.exe`

> **⚠️ Aviso do Windows SmartScreen:** Na primeira execução, o Windows pode exibir a mensagem "O Windows protegeu o computador". Isso acontece porque o aplicativo não possui assinatura digital (certificado pago). Para prosseguir:
>
> 1. Clique em **"Mais informações"**
> 2. Clique em **"Executar assim mesmo"**
>
> Outra opção: clique com o botão direito no `.exe` → Propriedades → marque **"Desbloquear"** → OK

## Estrutura do Projeto

```
AutomacaoNode/
|__assets/          # Arquivos de configuracao
|__dist/            # Arquivos gerados
|__src/             # Arquivos de configuracao
|__README.md        # Documentacao do projeto
|__.gitignore       # Arquivos ignorados pelo Git
|__templateNodeApp/ # Template de projeto nodejs
```

## Autor

João Henrique - [joaohh41@hotmail.com]
