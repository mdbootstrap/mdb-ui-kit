require 'json'
require 'yaml'

module Bridge
  class Generator < Jekyll::Generator
    def generate(site)
      config_bridge_json = File.join(site.source, '../grunt/configBridge.json')
      site.data['configBridge'] = YAML.load_file(config_bridge_json)
    end
  end
end
