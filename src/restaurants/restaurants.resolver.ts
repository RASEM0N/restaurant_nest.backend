/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Restaurant } from './entities/restaurants.entity'
import { CreateRestaurantDto } from './dtos/create-restaurant.dto'
import { RestaurantsService } from './restaurants.service'

@Resolver((of) => Restaurant)
export class RestaurantsResolver {
    constructor(private readonly restaurantService: RestaurantsService) {}

    @Query((returns) => [Restaurant])
    restaurant(): Promise<Restaurant[]> {
        return this.restaurantService.getAll()
    }

    @Mutation((returns) => Boolean)
    createRestaurant(@Args() createRestaurantDto: CreateRestaurantDto): boolean {
        return true
    }
}
