class Api::NewsController < ApplicationController
    def index
      @news = News.all  # Все новости (без сортировки)
      render json: @news
    end
  end