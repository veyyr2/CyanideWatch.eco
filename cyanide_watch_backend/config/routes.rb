Rails.application.routes.draw do
  # Объединённая конфигурация Devise + ActiveAdmin
  devise_for :admin_users, {
    controllers: {
      registrations: 'admin_users/registrations',
      sessions: 'active_admin/devise/sessions'
    }
  }.merge(ActiveAdmin::Devise.config)

  ActiveAdmin.routes(self)
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # главная страница
  get '/index', to: 'pages#index'

  # моя карта
  get '/map', to: 'pages#map'

  # новости
  get '/news', to: 'pages#news'

  # пожертвовать
  get '/donate', to: 'pages#donate'

  # из формы в главную страницу
  get 'request_moderators/index.html', to: 'pages#index'
  
  # главный путь
  root "pages#index"

  namespace :api do
    resources :spots, only: [:index]
  end

  namespace :api do
    resources :news, only: [:index]  # Доступ по /api/news
  end

  # запросы на модератора
  resources :request_moderators, only: [:new, :create] # /request_moderators/new
end