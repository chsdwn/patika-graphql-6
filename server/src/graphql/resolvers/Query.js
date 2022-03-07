
module.exports.Query = {
  user: (_, args, { db }) => db.users.find((u) => Number(u.id) === Number(args.id)),
  users: (_, __, { db }) => db.users,

  event: (_, args, { db }) => db.events.find((e) => Number(e.id) === Number(args.id)),
  events: (_, __, { db }) => db.events,

  location: (_, args, { db }) => db.locations.find((l) => Number(l.id) === Number(args.id)),
  locations: (_, __, { db }) => db.locations,

  participant: (_, args, { db }) => db.participants.find((p) => Number(p.id) === Number(args.id)),
  participants: (_, __, { db }) => db.participants
}
