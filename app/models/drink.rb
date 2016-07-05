class Drink < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true

  has_many :checkins

  def self.by_ratings
    rated_drinks = {}
    @drinks = Drink.all
    @drinks.each do |drink|
      next if drink.checkins.empty?
      rated_drinks[drink] = (drink.checkins.average(:rating)).round(1)
    end
    Hash[rated_drinks.sort[0..9]]
  end

  def self.with_ratings
    rated_drinks = {}
    @drinks = Drink.all
    @drinks.each do |drink|
      if drink.checkins.empty?
        rated_drinks[drink] = 0
      else
        rated_drinks[drink] = (drink.checkins.average(:rating)).round(1)
      end
    end
    rated_drinks
  end

  def self.add_rating(id)
    rated_drink = {}
    drink = Drink.find(id)
    if drink.checkins.empty?
      rated_drink[drink] = 0
    else
      rated_drink[drink] = (drink.checkins.average(:rating)).round(1)
    end
    rated_drink
  end
end
