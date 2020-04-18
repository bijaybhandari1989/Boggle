require 'rails_helper'

RSpec.describe 'Scores API', type: :request do
  # initialize user data 
  let!(:user) { create(:user) }
  let!(:scores) { create_list(:score, 10, user_id: user.id) }
  let(:score_id) { scores.first.id }
  # authorize request
  let(:headers) { valid_headers }

  # Test suite for GET /scores
  describe 'GET /scores' do
     # update request with headers
     before { get "/scores", params: {}, headers: headers  }

     it 'returns scores' do
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  # Test suite for POST /scores
   describe 'POST /scores' do
    let(:valid_attributes) do
      # send json payload
      { score: 100 }.to_json
    end

    context 'when request is valid' do
      before { post '/scores', params: valid_attributes, headers: headers }

      it 'creates a score' do
        expect(json['score']['score']).to eq(100)
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      let(:invalid_attributes) { { score: nil }.to_json }
      before { post '/scores', params: invalid_attributes, headers: headers }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(json['message'])
          .to match(/Validation failed: Score can't be blank/)
      end
    end
  end
end