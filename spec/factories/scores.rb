FactoryBot.define do
    factory :score do
      score { Faker::Number.number(0) }
      user_id { nil }
    end
  end