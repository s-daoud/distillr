json.username @user.username
json.id @user.id
pendings = @user.friend_requests.select { |req| req.status == "pending" && req.user_id == @user.id }
accepteds = @user.friend_requests.select { |req| req.status == "accepted" && req.user_id == @user.id }
json.requests pendings
json.friends accepteds
json.uniqueDrinks User.unique_drinks(@user.id)
json.totalDrinks User.total_drinks(@user.id)
json.uniqueVenues User.unique_venues(@user.id)
json.numFriends User.num_friends(@user.id)

friend_reqs = Friend.all.select { |req| req.status == "pending" && req.friend_id == @user.id }
json.requesteds friend_reqs
