# Slim template engine
::Slim::Engine.set_options :format  => :html

# Contentful
activate :contentful do |f|
  f.space = { space: ENV['CONTENTFUL_SPACE_ID'] }
  f.access_token = ENV['CONTENTFUL_ACCESS_TOKEN']
  f.content_types = {
    page: 'page',
    post: 'post',
    menu: 'menu'
  }
  f.use_preview_api = ENV['RACK_ENV'] == 'production' ? false : true
end

# Generate posts from data directory
if Dir.exist?(File.join(config.data_dir, 'space'))
  data.space.page.each do |id, page|
    proxy "/#{page.slug}/index.html", "page.html", locals: { page: page }, ignore: true
  end
end

if Dir.exist?(File.join(config.data_dir, 'space'))
  data.space.post.each do |id, post|
    proxy "/article/#{post.slug}/index.html", "post.html", locals: { post: post }, ignore: true
  end
end

# Development
configure :development do
  # Output a pretty html
  ::Slim::Engine.set_options :pretty => true
end

# Build
configure :build do
  ignore '*/.keep'
  ignore 'layouts/*'
  ignore 'shared/*'
  ignore 'javascripts/*/*'
  ignore 'stylesheets/*/*'

  # Use relative URLs
  activate :directory_indexes

  # Add asset fingerprinting to avoid cache issues
  activate :asset_hash

  # Minify html
  activate :minify_html, remove_quotes: false, remove_input_attributes: false
end

# Webpack asset pipeline
if (build? or server?)
  activate :external_pipeline,
    name: :webpack,
    command: build? ? 'yarn run build:prod' : 'yarn run server',
    source: ".tmp/dist",
    latency: 1
end
