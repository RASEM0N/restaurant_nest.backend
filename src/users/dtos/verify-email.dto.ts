import { InputType, ObjectType, PickType } from '@nestjs/graphql'
import { MutationOutput } from '../../common/dtos/output.dto'
import { Verification } from '../../common/entities/verification.entity'

@ObjectType()
export class VerifyEmailOutput extends MutationOutput {}

@InputType()
export class VerifyEmailInput extends PickType(Verification, ['code']) {}
