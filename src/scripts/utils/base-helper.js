class BaseHelper {
  static sleep(miliseconds) {
    return new Promise((resolve) => setTimeout(resolve, miliseconds));
  }

  static safeParseJSON(jsonString) {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      return null;
    }
  }

  static setLoading(selectorName) {
    document.querySelector(selectorName).isLoading = true;
  }

  static stopLoading(selectorName) {
    document.querySelector(selectorName).isLoading = false;
  }
}

export default BaseHelper;
