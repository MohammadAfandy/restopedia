const swRegister = async () => {
  if ('serviceWorker' in navigator) {
    await navigator.serviceWorker.register('/service-worker.js');
    console.log('Service worker has been registered');
    return;
  }

  console.log('Service worker not supported in this browser');
};

export default swRegister;
