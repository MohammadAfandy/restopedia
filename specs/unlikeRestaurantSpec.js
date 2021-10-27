import FavoriteRestaurantDB from '../src/scripts/data/db/favorite-restaurant-db';
import * as TestFactories from './helpers/testFactories';
import { addLikeButtonContainer, SnackBarInitiator } from './helpers/likeRestaurantSetup';

describe('Unliking A Restaurant', () => {
  beforeEach(async () => {
    await addLikeButtonContainer();
    await FavoriteRestaurantDB.put({ id: 1 });
  });

  afterEach(async () => {
    (await FavoriteRestaurantDB.getAll()).forEach(async (restaurant) => {
      await FavoriteRestaurantDB.delete(restaurant.id);
    });
  });

  it('should show the unlike button when the restaurant has been liked before', async () => {
    await TestFactories.createLikeRestoPresenter({ id: 1 });

    expect(document.querySelector('like-button button[aria-label="Unlike this restaurant"]')).toBeTruthy();
  });

  it('should not show the like button when the restaurant has been liked before', async () => {
    await TestFactories.createLikeRestoPresenter({ id: 1 });

    expect(document.querySelector('like-button button[aria-label="Like this restaurant"]')).toBeFalsy();
  });

  it('should be able to unlike the restaurant', async () => {
    await TestFactories.createLikeRestoPresenter({ id: 1 });

    document.querySelector('like-button button').dispatchEvent(new Event('click'));
    const restaurant = await FavoriteRestaurantDB.get(1);

    expect(restaurant).toBeUndefined();

    expect(SnackBarInitiator.show).toHaveBeenCalledWith({
      text: 'Restaurant has been removed from favorite',
      type: 'failed',
    });
  });

  it('should not throw error if a restaurant is not in the list', async () => {
    await TestFactories.createLikeRestoPresenter({ id: 1 });
    await FavoriteRestaurantDB.delete(1);

    document.querySelector('like-button button').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantDB.getAll()).toEqual([]);
  });
});
