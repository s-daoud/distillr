class Checkin < ActiveRecord::Base
  validates :user_id, :drink_id, :rating, presence: true

  belongs_to :user
  belongs_to :drink
  has_many :comments
  has_many :likes

  # def self.with_params(source)
  #   if source.loc == "drink"
  #     Checkin.where("drink_id: ?", source.id)
  #   elsif source.loc == "feed"
  #     Checkin.joins(:friends).where(user_id: users.f)
  # end
end
