require 'json'
require 'yaml'

module Variables
  class Generator < Jekyll::Generator
    safe true

    def generate(site)
      metadata_files = {
        'bower' => '../bower.json',
        'package' => '../package.json',
        'bower_jquery' => '../bower_components/jquery/bower.json'
      }

      metadata_files.each do |metadata, path|
        contents = JSON.parse(File.read(File.join(site.source, path)))
        site.data[metadata] = contents
      end

      # some quick access to common variables (instead of diving into package and bower)
      name = site.data['package']['name']
      version = site.data['package']['version']
      bootstrap_version = site.data['bower']['dependencies']['bootstrap']
      jquery_version = site.data['bower_jquery']['version']

      site.data['name'] = name
      site.data['version'] = version
      site.data['bootstrap_version'] = bootstrap_version
      site.data['jquery_version'] = jquery_version


      # fabricate the archive and release links based on the site.repo and version
      jekyll_config = Jekyll.configuration({})
      repo = jekyll_config['repo']
      site.data['download'] = {
        'source' => "#{repo}/archive/v#{version}.zip",
        'dist' => "#{repo}/releases/download/v#{version}/#{name}-#{version}-dist.zip"
      }

      site.data['cdn'] = {
        'jquery' => jekyll_config['cdn']['jquery'].gsub(/VERSION/, jquery_version),
        'bootstrap' => jekyll_config['cdn']['bootstrap'].gsub(/VERSION/, bootstrap_version)
      }

      #
      puts "\n---------------------"
      # puts site.data[:package]['version']
      # puts site.data.to_yaml
      puts repo
      puts version
    end
  end
end
