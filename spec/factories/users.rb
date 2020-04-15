FactoryBot.define do
    factory :user do
      username { Faker::Lorem.word }
      password { Faker::Lorem.word }
      high_score { Faker::Number.number(digits: 10)}
    end
end