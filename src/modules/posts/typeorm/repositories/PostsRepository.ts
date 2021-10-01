import { EntityRepository, Repository } from 'typeorm';
import Post from '../entities/Post';

@EntityRepository(Post)
export default class PostRepository extends Repository<Post> {
    public async findByTitle(title: string): Promise<Post | undefined> {
        const post = this.findOne({ where: { title } });
        return post;
    }
}
