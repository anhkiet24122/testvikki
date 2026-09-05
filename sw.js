const CACHE_NAME = 'vikki-calc-v1';
const urlsToCache = [
  './INDEX.HTML',
  './manifest.json',
  './vikki-digital-bank-logo-c-1-1030x429.png',
  './icon-192.png',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
];

// Cài đặt và lưu cache ngay lần đầu tải
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Chặn các yêu cầu mạng, nếu có trong cache thì lấy ra dùng (chạy Offline)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Trả file từ bộ nhớ tạm
        }
        return fetch(event.request); // Nếu chưa có mới tải từ mạng
      })
  );
});