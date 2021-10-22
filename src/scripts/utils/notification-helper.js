const NotificationHelper = {
  sendNotification({ title, options }) {
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
  },

  checkAvailability() {
    return !!('Notification' in window);
  },

  checkPermission() {
    return Notification.permission === 'granted';
  },

  async requestPermission() {
    const status = await Notification.requestPermission();

    if (status === 'denied') {
      console.log('Notification denied');
    }

    if (status === 'default') {
      console.log('Permission closed');
    }
  },

  async showNotification({ title, options }) {
    const serviceWorkerRegistration = await navigator.serviceWorker.ready;
    console.log({
      title, options,
    });
    serviceWorkerRegistration.showNotification(title, options);
  },

};

export default NotificationHelper;
