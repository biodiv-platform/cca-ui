// run `pm2 start` in root directory to run this app in a cluster mode

module.exports = {
  apps: [
    {
      name: "cca",
      script: "yarn",
      args: "start",
      interpreter: "none",
      instances: "max",
      exec_mode: "cluster"
    }
  ]
};
