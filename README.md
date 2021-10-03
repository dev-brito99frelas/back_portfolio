# blogdoCL
## Necessario para executar  
- Ter node instalado em sua máquina  
- Ter uma instancia do Postgres rodando em sua máquina na porta 5432
- Criar na raiz do desse projeto um arquivo de nome **ormconfig.json** com a seguinte configuração de banco,"ou parecida":  
```
{
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "postgres",
    "database": "blog",
    "entities":["./src/modules/**/typeorm/entities/*.ts"],
    "migrations":[
        "./src/shared/typeorm/migrations/*.ts"
      ],
      "cli":{
        "migrationsDir":"./src/shared/typeorm/migrations"
      }

}

```  
- Executar na raiz do projeto:  
```
npm install
```  
- Baixado todas as dependencias com npm, agora é preciso criar o banco via postgres com mesmo nome da database registrda ali no arquivo orm **config.json**, no caso _blog_ ou o que você escolheu. E no banco precisamos criar a extenção **uuid-oosp**,um gerador de id padão postgres.
- Executar as migrations:
```
npm run typeorm migration:run
```
- Executar o Projeto:  
```
npm run dev
```
