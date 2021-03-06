class Api::V1::ItemsController < Api::V1::BaseController
  def index
    items = Item.all.sort_by{ |t| [t.Date, t.Time] }
    #items = Item.all
    render json: items
  end

  def show
  end
  
  def create
    items = Item.create(item_param)
    render json: items
  end

  def update
    items = Item.find(params[:id])
    items.update_attributes(item_param)
    render json: items
  end

  def destroy
    items = Item.find(params[:id])
    items.destroy
    head :no_content, status: :ok
  end

  private

  def item_param
    params.require(:item).permit(:Date, :Time, :Title, :Details, :Tag, :Done, :user_name)
  end
end