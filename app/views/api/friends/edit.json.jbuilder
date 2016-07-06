json.username @friend.friend.username
json.id @friend.friend.id
pendings = Friend.all.select { |req| req.status == "pending" && req.user_id == @friend.friend.id }
accepteds = Friend.all.select { |req| req.status == "accepted" && req.friend_id == @friend.friend.id }
json.requests pendings
json.friends accepteds
json.uniqueDrinks User.unique_drinks(@friend.friend.id)
json.totalDrinks User.total_drinks(@friend.friend.id)
json.uniqueVenues User.unique_venues(@friend.friend.id)
json.numFriends User.num_friends(@friend.friend.id)

friend_reqs = Friend.all.select { |req| req.status == "pending" && req.friend_id == @friend.friend.id }
json.requesteds friend_reqs
