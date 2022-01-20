module.exports = {
  apps: [
    {
      name: 'REACT IWEDDING WEB ',
      script: 'server/app.js',
      instances: '5',
      exec_mode: 'cluster',
      wait_ready: true,
      kill_timeout: 5000,
      env: {
        NODE_ENV: 'production',
        PORT: 6800,
      },
    },
  ],
};
