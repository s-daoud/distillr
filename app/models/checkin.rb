class Checkin < ActiveRecord::Base
  validates :user_id, :drink_id, :rating, presence: true

  belongs_to :user
  belongs_to :drink
  has_many :comments
  has_many :likes
end
