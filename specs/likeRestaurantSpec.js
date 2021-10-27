import FavoriteRestaurantDB from '../src/scripts/data/db/favorite-restaurant-db';
import * as TestFactories from './helpers/testFactories';
import { addLikeButtonContainer, SnackBarInitiator } from './helpers/likeRestaurantSetup';

describe('Liking A Restaurant', () => {

  beforeEach(() => {
    addLikeButtonContainer();
  });

  afterEach(async () => {
    (await FavoriteRestaurantDB.getAll()).forEach(async (restaurant) => {
      await FavoriteRestaurantDB.delete(restaurant.id);
    });
  });

  it('should show the like button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeRestoPresenter({ id: 1 });

    expect(document.querySelector('like-button button[aria-label="Like this restaurant"]'))
      .toBeTruthy();
  });

  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeRestoPresenter({ id: 1 });

    expect(document.querySelector('like-button button[aria-label="Unlike this restaurant"]')).toBeFalsy();
  });

  it('should be able to like the restaurant', async () => {
    await TestFactories.createLikeRestoPresenter({ id: 1 });
    await document.querySelector('like-button button').dispatchEvent(new Event('click'));

    const restaurant = await FavoriteRestaurantDB.get(1);
    
    expect(restaurant).toEqual(jasmine.objectContaining({ id: 1 }));

    expect(SnackBarInitiator.show).toHaveBeenCalledWith({
      text: 'Restaurant has been added to favorite',
    });

  });

  it('should not add a restaurant again when its already liked', async () => {
    await TestFactories.createLikeRestoPresenter({ id: 1 });

    await FavoriteRestaurantDB.put({ id: 1 });
    await document.querySelector('like-button button').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantDB.getAll()).toEqual([jasmine.objectContaining({ id: 1 })]);

  });

  it('should not add a restaurant when it has no id', async () => {
    await TestFactories.createLikeRestoPresenter({});

    await document.querySelector('like-button button').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantDB.getAll()).toEqual([]);
  });
});
