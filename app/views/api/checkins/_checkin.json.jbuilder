json.id checkin.id
json.username checkin.user.username
json.userId checkin.user.id
if checkin.drink
  json.drink checkin.drink.name
  json.drinkImg checkin.drink.image_url
  json.drinkId checkin.drink.id
end
json.rating checkin.rating
json.review checkin.review
json.likes checkin.likes
json.venue checkin.venue

json.comments checkin.comments do |comment|
  json.comment comment.comment
  json.userId comment.user_id
  json.id comment.id
  json.checkinId comment.checkin_id
  json.username comment.user.username
end
