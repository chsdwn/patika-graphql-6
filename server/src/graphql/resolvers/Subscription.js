const { withFilter } = require('graphql-yoga')

module.exports.Subscription = {
  userCreated: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('userCreated')
  },

  eventCreated: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('eventCreated')
  },
  participantAdded: {
    subscribe: withFilter(
      (_, __, { pubsub }) => pubsub.asyncIterator('participantAdded'),
      ({ participantAdded }, args) => !args.event_id || participantAdded.event_id === args.event_id
    )
  }
}
