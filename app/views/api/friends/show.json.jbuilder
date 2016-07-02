json.username @friend.friend.username
json.id @friend.friend.id
pendings = Friend.all.select { |req| req.status == "pending" && req.friend_id == @friend.friend.id }
accepteds = Friend.all.select { |req| req.status == "accepted" && req.friend_id == @friend.friend.id }
json.requests pendings
json.friends accepteds

friend_reqs = Friend.all.select { |req| req.status == "pending" && req.user_id == @friend.friend.id }
json.requesteds friend_reqs
