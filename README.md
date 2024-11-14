# SPA-CEP

Este projeto é uma Single Page Application (SPA) desenvolvida em Vue.js para busca de endereços via CEP. A aplicação consulta uma API externa(viacep.com.br) e exibe os dados do endereço correspondente ao CEP informado. O projeto também utiliza Vue Router para navegação entre páginas.

### Link da Aplicação
A aplicação está hospedada em: [https://app-uhpfront.szmxvf.easypanel.host/](https://app-uhpfront.szmxvf.easypanel.host/)

## Requisitos do Projeto

Este projeto foi desenvolvido como parte de uma avaliação técnica com os seguintes requisitos:

1. **Backend:**
   - Criar uma API que consuma um CEP e retorne dados do endereço utilizando uma API externa (ex: [ViaCEP](https://viacep.com.br/)).
   - A API foi desenvolvida em PHP para atender a essa necessidade.

2. **Frontend:**
   - Desenvolver uma SPA em Vue.js com as seguintes características:
     - Página inicial (Home):
       - Exibir uma breve descrição.
       - Incluir uma imagem.
       - Apresentar um botão que redireciona para a página de busca (usando Vue Router).
     - Página de busca:
       - Campo de pesquisa numérico para CEP (aceita apenas números).
       - Validação no frontend para garantir que o CEP seja composto apenas por números e tenha exatamente 8 dígitos. Caso o valor inserido seja inválido, a aplicação exibirá uma mensagem de erro.
       - Botão de busca que retorna o endereço correspondente ao CEP pesquisado.
       - Exibição amigável dos dados de endereço, incluindo logradouro, bairro, cidade, e DDD.
       - Botão de voltar, retornando à página inicial.
     - Funcionalidade de histórico de buscas e mapa do endereço usando integração com API de geolocalização (OpenStreetMap).
   - Requisitos adicionais para melhorar a apresentação e usabilidade:
     - Utilização do **Vuex** para gerenciamento de estado centralizado.

## Funcionalidades

- **Validação de CEP**: 
  - No **frontend**, o CEP inserido é validado para garantir que contenha apenas números e tenha exatamente 8 dígitos.
  - No **backend**, a API em PHP também realiza uma validação adicional, garantindo que o CEP seja válido antes de consultar a API externa.
- **Busca de Endereço**: A aplicação realiza a busca do endereço na API externa e exibe o resultado.
- **Histórico de Pesquisas**: O histórico de buscas é armazenado localmente, permitindo ao usuário revisitar CEPs pesquisados recentemente.
- **Mapa do Endereço**: A aplicação exibe um mapa da localização aproximada do endereço utilizando OpenStreetMap.
  
## Tecnologias Utilizadas

- **Frontend**: Vue.js, Vue Router, Vuex, Axios, Font Awesome
- **Backend**: PHP para construção da API que consome o serviço de CEP
- **APIs Externas**:
  - [ViaCEP](https://viacep.com.br/) para consulta de dados de endereço por CEP.
  - [OpenStreetMap](https://www.openstreetmap.org/) para exibição de mapas.

## Estrutura do Projeto

```plaintext
.
├── public/                # Arquivos públicos da aplicação
├── src/                   # Código-fonte Vue.js
│   ├── components/        # Componentes Vue
│   ├── views/             # Páginas da SPA
│   ├── router/            # Configuração de rotas
│   ├── store/             # Configuração Vuex
│   └── App.vue            # Componente principal
├── server/                # Código da API em PHP
└── README.md              # Documentação do projeto
```

## Instruções de Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/databotella/SPA-CEP.git
   cd SPA-CEP
   ```

2. Instale as dependências do frontend:
   ```bash
   npm install
   ```

3. Execute a aplicação Vue.js:
   ```bash
   npm run serve
   ```

4. Configuração do Backend (PHP):
   - Configure o servidor para servir o backend PHP na pasta `server/` do projeto, garantindo que a API esteja acessível para o frontend.

## Uso

1. Acesse a aplicação em `http://localhost:8080` (ou o endereço configurado).
2. Na **página inicial**, clique no botão para ir para a página de busca.
3. Na **página de busca**, insira um CEP válido (apenas números) e clique em "Buscar".
4. O endereço será exibido junto com um mapa da localização.
5. Utilize o botão "Voltar" para retornar à página inicial.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
