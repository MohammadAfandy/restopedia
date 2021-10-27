const itActsAsFavoriteRestaurantModel = (FavoriteRestaurant) => {
  it('should return the restaurant that has been added', async () => {
    FavoriteRestaurant.put({ id: 1 });
    FavoriteRestaurant.put({ id: 2 });

    expect(await FavoriteRestaurant.get(1))
      .toEqual({ id: 1 });
    expect(await FavoriteRestaurant.get(2))
      .toEqual({ id: 2 });
    expect(await FavoriteRestaurant.get(3))
      .toEqual(undefined);
  });

  it('should refuse a restaurant from being added if it does not have the correct property', async () => {
    FavoriteRestaurant.put({ aProperty: 'property' });

    expect(await FavoriteRestaurant.getAll())
      .toEqual([]);
  });

  it('can return all of the restaurant that have been added', async () => {
    FavoriteRestaurant.put({ id: 1 });
    FavoriteRestaurant.put({ id: 2 });

    expect(await FavoriteRestaurant.getAll())
      .toEqual([
        { id: 1 },
        { id: 2 },
      ]);
  });

  it('should remove favorite restaurant', async () => {
    FavoriteRestaurant.put({ id: 1 });
    FavoriteRestaurant.put({ id: 2 });
    FavoriteRestaurant.put({ id: 3 });

    await FavoriteRestaurant.delete(1);

    expect(await FavoriteRestaurant.getAll())
      .toEqual([
        { id: 2 },
        { id: 3 },
      ]);
  });

  it('should handle request to remove a restaurant even though the restaurant has not been added', async () => {
    FavoriteRestaurant.put({ id: 1 });
    FavoriteRestaurant.put({ id: 2 });
    FavoriteRestaurant.put({ id: 3 });

    await FavoriteRestaurant.delete(4);

    expect(await FavoriteRestaurant.getAll())
      .toEqual([
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ]);
  });
};

export { itActsAsFavoriteRestaurantModel };
