/* eslint no-restricted-globals: 0 */
/**
 * for common strategies, we could use some in
 * https://developers.google.com/web/tools/workbox/guides/common-recipes
 *
 * Workbox Strategies in a nutshell
 * Stale-While-Revalidate (good for 3rd party asset)
 *  - response with cache if available
 *  - fallback to network request if cache not available
 *  - will always revalidate request
 *    (updating cache in background with the newest data from request)
 * Cache First (good for assets that doesn't update frequently like image)
 *  - response with cache if available
 *  - fallback to network request if cache not available
 *  - only make network request if cache not available
 * Network First (good for important data that updated frequently)
 *  - response with network request data
 *  - fallback to cache if cache is available
 *  - if response success, it'll put the response in cache
 */

import 'regenerator-runtime';
import { precacheAndRoute } from 'workbox-precaching';
import { ExpirationPlugin } from 'workbox-expiration';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { clientsClaim, setCacheNameDetails } from 'workbox-core';

// claim any currently available clients once the service worker becomes active
clientsClaim();

// forces the waiting service worker to become the active service worker
self.skipWaiting();

setCacheNameDetails({
  prefix: 'restopedia',
  suffix: 'v1',
  precache: 'precache',
});

/**
 * Pre cache web manifest on build time (I think it's like caching app shell)
 *
 * IMPORTANT: write 'self.__WB_MANIFEEST' only once in this file
 * because it will throw error 'Multiple instances of self.__WB_MANIFEEST'
 * even if the 'self.__WB_MANIFEEST' is just a comment
 * and because of that reason, I don't spell it correctly in the comment above
 * @see https://github.com/quasarframework/quasar/issues/8486#issuecomment-900982267
 */
precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ url }) => (
    url.origin === 'https://fonts.googleapis.com'
    || url.origin === 'https://fonts.gstatic.com'
  ),
  new StaleWhileRevalidate({
    cacheName: 'google-fonts',
  }),
);

registerRoute(
  ({ url }) => (url.origin.endsWith('.fontawesome.com')),
  new StaleWhileRevalidate({
    cacheName: 'fontawesome',
  }),
);

/**
 * In general, Workbox will not cache opaque responses (from 3rd party / different origin).
 * However, workbox will allow it if it's using NetworkFirst or StaleWhileRevalidate strategies
 * so for the below case (CacheFirst strategies), we use CacheableResponsePlugin
 * CacheableResponsePlugin will force caching of opaque responses
 * @see https://developers.google.com/web/tools/workbox/guides/handle-third-party-requests
 */
registerRoute(
  ({ request, url }) => (
    request.destination === 'image'
    && url.origin === 'https://restaurant-api.dicoding.dev'
  ),
  new CacheFirst({
    cacheName: 'restaurant-images',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 24 * 60 * 60, // 1 Days
      }),
    ],
  }),
);

registerRoute(
  ({ request, url }) => (
    request.destination === 'image'
    && url.origin === 'https://avatar.oxro.io'
  ),
  new CacheFirst({
    cacheName: 'avatar-images',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 24 * 60 * 60, // 1 Days
      }),
    ],
  }),
);

registerRoute(
  ({ url }) => (url.origin === 'https://restaurant-api.dicoding.dev'),
  new NetworkFirst({
    cacheName: 'restaurants',
    networkTimeoutSeconds: 3,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 5 * 60, // 5 minutes
      }),
    ],
  }),
);

registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
);

registerRoute(
  ({ request }) => (
    request.destination === 'script'
    || request.destination === 'style'
  ),
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
  }),
);
