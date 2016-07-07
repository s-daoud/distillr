key = @venue.keys.first

json.rating @venue[key]
json.name key.name
json.id key.id
json.description key.description
json.address key.address
json.lat key.latitude
json.lng key.longitude
