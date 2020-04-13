class User < ApplicationRecord
    # model association
    has_many :scores, dependent: :destroy
    # validations
    validates_presence_of :username, :password, :high_score
end
