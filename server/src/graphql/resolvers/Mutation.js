const { createMutation, updateMutation, deleteMutation, deleteAllMutation } = require('../../helpers')

module.exports.Mutation = {
  // User
  createUser: (_, { data }, { db, pubsub }) => {
    const user = { id: db.users.length + 1, ...data }
    db.users.push(user)
    pubsub.publish('userCreated', { userCreated: user })

    return user
  },
  updateUser: (_, { id, data }, { db }) => updateMutation(db.users, id, data),
  deleteUser: (_, { id }, { db }) => deleteMutation(db.users, id),
  deleteAllUsers: (_, __, { db }) => deleteAllMutation(db.users),

  // Event
  createEvent: (_, { data }, { db, pubsub }) => {
    const event = { id: db.events.length + 1, ...data }
    db.events.unshift(event)
    pubsub.publish('eventCreated', { eventCreated: event })

    return event
  },
  updateEvent: (_, { id, data }, { db }) => updateMutation(db.events, id, data),
  deleteEvent: (_, { id }, { db }) => deleteMutation(db.events, id),
  deleteAllEvents: (_, __, { db }) => deleteAllMutation(db.events),

  // Location
  createLocation: (_, { data }, { db }) => createMutation(db.locations, data),
  updateLocation: (_, { id, data }, { db }) => updateMutation(db.locations, id, data),
  deleteLocation: (_, { id }, { db }) => deleteMutation(db.locations, id),
  deleteAllLocations: (_, __, { db }) => deleteAllMutation(db.locations),

  // Participant
  createParticipant: (_, { data }, { db, pubsub }) => {
    const participant = { id: db.participants.length + 1, ...data }
    db.participants.unshift(participant)
    pubsub.publish('participantAdded', { participantAdded: participant })

    return participant
  },
  updateParticipant: (_, { id, data }, { db }) => updateMutation(db.participants, id, data),
  deleteParticipant: (_, { id }, { db }) => deleteMutation(db.participants, id),
  deleteAllParticipants: (_, __, { db }) => deleteAllMutation(db.participants)
}
