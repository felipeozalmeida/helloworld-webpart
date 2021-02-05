# HelloWorld WebPart


# Sumário

Este repositório contém uma WebPart de exemplo, feita para o SharePoint Framework (ou SPFx).
Utiliza React para componentes, Sass para estilos e a biblioteca @pnp/pnpjs para interação com
APIs do SharePoint.


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

4. Acesse o WorkBench para desenvolver a sua WebPart de forma local:
- `https://localhost:4321/temp/workbench.html`


# Interação com SharePoint

É possível desenvolver a WebPart usando os dados reais de uma instância do SharePoint. Isso é possível por meio da
versão remota do WorkBench. Se pretende usar apenas ela, comece a subir a solução utilizando o comando abaixo:
- `gulp serve --nobrowser`

Depois, acesse a seguinte rota para utilizar a versão remota do WorkBench:
- `https://seu-tenant.sharepoint.com/_layouts/workbench.aspx`

Note que os dados retornados pela API do SharePoint no WorkBench são relativos ao site presente na URL.
Ao buscar na sua WebPart pelas listas existentes do site atual via API, a rota acima retornará as listas do site raíz.
Já a rota abaixo retornará as listas presentes no site especificado na URL. Exemplo:
- `https://seu-tenant.sharepoint.com/sites/seu-site/_layouts/workbench.aspx`

Tenha isso em mente ao desenvolver a sua WebPart. Sempre que possível, use o WorkBench a partir do site onde a sua
WebPart será implantada para trabalhar com os dados desejados.


# Ambiente de Deploy

É preciso criar um site do tipo "App Catalog" para hospedar as suas WebParts se ele não existir.
Lá é possível realizar o gerenciamento das WebParts disponíveis para a instância do SharePoint.

1. Para realizar a sua criação, acesse o SharePoint Admin Center com uma conta administrativa pela seguinte rota:
- `https://seu-tenant-admin.sharepoint.com/` (basta acrescentar `-admin`)

2. Vá para a página "More Features" e, dentro de "Apps", selecione "Open".

3. Dentro da página "Apps", selecione "App Catalog" e dê "OK".

4. Na próxima página, insira os dados do seu catálogo de aplicativos:
- Title: `Apps`
- Web Site Address suffix: `apps`
- Administrator: selecione uma conta para ser admin do site

5. Finalize a criação do catálogo de aplicativos clicando em "OK".

6. Dentro de alguns minutos, ele será criado e estará ativo. Para acessá-lo, utilize a seguinte rota:
- `https://seu-tenant.sharepoint.com/sites/apps`


# Deploy da WebPart

É preciso gerar um pacote de distribuição da WebPart que contenha os seus arquivos comprimidos e prontos para deploy.
Após isso, deve-se subir o pacote da WebPart num site do tipo "App Catalog" para que a solução fique disponível para
ser adicionada em sites de uma instância do SharePoint.

1. Gere o pacote da solução com os seguintes comandos:
- `gulp bundle --ship`
- `gulp package-solution --ship`

2. Após isso, abra o seu site do tipo "App Catalog" e vá para "Apps for SharePoint".

3. Faça o upload do pacote da sua WebPart ou clique e arraste o pacote no meio da página.

4. Na janela que aparecer, observe de quais domínios a sua solução buscará conteúdo.
- Se "localhost" estiver listado, isso significa que só irá funcionar quando o seu servidor local estiver em execução.
- Se "SharePoint Online" estiver listado, seus arquivos estáticos serão servidos diretamente do catálogo de aplicativos
  da sua instância do SharePoint ou a partir da CDN da Microsoft (veja artigo no final para saber como habilitá-la).   

5. Clique em "Deploy" para finalizar.


# Adicionando a sua WebPart a um site

1. Abra o site onde pretende utilizar a sua WebPart.

2. Clique no botão "New" e selecione "App" (também pode acessar via ícone de engrenagem no canto superior direito).

3. Dentro de "Apps you can add", encontre a sua WebPart e clique nela para realizar a instalação.

4. Em alguns instantes, a sua WebPart estará pronta para uso.


# Arquitetura

Esta solução contém dois serviços de exemplo para interações com a API do SharePoint. O primeiro serviço,
`BasicHttpService`, utiliza o cliente HTTP disponibilizado via Javascript pelo contexto do SharePoint.
É uma implementação bem básica e até manual. Já o segundo serviço, `SPHttpService`, é bem mais robusto, pois utiliza a
biblioteca @pnp/pnpjs por trás. Ela tem muitas funcionalidades já prontas e a sua API aborda diferentes aspectos do
SharePoint Framework.

Por fim, a utilização do segundo serviço é facilitada por causa do `serviceScope`. Esta variável atua como um container
para injeção de dependências do SPFx. Por meio dele, é possível registrar a classe do seu serviço e obter uma instância
a partir de qualquer lugar da sua aplicação.

Ambos os serviços foram adicionados como exemplos de como interagir com a API do SharePoint. No componente React
`HelloWorld.tsx`, é possível ver a utilização de ambos.

Sempre que possível, use o `SPHttpService` como referência tanto para criação dos seus próprios serviços utilizando o
`serviceScope` quanto para interações com a API REST do SharePoint.


## Arquivos

- `config/package-solution.json`: dados gerais sobre a WebPart
- `sharepoint/solution/helloworld-webpart.sppkg`: artefato produzido para deploy da WebPart
- `src/webparts/helloWorld`: pasta principal da WebPart
- `src/webparts/helloWorld/components`: componentes React da WebPart
- `src/webparts/helloWorld/loc`: strings e traduções da WebPart
- `src/webparts/helloWorld/HelloWorldWebPart.manifest.json`: configuração padrão da WebPart
- `src/webparts/helloWorld/HelloWorldWebPart.ts`: arquivo principal da Webpart


# Referências

- [Build your first SharePoint client-side web part (Hello World part 1)](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/build-a-hello-world-web-part)
- [How to get started with React for building advanced SPFx solutions](https://laurakokkarinen.com/how-to-get-started-with-react-for-building-advanced-spfx-solutions/)
- [How to use the service locator pattern in SPFx React solutions](https://laurakokkarinen.com/how-to-use-the-service-locator-pattern-in-spfx-react-solutions/)
- [SPFx – scoped context services](https://ypcode.wordpress.com/2019/08/19/spfx-scoped-context-services/)
- [Basic Tutorial &middot; OData - the Best Way to REST](https://www.odata.org/getting-started/basic-tutorial/)


# Ver mais

- [Como habilitar a CDN do Microsoft 365](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/enable-microsoft-365-content-delivery-network?tabs=msposh)
- [Biblioteca oficial para interações com a API REST do SharePoint](https://pnp.github.io/pnpjs/)
- [Biblioteca oficial de componentes React para o SharePoint Framework](https://pnp.github.io/sp-dev-fx-controls-react/)
