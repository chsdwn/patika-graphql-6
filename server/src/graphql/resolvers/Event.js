module.exports.Event = {
  location: (parent, _, { db }) => db.locations.find((l) => Number(l.id) === Number(parent.location_id)),
  user: (parent, _, { db }) => db.users.find((u) => Number(u.id) === Number(parent.user_id)),
  participants: (parent, _, { db }) => db.participants.filter((p) => Number(p.event_id) === Number(parent.id))
}
