# Purchase Risk Api

Projeto participante do UpChallenge, desafio técnico da Upnid, se consiste em um API que avalia uma transação de e-commerce e retorna um score de 0 a 100 de risco.
A API recebe uma requisição HTTP do tipo POST contendo um array de transações e retorna um novo array contendo a chave e o score resultante.

Exemplo de requisição:

```
[ 
    {
        "id": "875623",
        "value": "243.37",
        "paid_at": "2020-07-29 10:15:23",
        "ip_location": "GO/BR",
        "card_hold_name": "Julio Cesar Vieira",
        "customer": {
            "id": "56321",
            "name": "Julio Cesar Vieira",
            "birth_date": "1995-08-02"
            "state": "GO/BR",
            "phone": "62 99630-8627"
        }
    }
]

```

Resposta da API:

```
[
    {
        "id": "875623",
        "score": "5"
    }
]

```

## Como iniciar o servidor da API

Para iniciar o projeto em localhost é necessário que o ***[NodeJs](https://nodejs.org/)*** e o Gerenciador de Pacotes **[Yarn](https://yarnpkg.com/)** estejam instalado em seu computador
Com os dois já instalados, basta seguir o passo a passo em ordem:

1. Clone o repositório utilizando o comando:
`git clone <https://github.com/juliovcruz/purchase-risk-api.git`>
2. Entre na pasta raiz do projeto
3. Instale as dependências do projeto utilizando o comando:
`yarn`
4. Para iniciar o servidor do projeto utilize o comando:
`yarn start` 
5. Para utilizar a API, envie uma requisição POST semelhante à apresentada acima para 'http://localhost:5000/risk'

### Comandos

> yarn build - (Inicia o servidor)
yarn test - (Inicia todos os testes do projeto)
yarn test:ci - (Inicia todos os testes e gera a pasta coverage)

## Tecnologias utilizadas

- NodeJS
- Yarn (Gerenciador de pacotes)
- Typescript (Linguagem de programação)
- Jest (Framework de testes)
- Husky (Framework para garantir que não seja enviado commit e push com erros nos testes)
- Express (Framework para utilização de rotas internas)
- Axios (Framework que permite requisições externas)
- Insomnia (Software para requisições HTTP)
- Eslint (Padronização de código)

## Detalhes sobre o projeto e seu desenvolvimento

A criação deste projeto foi bem desafiadora para mim, desenvolvi utilizando alguns conceitos de programação , padrões de projeto e frameworks que eu nunca havia utilizado anteriormente, como o axios que foi um pouco complicado para implementar do jeito que eu queria, porém felizmente obtive sucesso. A minha principal intenção era respeitar todos os conceitos do SOLID, para isso foi utilizado alguns padrões de projeto, assim tornando o código bem estruturado, independente e fácil de ser testado, durante toda a implementação foi pensado em testes, então há testes unitários garantindo todas as funcionalidades da API.

Ao receber uma requisição, a API verifica os dados recebidos utilizando métodos verificadores de risco (RiskCheckers), então ela calcula uma pontuação de risco e responde com o resultado, toda as pontuções são configuráveis no método factory do RiskChecker (src/main/config/score-level-risk), também foi implementado alguns validadores, eles garantem que a requisição seja realizada com todos os paramêtros e que estejam da forma esperada, se houver falha em algum validador a API retornará o erro encontrado.

### RiskCheckers

Os verificadores são o principal recurso da API, pois a resposta está totalmente ligada à eles
Lista dos verificadores da API:

- CardNameChecker - verifica a compatibilidade do nome do cartão e do nome do cliente
- FullNameChecker - verifica se o nome recebido possui apenas o primeiro nome
- LocationChecker - verifica se compatibilidade da localização da transação e da localização do cliente
- PhoneDDDChecker - verifica a compatiblidade do DDD do telefone com a localização do cliente e da transação
- ValidPhoneChecker - verifica se o telefone de fato é verdadeiro e utilizado por alguém, este verificador utiliza uma API externa