json.id @comment.checkin.id
json.username @comment.checkin.user.username
json.userId @comment.checkin.user.id
json.drink @comment.checkin.drink.name
json.rating @comment.checkin.rating
json.review @comment.checkin.review
json.drinkId @comment.checkin.drink.id
json.likes @comment.checkin.likes
json.comments @comment.checkin.comments do |comment|
  json.comment comment.comment
  json.userId comment.user_id
  json.id comment.id
  json.checkinId comment.checkin_id
  json.username comment.user.username
end
