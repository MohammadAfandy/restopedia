class SnackBarInitiator {
  static async init() {
    await import('../components/SnackBar/snack-bar');
    this.snackbar = document.querySelector('snack-bar');
  }

  static show(options) {
    this.snackbar.show(options);
  }

  static hide() {
    this.snackbar.hide();
  }
}

export default SnackBarInitiator;
