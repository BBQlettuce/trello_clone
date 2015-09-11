json.extract! list, :title, :ord
json.cards do
  json.array! list.cards do |card|
    json.partial! 'api/cards/card', card: card
  end
end
