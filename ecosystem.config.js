module.exports = {
  apps: [
    {
      name: "homefugas",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3002",
      cwd: "/var/www/homefugas",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3002
      }
    }
  ]
};
