module.exports = {
    apps: [
      {
        name: "empowerhealth-backend",
        script: "app.js", // Updated script path to match package.json start script
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: "1G",
        env: {
          NODE_ENV: "development",
        },
        env_production: {
          NODE_ENV: "production",
        },
      },
    ],
  };
  