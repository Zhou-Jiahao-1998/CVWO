class Api::V1::ItemsController < Api::V1::BaseController
  def index
    items = Item.order("created_at DESC")
    render json: items
  end

  def create
    items = Item.create(todo_param)
    render json: items
  end

  def update
    items = Item.find(params[:id])
    items.update_attributes(todo_param)
    render json: items
  end

  def destroy
    items = Item.find(params[:id])
    items.destroy
    head :no_content, status: :ok
  end

  private

  def item_params
    params.require(:item).permit(:Date, :Time, :Title, :Details, :Tag, :Done)
  end
end