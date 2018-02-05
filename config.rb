# Slim template engine
::Slim::Engine.set_options :format  => :html

# Contentful
activate :contentful do |f|
  f.space = { space: ENV['CONTENTFUL_SPACE_ID'] }
  f.access_token = ENV['CONTENTFUL_ACCESS_TOKEN']
  f.cda_query = { content_type: 'post', include: 1 }
  f.content_types = { post: 'post' }
  f.use_preview_api = build? ? false : true
end

# Generate posts from data directory
if Dir.exist?(File.join(config.data_dir, 'space'))
  data.space.post.each do |id, post|
    proxy "/#{post.slug}/index.html", "post.html", locals: { post: post }, ignore: true
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
