require 'rails_helper'

RSpec.describe User, type: :model do
  # ensure User model has a 1:m relationship with the Score model
  it { should have_many(:scores).dependent(:destroy) }
  # Validation tests
  # ensure columns username and password_digest are present before saving
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:username) }
  it { should validate_presence_of(:password_digest) }
  it { should validate_presence_of(:high_score) }
end
