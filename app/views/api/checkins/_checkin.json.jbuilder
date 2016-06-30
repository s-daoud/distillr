json.id checkin.id
json.username checkin.user.username
json.userId checkin.user.id
json.drink checkin.drink.name
json.rating checkin.rating
json.review checkin.review
json.drinkId checkin.drink.id
json.likes checkin.likes

json.comments checkin.comments do |comment|
  json.comment comment.comment
  json.userId comment.user_id
  json.id comment.id
  json.checkinId comment.checkin_id
  json.username comment.user.username
end
