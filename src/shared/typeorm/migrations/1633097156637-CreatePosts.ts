import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePosts1633097156637 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'posts',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                    },
                    {
                        name: 'content',
                        type: 'varchar',
                    },
                    {
                        name: 'img_url',
                        type: 'varchar',
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
                foreignKeys: [
                    {
                        name: 'PostofUser',
                        referencedTableName: 'users', //qual tabela se referenciando
                        referencedColumnNames: ['id'], //qual campo da tabela referenciada
                        columnNames: ['id'], //qual atributo usado para refenciar
                        onDelete: 'CASCADE', //quando deletada o user o que acontece com essas info
                        onUpdate: 'CASCADE',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('posts');
    }
}
