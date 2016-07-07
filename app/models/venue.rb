class Venue < ActiveRecord::Base
  validates :name, :address, presence: true
  validates :address, uniqueness: true

  has_many :checkins

  geocoded_by :address
  after_validation :geocode

  def self.by_ratings
    rated_venues = {}
    @venues = Venue.all
    @venues.each do |venue|
      next if venue.checkins.empty?
      rated_venues[venue] = (venue.checkins.average(:rating)).round(1)
    end
    Hash[rated_venues.sort[0..9]]
  end

  def self.with_ratings
    rated_venues = {}
    @venues = Venue.all
    @venues.each do |venue|
      if venue.checkins.empty?
        rated_venues[venue] = 0
      else
        rated_venues[venue] = (venue.checkins.average(:rating)).round(1)
      end
    end
    rated_venues
  end

  def self.add_rating(id)
    rated_venue = {}
    venue = Venue.find(id)
    if venue.checkins.empty?
      rated_venue[venue] = 0
    else
      rated_venue[venue] = (venue.checkins.average(:rating)).round(1)
    end
    rated_venue
  end

  def self.by_distance(lat, lng)
    Venue.near([lat, lng], 0.5)
  end
end
