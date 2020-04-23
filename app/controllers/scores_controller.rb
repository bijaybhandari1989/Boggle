class ScoresController < ApplicationController
  
  # GET /scores
  def index
    @scores = current_user.scores
    json_response(@scores)
  end

  # GET /scores/:id
  def show
    json_response(@score)
  end

  # POST /scores
  def create
    text = Message.score_user % score_params[:score]
    @score = current_user.scores.create!(score_params)
    if score_params[:score] != 0 and current_user.high_score != 0
      text = Message.encourage_user % score_params[:score]
    end
    if current_user.high_score < score_params[:score]
        @user = User.find(current_user.id)
        @user.high_score = score_params[:score]
        @user.save!
        text = Message.new_high_score % score_params[:score]
    end
    response = {message: text, score: @score}
    json_response(response, :created)
  end

  private

  def score_params
    params.permit(:score)
  end

end
