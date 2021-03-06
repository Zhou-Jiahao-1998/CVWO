class ItemsController < ApplicationController
  before_action :set_item, only: [:show, :edit, :update, :destroy]

  # GET /items
  # GET /items.json
  def index
    if (params.has_key?(:Date))
      @items = Item.where(Date: 1000000.days.ago...(Time.now)).sort_by{ |t| [t.Date, t.Time] }
    elsif (params.has_key?(:Time))
      @items = Item.where.not(Date: 1000000.days.ago...(Time.now)).sort_by{ |t| [t.Date, t.Time] }
    elsif (params.has_key?(:Tag)&&params.has_key?(:Done))
      @items = Item.where(Tag: params[:Tag]).where(Done: params[:Done]).sort_by{ |t| [t.Date, t.Time] }
    elsif (params.has_key?(:Tag))
      @items = Item.where(Tag: params[:Tag]).sort_by{ |t| [t.Date, t.Time] }
    elsif (params.has_key?(:Done))
      @items = Item.where(Done: params[:Done]).sort_by{ |t| [t.Date, t.Time] }
    else
      @items = Item.all.sort_by{ |t| [t.Date, t.Time] }
    end
  end

  # GET /items/1
  # GET /items/1.json
  def show
  end

  # GET /items/new
  def new
    @item = Item.new
  end

  # GET /items/1/edit
  def edit
  end

  # POST /items
  # POST /items.json
  def create
    @item = Item.new(item_params)

    respond_to do |format|
      if @item.save
        format.html { redirect_to @item, notice: 'Item was successfully created.' }
        format.json { render :show, status: :created, location: @item }
      else
        format.html { render :new }
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /items/1
  # PATCH/PUT /items/1.json
  def update
    respond_to do |format|
      if @item.update(item_params)
        format.html { redirect_to @item, notice: 'Item was successfully updated.' }
        format.json { render :show, status: :ok, location: @item }
      else
        format.html { render :edit }
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /items/1
  # DELETE /items/1.json
  def destroy
    @item.destroy
    respond_to do |format|
      format.html { redirect_to items_url, notice: 'Item was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_item
      @item = Item.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def item_params
      params.require(:item).permit(:Date, :Time, :Title, :Details, :Tag, :Done, user_name)
    end
end
