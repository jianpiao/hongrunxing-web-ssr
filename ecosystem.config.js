module.exports = {
  apps: [
    {
      name: 'HongRunXing-web-ssr',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
      args: "start"
    }
  ]
}