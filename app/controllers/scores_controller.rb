class ScoresController < ApplicationController
  before_action :set_user
  before_action :set_user_score, only: [:show, :update, :destroy]

  # GET /users/:user_id/scores
  def index
    json_response(@user.scores)
  end

  # GET /users/:user_id/scores/:id
  def show
    json_response(@score)
  end

  # POST /users/:user_id/scores
  def create
    @score = @user.scores.create!(score_params)
    json_response(@score, :created)
  end

  # PUT /users/:user_id/scores/:id
  def update
    @score.update(score_params)
    head :no_content
  end

  # DELETE /users/:user_id/scores/:id
  def destroy
    @score.destroy
    head :no_content
  end

  private

  def score_params
    params.permit(:score)
  end

  def set_user
    @user = User.find(params[:user_id])
  end

  def set_user_score
    @score = @user.scores.find_by!(id: params[:id]) if @user
  end
end
