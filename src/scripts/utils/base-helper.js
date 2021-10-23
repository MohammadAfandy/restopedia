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
}

export default BaseHelper;
