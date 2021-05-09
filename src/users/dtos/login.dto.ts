/* eslint-disable @typescript-eslint/no-unused-vars */
import { MutationOutput } from '../../common/dtos/output.dto'
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql'
import { User } from '../entities/users.entity'

// в PickType достаем определенные поля из User entity,
// и последущем мы их наследуем

/**
 * Входные данные
 * @InputType        email & password
 */
@InputType()
export class LoginInput extends PickType(User, ['email', 'password']) {}

/**
 * Выходные данные
 * @ObjectType        token, error? & ok
 */
@ObjectType()
export class LoginOutput extends MutationOutput {
    @Field((type) => String, { nullable: true })
    token?: string
}
