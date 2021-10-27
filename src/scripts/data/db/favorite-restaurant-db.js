import BaseDB from './base-db';

class FavoriteRestaurantDB extends BaseDB {
  static async put(restaurant) {
    if (!restaurant.hasOwnProperty('id') || restaurant.id == null) return null;
    return super.put(restaurant);
  }
}

FavoriteRestaurantDB.init({
  objectStoreName: 'favorite-restaurant',
  keyPath: 'id',
});

export default FavoriteRestaurantDB;
