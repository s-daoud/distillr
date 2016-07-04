class RemoveLatLngFromVenue < ActiveRecord::Migration
  def change
    remove_column :venues, :lat
    remove_column :venues, :lng
  end
end
