json.array! @venues do |venue|
  json.name venue.name
  json.id venue.id
  json.description venue.description
  json.address venue.address
  json.lat venue.latitude
  json.lng venue.longitude
end
