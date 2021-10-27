import RestaurantPage from '../pages/restaurant';
import RestaurantDetailPage from '../pages/restaurant-detail';
import FavoritePage from '../pages/favorite';
import NotFoundPage from '../pages/not-found';

const routes = {
  '/': RestaurantPage, // default page
  '/restaurants': RestaurantPage,
  '/restaurants/:id': RestaurantDetailPage,
  '/favorites': FavoritePage,
  '/not-found': NotFoundPage,
};

export default routes;
