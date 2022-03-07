import { gql } from '@apollo/client'

const EventFragment = gql`
  fragment EventFragment on Event {
    id
    title
    desc
    date
  }
`

const ParticipantFragment = gql`
  fragment ParticipantFragment on Participant {
    user {
      id
      username
    }
  }
`

export const GET_USERS = gql`
  query {
    users {
      id
      username
    }
  }
`

export const CREATE_EVENT = gql`
  mutation createEvent($data: CreateEventInput!) {
    createEvent(data: $data) {
      id
    }
  }
`

export const GET_EVENT = gql`
  query getEvent($id: ID!) {
    event(id: $id) {
      ...EventFragment
      location {
        id
        name
      }
      user {
        id
        username
        email
      }
      participants {
        ...ParticipantFragment
      }
    }
  }
  ${EventFragment}
  ${ParticipantFragment}
`

export const GET_EVENTS = gql`
  query getEvents {
    events {
      ...EventFragment
    }
  }
  ${EventFragment}
`

export const EVENT_CREATED = gql`
  subscription {
    eventCreated {
      ...EventFragment
    }
  }
  ${EventFragment}
`

export const GET_LOCATIONS = gql`
  query {
    locations {
      id
      name
    }
  }
`

export const PARTICIPANT_ADDED = gql`
  subscription participantAdded($event_id: ID) {
    participantAdded(event_id: $event_id) {
      ...ParticipantFragment
    }
  }
  ${ParticipantFragment}
`
