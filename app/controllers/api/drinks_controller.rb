class Api::DrinksController < ApplicationController
  def index
    if params[:loc] == "ratings"
      @drinks = Drink.by_ratings
    else
      @drinks = Drink.with_ratings
    end
    render :ratings
  end

  def create
    @drink = Drink.new(drink_params)
    if @drink.save
      render json: @drink
    else
      render json: {base: @drink.errors.full_messages}, status: 400
    end
  end

  def show
    @drink = Drink.add_rating(params[:id])
    render :show
  end

  private
  def drink_params
    params.require(:drink).permit(:name, :description, :image_url)
  end
end
