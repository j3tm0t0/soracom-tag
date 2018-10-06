#!/usr/bin/env ruby
require 'json'

def build_function(dirname)
  function = JSON.parse(open("functions/#{dirname}/function.json").read())
  Dir.children("functions/#{dirname}/").each do |f|
    if f =~/(.+)\.js$/
      function['extension'][$1]=open("functions/#{dirname}/#{f}").read()
    end
  end
  return function
end

tag = JSON.parse(open('metadata.json').read())
tag['tagData']['functions']=[]

Dir.children('functions').sort.each { |f| tag['tagData']['functions'].append(build_function(f)) }

print JSON.pretty_generate(tag)
