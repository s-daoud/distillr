class Venue < ActiveRecord::Base
  validates :name, :address, presence: true
  validates :address, uniqueness: true

  has_many :checkins
end
