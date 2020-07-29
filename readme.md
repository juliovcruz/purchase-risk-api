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
        "card_hold_name": "Victor Henrique da Silva",
        "customer": {
            "id": "56321",
            "name": "Victor Henrique da Silva",
            "birth_date": "1995-08-02"
            "state": "GO/BR",
            "phone": "64 99564-3219"
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

## Como iniciar o projeto

Para iniciar o projeto em localhost é necessário o Gerenciador de Pacotes [**Yarn**](https://yarnpkg.com/) 
Depois, basta seguir o passo a passo em ordem:
1. Clone o repositório utilizando o comando:
``git clone https://github.com/juliovcruz/purchase-risk-api.git``
2. Abra a pasta do projeto
3. Para instalar as dependências do projeto utilize o comando:
`yarn`
4. Para compilar o projeto de produção utilize o comando:
`yarn build`