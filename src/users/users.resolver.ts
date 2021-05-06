/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolver, Query } from '@nestjs/graphql'
import { User } from './entities/users.entity'
import { UsersService } from './users.service'

@Resolver((of) => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Query((returns) => Boolean)
    hi(): boolean {
        return true
    }
}
