require 'rails_helper'

RSpec.describe Word, type: :model do
  # Validation tests
  # ensure columns name are present before saving
  it { should validate_presence_of(:name) }
end
