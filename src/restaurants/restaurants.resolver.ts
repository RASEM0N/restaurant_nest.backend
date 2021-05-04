/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Restaurant } from './entities/restaurants.entity'
import { CreateRestaurantDto } from './dtos/create-restaurant.dto'

@Resolver((of) => Restaurant)
export class RestaurantsResolver {
    @Query((returns) => [Restaurant])
    restaurant(@Args('isVegan') isVegan: boolean): Restaurant[] {
        return []
    }

    @Mutation((returns) => Boolean)
    createRestaurant(@Args() createRestaurantDto: CreateRestaurantDto): boolean {
        return true
    }
}
