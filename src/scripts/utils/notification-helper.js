class NotificationHelper {
  static sendNotification({ title, options }) {
    if (!this.checkAvailability()) {
      console.log('Notification not supported in this browser');
      return;
    }

    if (!this.checkPermission()) {
      console.log('User did not granted permission yet');
      this.requestPermission();
      return;
    }

    this.showNotification({ title, options });
  }

  static checkAvailability() {
    return !!('Notification' in window);
  }

  static checkPermission() {
    return Notification.permission === 'granted';
  }

  static async requestPermission() {
    const status = await Notification.requestPermission();

    if (status === 'denied') {
      console.log('Notification denied');
    }

    if (status === 'default') {
      console.log('Permission closed');
    }
  }

  static async showNotification({ title, options }) {
    const serviceWorkerRegistration = await navigator.serviceWorker.ready;
    serviceWorkerRegistration.showNotification(title, options);
  }
}

export default NotificationHelper;
