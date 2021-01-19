class Api::V2::LoginsController < ApplicationController
  def index
    logins = Login.all
    #logins = Login.all
    render json: logins
  end

  def show
  end
  
  def create
    logins = Login.create(login_param)
    render json: logins
  end

  def update
    logins = Login.find(params[:id])
    logins.update_attributes(login_param)
    render json: logins
  end

  def destroy
    logins = Login.find(params[:id])
    logins.destroy
    head :no_content, status: :ok
  end

  private

  def login_param
    params.require(:login).permit(:name, :password)
  end
end