# app/controllers/views_controller.rb
class ViewsController < ApplicationController
    def map
      # Явно указываем Rails отрендерить map.html.erb без использования макета
      render layout: false
    end
    def index
      # Явно указываем Rails отрендерить map.html.erb без использования макета
      render layout: false
    end
  end