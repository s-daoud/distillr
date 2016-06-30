class Api::CommentsController < ApplicationController
  def create
    @comment = Comment.new(comment_params)
    @comment.user_id = current_user.id
    if @comment.save
      render json: @comment.checkin
    else
      render json: {base: @comment.errors.full_messages}, status: 401
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy!
    render json: @comment.checkin
  end

  private
  def comment_params
    params.require(:comment).permit(:checkin_id, :comment)
  end
end
