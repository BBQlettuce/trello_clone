json.extract! list, :id, :title, :ord, :board_id
json.cards do
  json.array! list.cards do |card|
    json.partial! 'api/cards/card', card: card
  end
end
