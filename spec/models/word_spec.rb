require 'rails_helper'

RSpec.describe Word, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
  # Validation tests
  # ensure columns name are present before saving
  it { should validate_presence_of(:name) }
end
