class SpotChangesMeasurements < ActiveRecord::Migration[8.0]
  def change
    # Удаляем старую колонку
    remove_column :spots, :severity, :string

    # Добавляем новые колонки
    add_column :spots, :measurement_type, :string
    add_column :spots, :measurement_value, :float
  end
end
