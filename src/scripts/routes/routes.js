import RestaurantPage from '../views/pages/restaurant';
import RestaurantDetailPage from '../views/pages/restaurant-detail';
import FavoritePage from '../views/pages/favorite';
import NotFoundPage from '../views/pages/not-found';

const routes = {
  '/': RestaurantPage, // default page
  '/restaurants': RestaurantPage,
  '/restaurants/:id': RestaurantDetailPage,
  '/favorites': FavoritePage,
  '/not-found': NotFoundPage,
};

export default routes;
