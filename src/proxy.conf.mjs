export default [
  {
    context: [
      '/api',
      '/sanctum/csrf-cookie',
    ],
    target: {
      host: "backend",
      protocol: "http:",
      port: 8000,
    },
    secure: false,
    changeOrigin: true,
    logLevel: "debug"
  }
];
