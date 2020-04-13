class Score < ApplicationRecord
  belongs_to :user
  # validation
  validates_presence_of :score
end
