class UsersController < ApplicationController
  skip_before_action :authorize_request, only: :create
  # POST /signup
  # return authenticated token upon signup
  def create
    @user = User.new(user_params)
    @user.high_score = 0
    @user.save!
    auth_token = AuthenticateUser.new(user_params[:username], user_params[:password]).call
    response = { message: Message.account_created, auth_token: auth_token }
    json_response(response, :created)
  end

  private

  def user_params
    params.permit(
      :name,
      :username,
      :password,
      :password_confirmation
    )
  end
end