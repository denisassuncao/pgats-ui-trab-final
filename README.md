# Projeto de Testes — AutomationExercise (Cypress)

Este repositório contém uma suíte de testes automatizados para a aplicação demo "Automation Exercise".
Os testes foram implementados com Cypress usando o padrão Page Object. A biblioteca `@faker-js/faker` é utilizada para gerar dados únicos em cadastros.

## O que há aqui
- Testes automatizados para os Test Cases: 1, 2, 3, 4, 5, 6, 8, 9, 10 e 15.
- Page Objects em `cypress/pages/`.
- Specs em `cypress/e2e/`.
- Relatórios mochawesome gerados em `cypress/reports/`.
- Artefatos de execução: `cypress/screenshots/` e `cypress/videos/`.
- Workflow GitHub Actions em `.github/workflows/ci.yml` para rodar os testes em cada push/PR e publicar relatórios.

## Pré-requisitos
- Node.js (recomendado v18 LTS)
- npm (ou yarn)
- No CI o workflow usa Chrome instalado via ação `browser-actions/setup-chrome`.

## Instalação (local)
Abra o PowerShell na raiz do projeto (`c:\AUTOMACAO\pgats-ui-trab-final`) e execute:

```powershell
npm ci
```

## Executar os testes localmente
- Modo headless (padrão):

```powershell
npm test
```

- Abrir runner interativo (headed):

```powershell
npm run test:headed
```

- Executar em CI com reporter mochawesome (gera JSON + HTML):

```powershell
npm run test:ci
```

- Para rodar um spec específico (exemplo Windows PowerShell):

```powershell
npx cypress run --spec "cypress/e2e/tc15_place_order.cy.ts"
```

## Relatórios
- Após execução local ou CI, os relatórios gerados ficam em `cypress/reports/`.
- O workflow de CI mescla os JSONs do mochawesome e gera um HTML consolidado. Também publica os relatórios no GitHub Pages (configurado no workflow) e faz upload dos artefatos (reports, screenshots, videos).

### Mesclar relatórios localmente
Se precisar mesclar relatórios localmente:

```powershell
npm run merge:reports
```

(Esse script usa `mochawesome-merge` e `marge` para gerar `cypress/reports/report.html`)

## Estrutura importante
- `cypress/e2e/` — especificações dos testes (arquivos `.cy.ts`).
- `cypress/pages/` — Page Objects para organizar seletores e ações.
- `cypress/support/` — comandos e configuração global do Cypress.
- `cypress/reports/` — relatórios HTML/JSON do mochawesome.
- `cypress/screenshots/` e `cypress/videos/` — artefatos produzidos automaticamente.

## CI — GitHub Actions
- Arquivo: `.github/workflows/ci.yml`
- O workflow:
  - Faz checkout do código
  - Configura Chrome e Node.js
  - Executa `npm ci`
  - Executa `npm run test:ci` (os testes em headless)
  - Mescla relatórios e publica o HTML
  - Faz upload dos artefatos (reports, screenshots, videos)
  - Publica os relatórios no GitHub Pages usando `peaceiris/actions-gh-pages`

Observação: o workflow usa o `GITHUB_TOKEN` disponível automaticamente nos runners para publicar no branch gh-pages. Nenhuma secret adicional é necessária para publicar, a menos que sua política de repositório exija outra configuração.

## Como preparar o zip de entrega (sem node_modules)
Para criar um pacote sem `node_modules` (recomendado antes de enviar por upload):

No PowerShell:

```powershell
# Na raiz do projeto
Remove-Item -Recurse -Force node_modules
Compress-Archive -Path . -DestinationPath automationexercise-cypress.zip
```

Se quiser manter `node_modules` localmente, faça uma cópia temporária antes de remover:

```powershell
Copy-Item -Recurse -Force . .\package-for-delivery
Remove-Item -Recurse -Force .\package-for-delivery\node_modules
Compress-Archive -Path .\package-for-delivery -DestinationPath automationexercise-cypress.zip
# (em seguida remova a pasta temporária se desejar)
Remove-Item -Recurse -Force .\package-for-delivery
```

## Notas e dicas
- Alguns avisos do Cypress podem aparecer (por exemplo: "Missing baseUrl in compilerOptions"). Eles não impedem a execução dos testes, mas você pode ajustar `tsconfig.json` se desejar silenciá-los.
- Para tornar os testes mais resilientes:
  - Preferir seletores por texto ou `data-qa` quando disponíveis.
  - Evitar clicar em seletores que retornam múltiplos elementos; usar `.first()` ou selecionar pelo link de detalhe do produto.
  - Adicionar `should('be.visible')` antes de ações sensíveis.
- Faker está configurado e usado nos testes para gerar emails/nomes únicos — revisar os specs em `cypress/e2e/` para ver exemplos.

## Problemas comuns
- Erro: `cy.click() can only be called on a single element` — geralmente significa que o seletor retornou múltiplos elementos; usar `first()` ou selecionar mais específico.
- Caso algum teste falhe no CI, confira os screenshots e vídeos em `cypress/screenshots/` e `cypress/videos/` (artefatos no job do Actions).

## Próximos passos sugeridos
- Ajustar/escalonar regras do ESLint/TS para garantir qualidade do código.
- Incrementar o workflow com upload para um relatório centralizado ou badge de status.

---
