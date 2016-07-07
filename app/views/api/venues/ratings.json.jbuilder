rated_venues = @venues.reduce([]) do |acc, (key, value)|
  acc.push({ rating: value,
             name: key.name,
             id: key.id,
             description: key.description,
             address: key.address,
             lat: key.latitude,
             lng: key.longitude
          })
end

json.array!(rated_venues)
