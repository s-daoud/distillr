class CreateFriends < ActiveRecord::Migration
  def change
    create_table :friends do |t|
      t.integer :user_id, null: false
      t.integer :friend_id, null: false
      t.string :status, default: "pending"

      t.timestamps null: false
    end
    add_index :friends, [:user_id, :friend_id], unique: true
  end
end
