class Friend < ActiveRecord::Base
  validates :user_id, :friend_id, presence: true
  validates :status, inclusion: { in: %w( pending accepted )}

  belongs_to :user

  belongs_to :friend,
   primary_key: :id,
   foreign_key: :friend_id,
   class_name: "User"

end
