class Checkin < ActiveRecord::Base
  validates :user_id, :drink_id, :rating, presence: true

  belongs_to :user
  belongs_to :drink
  has_many :comments
  has_many :likes

  def self.all_profile(id)
    Checkin.where("user_id = ?", id)
  end

  def self.all_drink(id)
    Checkin.where("drink_id = ?", id)
  end
end
