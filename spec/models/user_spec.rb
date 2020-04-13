require 'rails_helper'

RSpec.describe User, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
  # ensure User model has a 1:m relationship with the Score model
  it { should have_many(:scores).dependent(:destroy) }
  # Validation tests
  # ensure columns username and password are present before saving
  it { should validate_presence_of(:username) }
  it { should validate_presence_of(:password) }
  it { should validate_presence_of(:high_score) }
end
