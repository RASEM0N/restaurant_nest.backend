/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity } from 'typeorm'
import { CoreEntity } from '../../common/entities/core.entity'
import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql'

enum UserRole {
    Owner,
    Client,
    Delivery,
}

registerEnumType(UserRole, { name: 'UserRole' })

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
    @Field((type) => String)
    @Column()
    email: string

    @Field((type) => String)
    @Column()
    password: string

    @Field((type) => UserRole)
    @Column({ type: 'enum', enum: UserRole })
    role: UserRole
}
