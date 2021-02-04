# HelloWorld WebPart

# Sumário

Este repositório contém uma WebPart de exemplo, feita para o SharePoint Framework (ou SPFx).
Utiliza React para componentes e a biblioteca @pnp/pnpjs para interação com APIs do SharePoint.


# Pré-requisitos

É necessária uma instalação do Node.js em uma das seguintes versões:
1. v10.x para SharePoint Server 2019 ou SharePoint Online
2. v8.x.x para SharePoint Server 2016 (necessita variável de ambiente `NODE_NO_HTTP2=1`)

Após isso, use o comando a seguir para instalar as dependências globais para desenvolvimento:
- `npm i -g gulp yo @microsoft/generator-sharepoint`


# Primeiros passos

1. Após clonar o repositório, instale as dependências do projeto:
- `npm i`

2. É necessário confiar no certificado de segurança gerado pelo SPFx:
- `gulp trust-dev-cert`

3. Por fim, utilize o comando abaixo para subir uma instância local do SharePoint Workbench:
- `gulp serve`


# Interação com SharePoint

É possível desenvolver a WebPart usando dados reais de uma instância do SharePoint por meio da versão remota do
WorkBench. Para acessá-lo, use a seguinte rota:
- `https://seu-tenant.sharepoint.com/_layouts/workbench.aspx`


# Deploy de WebParts

É preciso criar um site do tipo "App Catalog" para hospedar as suas WebParts (se não existir).
Lá é possível realizar o controle das WebParts disponíveis para a instância do SharePoint.

1. Para realizar a sua criação, acesse o SharePoint Admin Center com uma conta administrativa pela seguinte rota:
- `https://seu-tenant-admin.sharepoint.com/` (basta acrescentar `-admin`)

2. Vá para a página "More Features" e, dentro de "Apps", selecione "Open"

3. Dentro da página "Apps", selecione "App Catalog" e dê "OK"

4. Na próxima página, insira os dados do seu catálogo de aplicativos:
- Title: `Apps`
- Web Site Address suffix: `apps`
- Administrator: selecione uma conta para ser admin do site

5. Finalize a criação do catálogo de aplicativos clicando em "OK".

6. Dentro de alguns minutos, ele será criado e estará ativo. Para acessá-lo, utilize a seguinte rota:
- `https://seu-tenant.sharepoint.com/sites/apps`

TODO: continuar processo de deploy

gulp bundle --ship
gulp package-solution --ship


# Arquitetura

- `config/package-solution.json`: dados gerais sobre a WebPart
- `sharepoint/solution/your-webpart.sppkg`: artefato produzido para deploy da WebPart
- `src/webparts/yourWebpart`: pasta principal da WebPart
- `src/webparts/yourWebpart/components`: componentes React da WebPart
- `src/webparts/yourWebpart/loc`: strings e traduções da WebPart
- `src/webparts/yourWebpart/YourWebPart.manifest.json`: configuração inicial da WebPart
- `src/webparts/yourWebpart/YourWebPart.ts`: arquivo principal da Webpart


# Referências

- https://docs.microsoft.com/pt-br/sharepoint/dev/spfx/web-parts/get-started/build-a-hello-world-web-part
- https://laurakokkarinen.com/how-to-get-started-with-react-for-building-advanced-spfx-solutions/
- https://laurakokkarinen.com/how-to-use-the-service-locator-pattern-in-spfx-react-solutions/
- https://ypcode.wordpress.com/2019/08/19/spfx-scoped-context-services/
- https://www.odata.org/getting-started/basic-tutorial/


# Ver mais

- https://pnp.github.io/pnpjs/
- https://pnp.github.io/sp-dev-fx-controls-react/
