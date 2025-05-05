module Api
  class SpotsController < ApplicationController
    def index
      spots = Spot.all
      render json: spots
    end
  end
end