# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
spots_data = [
  {
    location: "Река Тиса",
    lat: 47.9,
    lng: 21.7,
    measurement_type: "water",
    measurement_value: 0.5,
    date: Date.new(2020, 2, 1),
    description: "Крупный разлив цианида на границе Румынии и Венгрии",
    news_link: "https://www.theguardian.com/world/2000/feb/14/1"
  },
  {
    location: "Завод Золотодобычи в Казахстане",
    lat: 48.0,
    lng: 70.3,
    measurement_type: "solid",
    measurement_value: 0.01,
    date: Date.new(2021, 5, 14),
    description: "Утечка цианида во время обработки руды",
    news_link: "https://www.business-humanrights.org/en/latest-news/kazakhstan-kazzinc-paid-almost-50-mln-tenge-in-fines-for-river-pollution/"
  },
  {
    location: "Южная Африка — шахта",
    lat: -28.7,
    lng: 24.7,
    measurement_type: "water",
    measurement_value: 1.2,
    date: Date.new(2022, 9, 11),
    description: "Плотина на алмазном руднике в Ягерсфонтейне рухнула, вызвав поток горнодобывающих отходов",
    news_link: "https://www.livescience.com/planet-earth/pollution/earth-from-space-golden-river-of-toxic-waste-spills-out-from-deadly-mining-disaster-in-south-africa"
  },
  {
    location: "Китай — Хэнань",
    lat: 34.7,
    lng: 113.6,
    measurement_type: "water",
    measurement_value: 0.2,
    date: Date.new(2023, 3, 22),
    description: "Незначительное превышение уровня цианида в реке",
    news_link: "https://enviliance.com/regions/east-asia/cn/report_2551"
  },
  {
    location: "США — Невада",
    lat: 39.3,
    lng: -116.6,
    measurement_type: "solid",
    measurement_value: 0.5,
    date: Date.new(2020, 9, 12),
    description: "Выброс из хранилища промышленных отходов",
    news_link: "https://www.epa.gov/archive/epapages/newsroom_archive/newsreleases/16d63f090f10696385257d5e005ae237.html"
  },
  {
    location: "Индонезия — Суматра",
    lat: -0.5,
    lng: 101.4,
    measurement_type: "solid",
    measurement_value: 0.5,
    date: Date.new(2021, 11, 2),
    description: "Неофициальная добыча с использованием цианида",
    news_link: nil
  },
  {
    location: "Россия — Красноярский край",
    lat: 56.0,
    lng: 93.0,
    measurement_type: "water",
    measurement_value: 0.8,
    date: Date.new(2023, 7, 10),
    description: "Разлив на территории золоторудного предприятия",
    news_link: nil
  },
  {
    location: "Бразилия — Амазония",
    lat: -3.1,
    lng: -60.0,
    measurement_type: "water",
    measurement_value: 1.5,
    date: Date.new(2022, 1, 18),
    description: "Фиксация загрязнения в результате нелегальной добычи",
    news_link: "https://agenciabrasil.ebc.com.br/en/geral/noticia/2025-02/federal-police-destroy-illegal-gold-mines-amazon"
  },
  {
    location: "Румыния — река Сомеш",
    lat: 47.8,
    lng: 23.9,
    measurement_type: "water",
    measurement_value: 1.8,
    date: Date.new(2000, 1, 30),
    description: "Одна из самых известных катастроф с цианидом в Европе",
    news_link: "https://www.theguardian.com/world/2000/feb/14/1"
  },
  {
    location: "Монголия — северный регион",
    lat: 49.0,
    lng: 106.9,
    measurement_type: "water",
    measurement_value: 0.8,
    date: Date.new(2007, 4, 5),
    description: "Разлив цианида натрия в результате золотодобычи в сомоне Хонгор",
    news_link: "https://reliefweb.int/report/mongolia/mongolia-sodium-cyanide-and-mercury-pollution-and-mining-related-environmental-emergencies-july-2007"
  }
]
  

# "image_url",
# "title",
# "description",
# "external_link",
# "created_at",
# "updated_at"

# news_data [
#   {
#     image_url: 
#   },
# ]

spots_data.each do |spot_attributes|
  Spot.find_or_create_by!(location: spot_attributes[:location], date: spot_attributes[:date]) do |spot|
    spot.lat = spot_attributes[:lat]
    spot.lng = spot_attributes[:lng]
    spot.measurement_type = spot_attributes[:measurement_type]
    spot.measurement_value = spot_attributes[:measurement_value]
    spot.description = spot_attributes[:description]
    spot.news_link = spot_attributes[:news_link]
  end
end

puts "Создано или найдено #{Spot.count} точек загрязнения." # Теперь подсчитываем общее количество в базе

# Создание AdminUser (лучше использовать find_or_create_by! и для него, чтобы не дублировать админа)
if Rails.env.development?
  AdminUser.find_or_create_by!(email: 'admin@example.com') do |u|
    u.password = 'password'
    u.password_confirmation = 'password'
  end
  puts "AdminUser создан или найден."
end