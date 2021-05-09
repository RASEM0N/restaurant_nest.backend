import { ArgsType, Field, ObjectType } from '@nestjs/graphql'
import { MutationOutput } from '../../common/dtos/output.dto'
import { User } from '../entities/users.entity'

/**
 * Входные данные
 * @ArgsType        userId
 */
@ArgsType()
export class UserProfileInput {
    @Field((type) => Number)
    userId: number
}

/**
 * Выходные данные
 * @ObjectType      User entity, ok & error
 */
@ObjectType()
export class UserProfileOutput extends MutationOutput {
    @Field((type) => User, { nullable: true })
    user?: User
}
