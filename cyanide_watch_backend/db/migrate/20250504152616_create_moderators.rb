class CreateModerators < ActiveRecord::Migration[8.0]
  def change
    create_table :moderators do |t|
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
