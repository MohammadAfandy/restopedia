import API_ENDPOINT from '../globals/api-endpoint';
import NotificationHelper from './notification-helper';

const WebSocketInitiator = {
  init(url) {
    const webSocket = new WebSocket(url);
    console.log('connected to websocket', url);
    webSocket.onmessage = this.onMessageHandler;
  },
  onMessageHandler(message) {
    const { name, description, pictureId } = JSON.parse(message.data);

    NotificationHelper.sendNotification({
      title: `${name} is trending`,
      options: {
        body: description,
        image: API_ENDPOINT.IMAGE(pictureId, 'small'),
      },
    });
  },
};

export default WebSocketInitiator;
