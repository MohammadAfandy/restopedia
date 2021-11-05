import API_ENDPOINT from '../../globals/api-endpoint';
// import CONFIG from '../../globals/config';
import SnackBarInitiator from '../../utils/snackbar-initiator';

class RestaurantApi {
  static format(restaurant) {
    return {
      ...restaurant,
      picture: {
        small: API_ENDPOINT.IMAGE(restaurant.pictureId, 'small'),
        medium: API_ENDPOINT.IMAGE(restaurant.pictureId, 'medium'),
        large: API_ENDPOINT.IMAGE(restaurant.pictureId, 'large'),
      },
      categoriesName: restaurant.categories
        ? restaurant.categories.map((category) => category.name)
        : undefined,
    };
  }

  static async makeRequest(url, options) {
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      return [data, null];
    } catch (error) {
      console.error(error.message);
      SnackBarInitiator.show({
        text: error.message,
        type: 'failed',
      });
      return [null, error];
    }
  }

  static async list() {
    const [responseData, error] = await this.makeRequest(API_ENDPOINT.LIST);
    if (error) return [];
    return responseData.restaurants.map(this.format);
  }

  static async detail(id) {
    const [responseData, error] = await this.makeRequest(API_ENDPOINT.DETAIL(id));
    if (error) return null;
    return this.format(responseData.restaurant);
  }

  static async search(query) {
    const [responseData, error] = await this.makeRequest(API_ENDPOINT.SEARCH(query));
    if (error) return [];
    return responseData.restaurants.map(this.format);
  }

  static async addReview({ id, name, review }) {
    const [responseData, error] = await this.makeRequest(API_ENDPOINT.ADD_REVIEW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // 'X-Auth-Token': CONFIG.API_KEY,
      },
      body: JSON.stringify({ id, name, review }),
    });
    if (error) return error;

    return responseData;
  }
}

export default RestaurantApi;
