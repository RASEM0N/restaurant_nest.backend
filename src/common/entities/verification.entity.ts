/* eslint-disable @typescript-eslint/no-unused-vars */
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { CoreEntity } from './core.entity'
import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { User } from '../../users/entities/users.entity'
import { v4 as uuidv4 } from 'uuid'

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Verification extends CoreEntity {
    @Column()
    @Field((type) => String)
    code: string

    // если удаляется пользовательй, то и это тоже умирает
    @OneToOne((type) => User, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User

    @BeforeInsert()
    createCode(): void {
        this.code = uuidv4()
    }
}
