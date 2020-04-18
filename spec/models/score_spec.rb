require 'rails_helper'

RSpec.describe Score, type: :model do
  # ensure an item record belongs to a single user record
  it { should belong_to(:user) }
  # Validation tests
  # ensure columns score are present before saving
  it { should validate_presence_of(:score) }
end
