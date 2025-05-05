class CreateNews < ActiveRecord::Migration[8.0]
  def change
    create_table :news do |t|
      t.string :image_url
      t.string :title, null: false
      t.text :description, null: false
      t.string :external_link, null: false
      t.timestamps
    end
  end
end