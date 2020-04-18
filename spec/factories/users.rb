FactoryBot.define do
    factory :user do
      name { Faker::Name.name }
      username { 'tester@tes.com' }
      password { 'tester' }
      high_score { Faker::Number.number(digits: 10)}
    end
end