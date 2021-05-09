/* eslint-disable @typescript-eslint/no-unused-vars */
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm'
import { CoreEntity } from '../../common/entities/core.entity'
import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql'
import * as bcrypt from 'bcrypt'
import { InternalServerErrorException } from '@nestjs/common'
import { IsEmail, IsEnum, IsString, Length } from 'class-validator'

enum UserRole {
    Owner,
    Client,
    Delivery,
}

registerEnumType(UserRole, { name: 'UserRole' })

/**
 * User entity
 */
@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
    @Field((type) => String)
    @Column()
    @IsEmail()
    email: string

    @Field((type) => String)
    @Column()
    @IsString()
    @Length(5, 16)
    password: string

    @Field((type) => UserRole)
    @Column({ type: 'enum', enum: UserRole })
    @IsEnum(UserRole)
    role: UserRole

    /*
        После добавления данных или чего-то еще
        хэшеирует пароль
       */
    @BeforeUpdate()
    @BeforeInsert()
    async hashPassword(): Promise<void> {
        try {
            this.password = await bcrypt.hash(this.password, 10)
        } catch (e) {
            console.log(e)
            throw new InternalServerErrorException()
        }
    }

    async checkPassword(aPassword: string): Promise<boolean> {
        try {
            const ok: boolean = await bcrypt.compare(aPassword, this.password)
            return ok
        } catch (e) {
            console.log(e)
            return false
        }
    }
}
