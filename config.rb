# Contentful
activate :contentful do |f|
  f.space         = { space: ENV['CONTENTFUL_SPACE_ID'] }
  f.access_token  = ENV['CONTENTFUL_ACCESS_TOKEN']
  f.cda_query     = { content_type: 'post', include: 1 }
  f.content_types = { post: 'post' }
end

# Development
configure :development do
  
end

# Build
configure :build do
  # Use relative URLs
  activate :directory_indexes

  # Add asset fingerprinting to avoid cache issues
  activate :asset_hash

  # Minify html
  activate :minify_html
end

if (build? or server?)
  activate :external_pipeline,
    name: :webpack,
    command: build? ? 'yarn run build:prod' : 'yarn run server:dev',
    source: ".tmp/dist",
    latency: 1
end
