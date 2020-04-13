FactoryBot.define do
    factory :user do
      username { Faker::Lorem.word }
      password { Faker::Lorem.word }
      high_score { Faker::Number.number(0)}
    end
end