class Checkin < ActiveRecord::Base
  validates :user_id, :drink_id, :rating, presence: true

  belongs_to :user
  belongs_to :drink
  belongs_to :venue
  has_many :comments
  has_many :likes

  def self.all_profile(id)
    Checkin.where("user_id = ?", id)
  end

  def self.all_drink(id)
    Checkin.where("drink_id = ?", id)
  end

  def self.all_venue(id)
    Checkin.where("venue_id = ?", id)
  end

  def self.all_friends(id)
    user = User.find(id)
    reqs = user.friend_requests.where(status: "accepted")
    friends = [id]
    reqs.each do |req|
      friends << req.friend_id
    end
    Checkin.where("user_id IN (?)", friends)
  end
end
