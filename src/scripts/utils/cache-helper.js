import CONFIG from '../globals/config';

const CacheHelper = {
  async cachingAppShell(requests) {
    const cache = await this.openCache();
    cache.addAll(requests);
  },

  async deleteOldCache() {
    const cacheNames = await caches.keys();
    cacheNames
      .filter((name) => name !== CONFIG.CACHE_NAME)
      .forEach((filteredName) => caches.delete(filteredName));
  },

  async revalidateCache(request) {
    // pertama ambil dari cache dulu
    const response = await caches.match(request);

    /**
     * kalo ada di cache
     * kita balikin hasil dari cache
     * sambil kita juga update cache nya pake data terbaru dari hasil network request
     * biar request selanjutnya udah pake data terbaru
     */
    if (response) {
      this.fetchRequest(request);
      return response;
    }

    // kalo ga ada di cache, kita langsung ambil dari network dan sekalian update cachenya
    return this.fetchRequest(request);
  },

  async openCache() {
    return caches.open(CONFIG.CACHE_NAME);
  },

  async fetchRequest(request) {
    const response = await fetch(request);

    if (request.url.startsWith('chrome-extension')) {
      return response;
    }

    if (!response || response.status !== 200) {
      return response;
    }

    await this.addCache(request);
    return response;
  },

  async addCache(request) {
    const cache = await this.openCache();
    cache.add(request);
  },
};

export default CacheHelper;
