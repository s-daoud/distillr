class Api::CheckinsController < ApplicationController
  def index
    @checkins = Checkin.all
    render json: @checkins
  end

  def create
    @checkin = Checkin.new(checkin_params)
    @checkin.user_id = current_user.id
    if @checkin.save
      render json: @checkin
    else
      render json: {base: @checkin.errors.full_messages}, status: 401
    end
  end

  def destroy
    @checkin = Checkin.find(params[:id])
    @checkin.destroy!
    render json: @checkin
  end

  private
  def checkin_params
    params.require(:checkin).permit(:drink_id, :rating, :review)
  end

end
