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
        score: "5"
    }
]
```