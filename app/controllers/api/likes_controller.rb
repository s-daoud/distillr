class Api::LikesController < ApplicationController
  def create
    @like = Like.new(like_params)
    @like.user_id = current_user.id
    @like.save
    render :show
  end

  def destroy
    @like = Like.find(params[:id])
    @like.destroy!
    render :show
  end

  private
  def like_params
    params.require(:like).permit(:checkin_id)
  end
end
