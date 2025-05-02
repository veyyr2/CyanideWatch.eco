class Api::SpotsController < ApplicationController
    module Api
        class SpotsController < ApplicationController
          # Здесь вы добавляете методы контроллера
          def index
            spots = Spot.all
            render json: spots
          end
        end
      end
end
