class User < ActiveRecord::Base
  attr_reader :password

  validates :username, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true}

  validates :username, :session_token, uniqueness: true

  before_validation :ensure_session_token

  has_many :checkins
  has_many :comments
  has_many :likes

  has_many :friend_requests,
   primary_key: :id,
   foreign_key: :user_id,
   class_name: "Friend"

  has_many :friends,
   through: :friend_requests,
   source: :friend

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    return nil if user.nil?
    BCrypt::Password.new(user.password_digest).is_password?(password) ? user : nil
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def self.unique_drinks(id)
    user = User.find(id)
    user.checkins.count("DISTINCT drink_id")
  end

  def self.total_drinks(id)
    user = User.find(id)
    user.checkins.count
  end

  def self.unique_venues(id)
    user = User.find(id)
    user.checkins.where("venue_id > 0").count("DISTINCT venue_id")
  end

  def self.num_friends(id)
    user = User.find(id)
    user.friend_requests.where(status: "accepted").count
  end
end
