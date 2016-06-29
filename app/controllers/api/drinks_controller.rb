class Api::DrinksController < ApplicationController
  def index
    @drinks = Drink.all
    render json: @drinks
  end

  def create
    @drink = Drink.new(drink_params)
    if @drink.save
      render json: @drink
    else
      render json: {base: @drink.errors.full_messages}, status: 401
    end
  end

  def show
    @drink = Drink.find(params[:id])
    render json: @drink
  end

  private
  def drink_params
    params.require(:drink).permit(:name, :description, :image_url)
  end
end
