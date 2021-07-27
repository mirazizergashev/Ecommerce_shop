module.exports = {
  apps: [
    {
      name: 'Ecommerce_shopping',
      script: './index.js',
      watch: true,
      env: {
        PORT: 8090,
        NODE_ENV: 'development'
      },
      env_production: {
        PORT: 8091,
        NODE_ENV: 'production'
      }
    }
  ]
};
