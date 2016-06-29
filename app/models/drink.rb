class Drink < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true

  has_many :checkins
end
