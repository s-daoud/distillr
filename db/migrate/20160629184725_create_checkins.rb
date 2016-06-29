class CreateCheckins < ActiveRecord::Migration
  def change
    create_table :checkins do |t|
      t.integer :user_id, null: false
      t.integer :drink_id, null: false
      t.integer :rating, null: false
      t.text :review

      t.timestamps null: false
    end
    add_index :checkins, :user_id
    add_index :checkins, :drink_id
  end
end
