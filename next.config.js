/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  publicRuntimeConfig:{
    initJson:"https://paas-init.revlet.net/clients/firstshows/init/live/firstshows.json",
    baseURL:"https://firstshows-api.revlet.net"
  }
}

module.exports = nextConfig
