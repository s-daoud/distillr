class Comment < ActiveRecord::Base
  validates :user_id, :checkin_id, presence: true

  belongs_to :user
  belongs_to :checkin
end
