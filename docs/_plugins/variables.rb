require 'json'
require 'yaml'

module Variables
  class Generator < Jekyll::Generator
    safe true

    def generate(site)

      # indicate to use min or development assets
      baseurl = site.config['baseurl']
      minified = true
      if baseurl.eql? ''
        minified = false
      end

      # minified = true # debug minified
      site.data['minified'] = minified

      metadata_files = {
        'package' => '../package.json',
        'npm_bootstrap' => '../node_modules/bootstrap/package.json',
        'npm_jquery' => '../node_modules/jquery/package.json',
        'npm_tether' => '../node_modules/tether/package.json'
      }

      metadata_files.each do |metadata, path|
        contents = JSON.parse(File.read(File.join(site.source, path)))
        site.data[metadata] = contents
      end

      # validate and provide some quick access to common variables
      name = site.data['package']['name']
      assert_not_nil :name, name

      version = site.data['package']['version']
      assert_not_nil :version, version

      bootstrap_version = site.data['npm_bootstrap']['version']
      assert_not_nil :bootstrap_version, bootstrap_version

      if (bootstrap_version.include?('rosskevin') || bootstrap_version.include?('alpha'))
        # // not this
        # https://cdn.rawgit.com/twbs/bootstrap/4.0.0-alpha.2/dist/js/bootstrap.js

        # // this
        # https://cdn.rawgit.com/twbs/bootstrap/v4-dev/dist/js/bootstrap.js

        bootstrap_version = 'v4-dev' # hack since we are wanting to stay on the branch
      end

      tether_version = site.data['npm_tether']['version']
      assert_not_nil :tether_version, tether_version

      jquery_version = site.data['npm_jquery']['version']
      assert_not_nil :jquery_version, jquery_version

      site.data['name'] = name
      site.data['version'] = version
      site.data['bootstrap_version'] = bootstrap_version
      site.data['tether_version'] = tether_version
      site.data['jquery_version'] = jquery_version

      # fabricate the archive and release links based on the site.repo and version
      repo = site.config['repo']
      site.data['download'] = {
        'source' => "#{repo}/archive/v#{version}.zip",
        'dist' => "#{repo}/releases/download/v#{version}/#{name}-#{version}-dist.zip"
      }

      site.data['cdn'] = {
        'jquery' => site.config['cdn']['jquery'].gsub(/VERSION/, jquery_version),
        'bootstrap' => site.config['cdn']['bootstrap'].gsub(/VERSION/, bootstrap_version),
        'tether' => site.config['cdn']['tether'].gsub(/VERSION/, tether_version)
      }

      #
      # puts "\n---------------------"
      # puts "site.config: #{site.config.to_yaml}"
      # puts "baseurl: #{baseurl}"
      # puts "minified: #{site.data['minified']}"

      # puts "site: #{site.to_yaml}"
      # puts site.data[:package]['version']
      # puts site.data.to_yaml
      # puts repo
      # puts version
    end

    def assert_not_nil(name, value)
      raise "Expected #{name} to be not nil." if value.nil?
    end
  end
end
