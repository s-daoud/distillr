class Api::VenuesController < ApplicationController
  def index
    if params[:loc] == "nearby"
      @venues = Venue.by_distance(params[:lat], params[:lng])
      render :index
    else
      if params[:loc] == "ratings"
        @venues = Venue.by_ratings
      else
        @venues = Venue.with_ratings
      end
      render :ratings
    end
  end

  def create
    @venue = Venue.new(venue_params)
    if @venue.save
      render json: @venue
    else
      render json: {base: @venue.errors.full_messages}, status: 400
    end
  end

  def show
    @venue = Venue.add_rating(params[:id])
    render :show
  end

  private
  def venue_params
    params.require(:venue).permit(:name, :description, :address)
  end
end
