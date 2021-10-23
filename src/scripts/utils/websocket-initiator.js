import API_ENDPOINT from '../globals/api-endpoint';
import NotificationHelper from './notification-helper';
import BaseHelper from './base-helper';

class WebSocketInitiator {
  static init(url) {
    const webSocket = new WebSocket(url);
    webSocket.onmessage = this.onMessageHandler;
  }

  static onMessageHandler(message) {
    const {
      name,
      description,
      pictureId,
    } = BaseHelper.safeParseJSON(message.data);

    NotificationHelper.sendNotification({
      title: `${name} is trending`,
      options: {
        body: description,
        image: API_ENDPOINT.IMAGE(pictureId, 'small'),
      },
    });
  }
}

export default WebSocketInitiator;
