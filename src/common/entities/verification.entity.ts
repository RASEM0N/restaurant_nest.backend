/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { CoreEntity } from './core.entity'
import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { User } from '../../users/entities/users.entity'

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Verification extends CoreEntity {
    @Column()
    @Field((type) => String)
    code: string

    @OneToOne((type) => User)
    @JoinColumn()
    user: User
}
