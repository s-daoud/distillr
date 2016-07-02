class Api::CommentsController < ApplicationController
  def create
    @comment = Comment.new(comment_params)
    @comment.user_id = current_user.id
    if @comment.save
      render :show
    else
      render json: {base: @comment.errors.full_messages}, status: 400
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy!
    render :show
  end

  private
  def comment_params
    params.require(:comment).permit(:checkin_id, :comment)
  end
end
