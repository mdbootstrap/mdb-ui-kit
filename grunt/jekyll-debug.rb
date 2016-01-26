#!/usr/bin/env ruby

# for debugging plugins only, otherwise entirely unused.

require 'rubygems'

version = ">= 0"

if ARGV.first
  str = ARGV.first
  str = str.dup.force_encoding("BINARY") if str.respond_to? :force_encoding
  if str =~ /\A_(.*)_\z/ and Gem::Version.correct?($1) then
    version = $1
    ARGV.shift
  end
end

gem 'jekyll', version
load Gem.bin_path('jekyll', 'jekyll', version)
