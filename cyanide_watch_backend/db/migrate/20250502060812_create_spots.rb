class CreateSpots < ActiveRecord::Migration[8.0]
  def change
    create_table :spots do |t|
      t.string :location
      t.float :lat
      t.float :lng
      t.string :severity
      t.date :date
      t.text :description
      t.timestamps
    end
  end
end
