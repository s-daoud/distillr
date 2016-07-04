class AddVenueToCheckin < ActiveRecord::Migration
  def change
    add_column :checkins, :venue_id, :integer
    add_index :checkins, :venue_id
  end
end
