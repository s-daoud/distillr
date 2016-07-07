class Checkin < ActiveRecord::Base
  validates :user_id, :drink_id, :rating, presence: true
  validates :rating, numericality: { greater_than: 0 }
  validate :valid_drink

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

  def valid_drink
    if drink_id == 0
      errors.add(:drink_id, "is not a valid drink")
    end
  end
end
