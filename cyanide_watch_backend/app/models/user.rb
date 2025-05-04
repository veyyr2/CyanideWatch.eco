class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_one :moderator
  has_many :news

  def moderator?
    moderator.present?
  end
end