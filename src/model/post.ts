
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    idPost: number;
    @Column()
    namePost: string;
    @Column({type: 'text'})
    image: string;
    @Column()
    date: number;
    @Column()
    description: string;
    @Column()
    idUser: number;

}