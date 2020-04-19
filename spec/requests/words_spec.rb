require 'rails_helper'

RSpec.describe 'Words API', type: :request do
  # initialize user data 
  let!(:user) { create(:user) }
  let!(:words) { create_list(:word,1) }
  # authorize request
  let(:headers) { valid_headers }

  # Word validate test suite
  describe 'POST /validate' do
    let(:valid_attributes) do
      # send json payload
      { word: 'hero' }.to_json
    end
    context 'when valid request' do
      before { post '/validate', params: valid_attributes, headers: headers }

      it 'returns valid message' do
        expect(json['message'])
          .to match(/Valid Word/)
      end
      
     end

      context 'when empty request' do
        let(:invalid_attributes) { { word: '' }.to_json}
        before { post '/validate', params: invalid_attributes, headers: headers }

        it 'returns invalid message' do
          expect(json['message'])
            .to match(/Word is empty/)
        end
      end

      context 'when invalid request' do
        let(:invalid_attributes) { { word: 'shdgfjshdfj' }.to_json}
        before { post '/validate', params: invalid_attributes, headers: headers }

        it 'returns invalid message' do
          expect(json['message'])
            .to match(/Invalid Word/)
        end
      end
   end
end