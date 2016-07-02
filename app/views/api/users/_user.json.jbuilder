json.username user.username
json.id user.id
pendings = user.friend_requests.select { |req| req.status == "pending" && req.user_id == user.id }
accepteds = user.friend_requests.select { |req| req.status == "accepted" && req.user_id == user.id }
json.requests pendings
json.friends accepteds

friend_reqs = Friend.all.select { |req| req.status == "pending" && req.friend_id == user.id }
json.requesteds friend_reqs
