module.exports.User = {
  events: (parent, _, { db }) => db.events.filter((e) => Number(e.user_id) === Number(parent.id))
}
