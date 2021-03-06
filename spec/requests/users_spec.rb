require 'rails_helper'

RSpec.describe 'User API', type: :request do
  let(:user) { build(:user) }
  let!(:users) { create_list(:user,1) }
  let(:headers) { valid_headers.except('Authorization') }
  let(:valid_attributes) do
    attributes_for(:user, username: "test@test.com")
  end

  # User signup test suite
  describe 'POST /signup' do
    context 'when valid request' do
      
      before { post '/signup', params: valid_attributes.to_json, headers: headers }

       it 'creates a new user' do
         expect(response).to have_http_status(201)
       end

       it 'returns success message' do
         expect(json['message']).to match(/Account created successfully/)
       end

       it 'returns an authentication token' do
         expect(json['auth_token']).not_to be_nil
       end
     end

    context 'when dublicate request' do
       let(:dublicate_attributes) { { username: "tester@tes.com", name:"test", password:"Test" }.to_json }

       before { post '/signup', params: dublicate_attributes, headers: headers }

       it 'does not create a new user' do
         expect(response).to have_http_status(400)
       end

       it 'returns failure message' do
         expect(json['message'])
           .to match(/Dublicate Username/)
       end
     end

      context 'when invalid request' do
        before { post '/signup', params: {}, headers: headers }

        it 'does not create a new user' do
          expect(response).to have_http_status(422)
        end

        it 'returns failure message' do
          expect(json['message'])
            .to match(/Validation failed: Password can't be blank, Name can't be blank, Username can't be blank, Password digest can't be blank/)
        end
      end
   end
end