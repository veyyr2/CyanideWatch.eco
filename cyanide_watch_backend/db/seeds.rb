# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
spots = [
    {
      location: "Река Тиса",
      lat: 47.9,
      lng: 21.7,
      severity: "high",
      date: Date.new(2020, 2, 1),
      description: "Крупный разлив цианида на границе Румынии и Венгрии"
    },
    {
      location: "Завод Золотодобычи в Казахстане",
      lat: 48.0,
      lng: 70.3,
      severity: "medium",
      date: Date.new(2021, 5, 14),
      description: "Утечка цианида во время обработки руды"
    },
    {
      location: "Южная Африка — шахта",
      lat: -28.7,
      lng: 24.7,
      severity: "high",
      date: Date.new(2022, 8, 5),
      description: "Загрязнение местных вод после аварии на фабрике"
    },
    {
      location: "Китай — Хэнань",
      lat: 34.7,
      lng: 113.6,
      severity: "low",
      date: Date.new(2023, 3, 22),
      description: "Незначительное превышение уровня цианида в реке"
    },
    {
      location: "США — Невада",
      lat: 39.3,
      lng: -116.6,
      severity: "medium",
      date: Date.new(2020, 9, 12),
      description: "Выброс из хранилища промышленных отходов"
    },
    {
      location: "Индонезия — Суматра",
      lat: -0.5,
      lng: 101.4,
      severity: "high",
      date: Date.new(2021, 11, 2),
      description: "Неофициальная добыча с использованием цианида"
    },
    {
      location: "Россия — Красноярский край",
      lat: 56.0,
      lng: 93.0,
      severity: "medium",
      date: Date.new(2023, 7, 10),
      description: "Разлив на территории золоторудного предприятия"
    },
    {
      location: "Бразилия — Амазония",
      lat: -3.1,
      lng: -60.0,
      severity: "low",
      date: Date.new(2022, 1, 18),
      description: "Фиксация загрязнения в результате нелегальной добычи"
    },
    {
      location: "Румыния — река Сомеш",
      lat: 47.8,
      lng: 23.9,
      severity: "high",
      date: Date.new(2000, 1, 30),
      description: "Одна из самых известных катастроф с цианидом в Европе"
    },
    {
      location: "Монголия — северный регион",
      lat: 49.0,
      lng: 106.9,
      severity: "medium",
      date: Date.new(2024, 4, 5),
      description: "Инцидент на шахте, повлекший временное загрязнение реки"
    }
  ]
  
  Spot.create!(spots)
  
  puts "Создано #{spots.size} точек загрязнения."
  
  