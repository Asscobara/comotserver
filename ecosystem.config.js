module.exports = {
    apps : [{
      name        : "comotserver",
      script      : "src/server.ts",
      watch       : true,
      env: {
        "NODE_ENV": "production"
      }
    }]
  }