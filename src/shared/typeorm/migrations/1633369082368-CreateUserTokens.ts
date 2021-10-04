import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTokens1633369082368 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user_tokens',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'token',
                        type: 'uuid',
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
                //novidade - o relacionamento de foreigh key daqui para usuario
                foreignKeys: [
                    {
                        name: 'TokenUser',
                        referencedTableName: 'users', //qual tabela se referenciando
                        referencedColumnNames: ['id'], //qual campo da tabela referenciada
                        columnNames: ['user_id'], //qual atributo usado para refenciar
                        onDelete: 'CASCADE', //quando deletada o user o que acontece com essas info
                        onUpdate: 'CASCADE',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user_tokens');
    }
}
