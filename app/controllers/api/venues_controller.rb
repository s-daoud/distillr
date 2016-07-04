class Api::VenuesController < ApplicationController
  def index
    @venues = Venue.all
    render json: @venues
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
    @venue = Venue.find(params[:id])
    render json: @venue
  end

  private
  def venue_params
    params.require(:venue).permit(:name, :description, :address)
  end
end
