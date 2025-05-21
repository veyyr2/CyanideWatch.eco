class RequestModeratorsController < ApplicationController
    layout 'page'

    def new
        @request_moderator = RequestModerator.new # Создаем новый пустой объект для формы
    end

    def create
        @request_moderator = RequestModerator.new(request_moderator_params) # Инициализируем объект с данными из формы

        if @request_moderator.save # Пытаемся сохранить в БД
            # Успешное сохранение:
            flash[:notice] = "Ваш запрос на модератора успешно отправлен!" # Сообщение для пользователя
            redirect_to root_path # Перенаправляем на главную страницу или страницу подтверждения
        else
            # Ошибка сохранения (например, из-за валидаций):
            flash.now[:alert] = "Пожалуйста, проверьте форму. Есть ошибки." # Сообщение об ошибке
            render :new, status: :unprocessable_entity # Снова отображаем форму с ошибками
        end
    end

    private

    def request_moderator_params
        params.require(:request_moderator).permit(:first_name, :last_name, :email, :phone_number, :description)
    end
end
