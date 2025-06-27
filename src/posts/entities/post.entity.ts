import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Posts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    category: string;
}
