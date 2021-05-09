import { InputType, ObjectType, PickType } from '@nestjs/graphql'
import { MutationOutput } from 'src/common/dtos/output.dto'
import { User } from '../entities/users.entity'

/**
 * Входные данные
 * @InputType        email & password & role
 */
@InputType()
export class CreateAccountInput extends PickType(User, ['email', 'password', 'role']) {}

/**
 * Выходные данные
 * @ObjectType       ok & error?
 */
@ObjectType()
export class CreateAccountOutput extends MutationOutput {}
