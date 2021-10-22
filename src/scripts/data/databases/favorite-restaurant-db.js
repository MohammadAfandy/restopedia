import BaseDB from './base-db';

class FavoriteRestaurantDB extends BaseDB {}

FavoriteRestaurantDB.init({
  objectStoreName: 'favorite-restaurant',
  keyPath: 'id',
});

export default FavoriteRestaurantDB;
