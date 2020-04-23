class AuthenticationController < ApplicationController
  skip_before_action :authorize_request, only: :authenticate
  # return auth token once user is authenticated
  def authenticate
    auth_token = AuthenticateUser.new(auth_params[:username], auth_params[:password]).call
    user = User.find_by(username: auth_params[:username])
    json_response(auth_token: auth_token, high_score: user.high_score )
  end

  private

  def auth_params
    params.permit(:username, :password)
  end
end