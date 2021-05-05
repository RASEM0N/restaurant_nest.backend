/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Restaurant } from './entities/restaurants.entity'
import { CreateRestaurantDto } from './dtos/create-restaurant.dto'
import { RestaurantsService } from './restaurants.service'

@Resolver((of) => Restaurant)
export class RestaurantsResolver {
    constructor(private readonly restaurantService: RestaurantsService) {}

    @Query((returns) => [Restaurant])
    restaurants(): Promise<Restaurant[]> {
        return this.restaurantService.getAll()
    }

    @Mutation((returns) => Boolean)
    async createRestaurant(@Args('input') createRestaurantDto: CreateRestaurantDto): Promise<boolean> {
        try {
            await this.restaurantService.createRestaurant(createRestaurantDto)
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    }
}
