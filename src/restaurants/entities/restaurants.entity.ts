import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator'

/* Field для GraphQL,
 * Column & Primary... для typeorm и PostgreSQL
 * */
@InputType({
    isAbstract: true,
})
@ObjectType() // -- graphql --
@Entity() // -- typeorm --
export class Restaurant {
    @Field((type) => Number)
    @PrimaryGeneratedColumn() // первичный коюч
    id: number

    @Field((type) => String)
    @Column()
    @IsString()
    @Length(5, 10)
    name: string

    @Field((type) => Boolean, {
        nullable: true,
    })
    @Column({ default: true })
    @IsOptional()
    @IsBoolean()
    isVegan: boolean

    @Field((type) => String, {
        defaultValue: 'Russia, Ekat',
    })
    @Column()
    @IsString()
    address: string
}
