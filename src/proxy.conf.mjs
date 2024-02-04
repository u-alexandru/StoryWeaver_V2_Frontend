export default [
  {
    context: [
      '/api',
      '/sanctum/csrf-cookie',
    ],
    target: 'http://backend:8000',
    secure: false,
    changeOrigin: true,
  }
];
