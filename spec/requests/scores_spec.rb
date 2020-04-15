require 'rails_helper'

RSpec.describe 'Scores API', type: :request do
  # initialize test data 
  let!(:user) { create(:user) }
  let!(:scores) { create_list(:score, 10, user_id: user.id) }
  let(:user_id) { user.id }
  let(:id) { scores.first.id }

  # Test suite for GET /users/:user_id/scores
  describe 'GET /users/:user_id/scores' do
    # make HTTP get request before each example
    before { get "/users/#{user_id}/scores" }

    context 'when user exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns all user scores' do
        expect(json.size).to eq(10)
      end
    end

    context 'when user does not exist' do
      let(:user_id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find User/)
      end
    end
  end

  # Test suite for GET /users/:user_id/socres/:id
  describe 'GET /users/:user_id/socres/:id' do
    before { get "/users/#{user_id}/scores/#{id}" }

    context 'when user scores exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns the score' do
        expect(json['id']).to eq(id)
      end
    end

    context 'when user score does not exist' do
      let(:id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Score/)
      end
    end
  end

  # Test suite for POST /users/:user_id/scores
  describe 'POST /users/:user_id/scores' do
    let(:valid_attributes) { { score: 100 } }

    context 'when request attributes are valid' do
      before { post "/users/#{user_id}/scores", params: valid_attributes }

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when an invalid request' do
      before { post "/users/#{user_id}/scores", params: {} }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a failure message' do
        expect(response.body).to match(/Validation failed: Score can't be blank/)
      end
    end
  end

  # Test suite for PUT /users/:user_id/scores/:id
  describe 'PUT /users/:user_id/scores/:id' do
    let(:valid_attributes) { { score: 10 } }

    before { put "/users/#{user_id}/scores/#{id}", params: valid_attributes }

    context 'when score exists' do
      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end

      it 'updates the score' do
        updated_score = Score.find(id)
        expect(updated_score.score).to match(10)
      end
    end

    context 'when the score does not exist' do
      let(:id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Score/)
      end
    end
  end

  # Test suite for DELETE /users/:id/scores/:id
  describe 'DELETE /users/:id/scores/:id' do
    before { delete "/users/#{user_id}/scores/#{id}" }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end