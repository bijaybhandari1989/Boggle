class User < ApplicationRecord
    # encrypt password
    has_secure_password
    
    # model association
    has_many :scores, dependent: :destroy
    # validations
    validates_presence_of :name, :username, :password_digest, :high_score
end
