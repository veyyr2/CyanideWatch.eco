class CreateRequestModerators < ActiveRecord::Migration[8.0]
  def change
    create_table :request_moderators do |t|
      t.string :first_name, null: false  # null: false делает поле обязательным на уровне БД
      t.string :last_name, null: false
      t.string :email, null: false, index: { unique: true } # index: { unique: true } для ускорения поиска и обеспечения уникальности на уровне БД
      t.string :phone_number
      t.text :description, null: false # Используйте :text для длинных текстовых полей

      t.timestamps
    end
  end
end