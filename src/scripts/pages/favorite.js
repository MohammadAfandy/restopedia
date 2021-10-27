import BasePage from './base-page';

class FavoritePage extends BasePage {
  static async render() {
    this.restoListView = (await import('../views/resto-list-view')).default;
    return `
      <section id="content">
        ${this.restoListView.getTemplate()}
      </section>
    `;
  }

  static async afterRender() {
    const RestoListPresenter = (await import('../presenters/resto-list-presenter')).default;
    const FavoriteRestaurantDB = (await import('../data/db/favorite-restaurant-db')).default;
    this.restoListPresenter = new RestoListPresenter({
      view: this.restoListView,
      favoriteRestaurantDb: FavoriteRestaurantDB,
    });
    this.restoListPresenter.showFavoriteRestaurants();
  }
}

export default FavoritePage;
