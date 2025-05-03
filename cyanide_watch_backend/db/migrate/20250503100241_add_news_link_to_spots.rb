class AddNewsLinkToSpots < ActiveRecord::Migration[8.0]
  def change
    add_column :spots, :news_link, :string
  end
end
