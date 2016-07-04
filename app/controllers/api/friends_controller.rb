class Api::FriendsController < ApplicationController
  def index
    @users = User.all
    @user = User.find(params[:user_id])
  end

  def create
    @friend = Friend.new(friend_params)
    @friend.user_id = current_user.id
    if @friend.save
      render :show
    else
      render json: {base: @friend.errors.full_messages}, status: 400
    end
  end

  def update
    @friend = Friend.find(params[:id])
    @friend.status = "accepted"
    @friend.save
    Friend.create({user_id: @friend.friend_id, friend_id: @friend.user_id, status: "accepted" })
    render :edit
  end

  def destroy
    @friend = Friend.find(params[:id])
    opposite = Friend.where("user_id = ?", @friend.friend_id).where("friend_id = ?", @friend.user_id).first
    @friend.destroy!
    opposite.destroy! if opposite
    render :show
  end

  private
  def friend_params
    params.require(:friend).permit(:user_id, :friend_id, :status)
  end
end
