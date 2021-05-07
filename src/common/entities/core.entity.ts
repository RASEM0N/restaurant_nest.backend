import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class CoreEntity {
    @PrimaryGeneratedColumn()
    @Field((type) => Number)
    id: number

    @CreateDateColumn()
    @Field((type) => Date)
    createdAt: Date

    @UpdateDateColumn()
    @Field((type) => Date)
    updatedAt: Date
}
