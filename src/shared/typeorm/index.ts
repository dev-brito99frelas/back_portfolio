import { createConnection } from 'typeorm';

/**
 * Quando ele é chamdo ele procura em toda a estrutura do projeto por um arquivo ormconfig
 * que tem os parametros, as definiçoes para conseguir acessar o banco de dados
 * por isso precisamos fazemos a importação desse arquivo do type orm no server.ts, que quando server startar ele importa
 * esse arquivo, ele procura o ormconfig e pega as config do bd
 */
createConnection();
