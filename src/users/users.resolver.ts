/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { User } from './entities/users.entity'
import { UsersService } from './users.service'
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto'

@Resolver((of) => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Query((returns) => Boolean)
    hi(): boolean {
        return true
    }

    @Mutation((returns) => CreateAccountOutput)
    async createAccount(
        @Args('input') createAccountInput: CreateAccountInput,
    ): Promise<CreateAccountOutput> {
        try {
            const error = await this.usersService.createAccount(createAccountInput)

            if (error) {
                return {
                    ok: false,
                    error,
                }
            }
            return {
                ok: true,
            }
        } catch (error) {
            return {
                error,
                ok: false,
            }
        }
    }
}
