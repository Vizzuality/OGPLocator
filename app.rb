require 'rubygems'
require 'bundler'

Bundler.require

require 'sinatra'

get '/OGPLocator/' do
  File.read(File.join('index.html'))
end

get '/OGPLocator/challenge/:id' do
  File.read(File.join('index.html'))
end

get '/OGPLocator/category/:id' do
  File.read(File.join('index.html'))
end

get '/OGPLocator/sector/:id' do
  File.read(File.join('index.html'))
end

get '/OGPLocator/country/:id' do
  File.read(File.join('index.html'))
end

get '/OGPLocator/detail/:id' do
  File.read(File.join('index.html'))
end

get '/OGPLocator/css/:file' do
  content_type :css
  File.read(File.join('css', params[:file]))
end

get '/OGPLocator/js/:file' do
  File.read(File.join('js', params[:file]))
end

get '/OGPLocator/js/libs/:file' do
  File.read(File.join('js', 'libs', params[:file]))
end

get '/OGPLocator/js/backbone/collections/:file' do
  File.read(File.join('js', 'backbone/collections', params[:file]))
end

get '/OGPLocator/js/backbone/views/:file' do
  File.read(File.join('js', 'backbone/views', params[:file]))
end

get '/OGPLocator/js/backbone/routers/:file' do
  File.read(File.join('js', 'backbone/routers', params[:file]))
end

get '/OGPLocator/img/:file' do
  File.read(File.join('img', params[:file]))
end
