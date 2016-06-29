class Api::LikesController < ApplicationController
  def create
    @like = Like.new(like_params)
    @like.user_id = current_user.id
    @like.save
    render json: @like
  end

  def destroy
    @like = Like.find(params[:id])
    @like.destroy!
    render json: @like
  end

  private
  def like_params
    params.require(:like).permit(:checkin_id)
  end
end
