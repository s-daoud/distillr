rated_drinks = @drinks.reduce([]) do |acc, (key, value)|
  acc.push({ rating: value,
             name: key.name,
             id: key.id,
             description: key.description,
             image_url: key.image_url
          })
end

json.array!(rated_drinks)
