module.exports.Participant = {
  user: (parent, _, { db }) => db.users.find((u) => Number(u.id) === Number(parent.user_id))
}
