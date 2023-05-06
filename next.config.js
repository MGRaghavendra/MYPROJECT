
/** @type {import('next').NextConfig} */

function getConfigs(tenant){
  if(tenant == "aastha"){
    return configs = require('./assets/aastha/config')
  }
  else if(tenant == "firstshows"){
    return configs = require('./assets/firstshows/config')
  }
}



module.exports = async (phase, { defaultConfig }) => {
 
  /**
   * @type {import('next').NextConfig}
   */
  
  let tenant = process.env.npm_config_tenant
  let configs =  getConfigs(tenant);
  let initJson = configs.publicRuntimeConfig.initJson
  let response = await fetch(initJson);
  let jsonData = await response.json();;
  configs.publicRuntimeConfig.baseURL = jsonData.api;
  const nextConfig = {...configs}
  return nextConfig
}
