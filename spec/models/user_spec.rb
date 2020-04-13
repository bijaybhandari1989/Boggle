require 'rails_helper'

RSpec.describe User, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"
  # Validation tests
  # ensure columns username and password are present before saving
  it { should validate_presence_of(:username) }
  it { should validate_presence_of(:password) }
end
