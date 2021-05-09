import { Field, ObjectType } from '@nestjs/graphql'


/**
 * Выходные данные
 * @ObjectType        error? & ok
 */
@ObjectType()
export class MutationOutput {
    @Field((type) => String, { nullable: true })
    error?: string

    @Field((type) => Boolean)
    ok: boolean
}
