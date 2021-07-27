module.exports = {
  apps: [
    {
      name: 'Ecommerce_shopping',
      script: './index.js',
      watch: true,
      env: {
        PORT: 7090,
        NODE_ENV: 'development'
      },
      env_production: {
        PORT: 7091,
        NODE_ENV: 'production'
      }
    }
  ]
};
