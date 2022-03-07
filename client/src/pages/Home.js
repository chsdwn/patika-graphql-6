import React from 'react'
import { Events, CreateEvent } from 'components'

export const Home = () => {
  return (
    <div style={styles.container}>
      <CreateEvent />
      <Events />
    </div>
  )
}

const styles = {
  container: {
    margin: 24
  }
}
