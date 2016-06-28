class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render :show
    else
      all_errors = []
      @user.errors.each do |k, v|
        all_errors << "#{k.capitalize} #{v}"
      end
      render json: {base: all_errors}, status: 401
    end
  end

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
