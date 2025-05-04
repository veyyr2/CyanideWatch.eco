class CreateNews < ActiveRecord::Migration[8.0]
  def change
    create_table :news do |t|
      t.string :title
      t.text :description
      t.string :image_url
      t.string :news_link
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
