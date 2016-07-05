key = @drink.keys.first

json.rating @drink[key]
json.name key.name
json.id key.id
json.description key.description
json.image_url key.image_url
