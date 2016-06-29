class CreateDrinks < ActiveRecord::Migration
  def change
    create_table :drinks do |t|
      t.string :name, null: false
      t.text :description
      t.string :image_url

      t.timestamps null: false
    end
    add_index :drinks, :name, unique: true
  end
end
