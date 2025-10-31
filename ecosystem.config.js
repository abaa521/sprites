module.exports = {
  apps: [
    {
      name: 'sprites',
      script: 'server.js',
      instances: 1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3015
      },
      error_file: '~/.pm2/logs/sprites-error.log',
      out_file: '~/.pm2/logs/sprites-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_memory_restart: '500M',
      watch: false
    }
  ]
};
