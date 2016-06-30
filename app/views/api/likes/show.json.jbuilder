json.id @like.checkin.id
json.username @like.checkin.user.username
json.userId @like.checkin.user.id
json.drink @like.checkin.drink.name
json.rating @like.checkin.rating
json.review @like.checkin.review
json.drinkId @like.checkin.drink.id
json.likes @like.checkin.likes
json.comments @like.checkin.comments do |comment|
  json.comment comment.comment
  json.userId comment.user_id
  json.id comment.id
  json.checkinId comment.checkin_id
  json.username comment.user.username
end
