rated_venues = @venues.reduce([]) do |acc, (key, value)|
  acc.push({ rating: value,
             name: key.name,
             id: key.id,
             description: key.description,
             address: key.address
          })
end

json.array!(rated_venues)
