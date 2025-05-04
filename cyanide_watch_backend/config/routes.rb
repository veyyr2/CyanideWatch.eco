Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'registrations'
  }

  post 'moderators', to: 'moderators#create'
  ActiveAdmin.routes(self)
  get "up" => "rails/health#show", as: :rails_health_check

  root 'pages#index'
  get '/map', to: 'pages#map'

  # Изменяем маршруты для новостей
  resources :news, only: [:index, :new, :create] do
    collection do
      get 'list' # Добавляем новый маршрут для просмотра списка новостей
    end
  end

  namespace :api do
    resources :spots, only: [:index]
  end
end