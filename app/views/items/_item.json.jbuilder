json.extract! item, :id, :Date, :Time, :Title, :Details, :Tag, :Done, :created_at, :updated_at
json.url item_url(item, format: :json)
