import { itActsAsFavoriteRestaurantModel } from './contract/favoriteRestaurantContract';
import FavoriteRestaurantDB from '../src/scripts/data/db/favorite-restaurant-db';

describe('Favorite Movie DB Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavoriteRestaurantDB.getAll()).forEach(async (restaurant) => {
      await FavoriteRestaurantDB.delete(restaurant.id);
    });
  });

  itActsAsFavoriteRestaurantModel(FavoriteRestaurantDB);
});
