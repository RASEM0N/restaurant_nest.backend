import { Field, ObjectType } from '@nestjs/graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

/* Field для GraphQL,
 * Column & Primary... для typeorm и PostgreSQL
 * */

@ObjectType() // -- graphql --
@Entity() // -- typeorm --
export class Restaurant {
    @Field((type) => Number)
    @PrimaryGeneratedColumn() // первичный коюч
    id: number

    @Field((type) => String)
    @Column()
    name: string

    @Field((type) => Boolean)
    @Column()
    isVegan: boolean

    @Field((type) => String)
    @Column()
    address: string

    @Field((type) => String)
    @Column()
    ownName: string

    @Field((type) => String)
    @Column()
    categoryName: string
}
