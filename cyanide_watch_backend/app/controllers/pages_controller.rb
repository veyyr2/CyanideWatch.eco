class PagesController < ApplicationController
    def index
      render layout: false
    end
  
    def map
      render layout: false
    end

    def news
      @news = News.all
      
      respond_to do |format|
        format.html  # для обычного HTML-запроса
        format.json { render json: @news }  # для JSON-запроса
      end
    end
  end