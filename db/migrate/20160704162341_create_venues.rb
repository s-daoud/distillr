class CreateVenues < ActiveRecord::Migration
  def change
    create_table :venues do |t|
      t.string :name, null: false
      t.text :description
      t.string :address, null: false
      t.float :lat, null: false
      t.float :lng, null: false

      t.timestamps null: false
    end
    add_index :venues, :address, unique: true
  end
end
