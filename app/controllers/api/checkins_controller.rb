class Api::CheckinsController < ApplicationController
  def index
    if params[:loc] == "feed"
      @checkins = Checkin.all_friends(params[:id])
    elsif params[:loc] == "profile"
      @checkins = Checkin.all_profile(params[:id])
    elsif params[:loc] == "drink"
      @checkins = Checkin.all_drink(params[:id])
    elsif params[:loc] == "venue"
      @checkins = Checkin.all_venue(params[:id])
    end
  end

  def create
    @checkin = Checkin.new(checkin_params)
    @checkin.user_id = current_user.id
    if @checkin.save
      render :show
    else
      render json: {base: @checkin.errors.full_messages}, status: 400
    end
  end

  def destroy
    @checkin = Checkin.find(params[:id])
    @checkin.destroy!
    render json: @checkin
  end

  private
  def checkin_params
    params.require(:checkin).permit(:drink_id, :venue_id, :rating, :review)
  end

end
