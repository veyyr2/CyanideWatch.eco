class Api::NewsController < ApplicationController
  def index
    @news = News.order(created_at: :desc)
    render json: @news
  end
end