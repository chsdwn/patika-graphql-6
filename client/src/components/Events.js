import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { EVENT_CREATED, GET_EVENTS } from 'queries'
import { Divider, Layout, List } from 'antd'
import { Link } from 'react-router-dom'

export const Events = () => {
  const { loading, data, subscribeToMore } = useQuery(GET_EVENTS)

  useEffect(() => {
    subscribeToMore({
      document: EVENT_CREATED,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        return {
          ...prev,
          events: [
            subscriptionData.data.eventCreated,
            ...prev.events
          ]
        }
      }
    })
  }, [subscribeToMore])

  return (
    <>
      <Divider>Events</Divider>
      <Layout style={{ height: 400, overflowY: 'auto', padding: 8, background: 'none', border: '1px solid #99999940' }}>
        <List
          itemLayout='horizontal'
          loading={loading}
          dataSource={data.events}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={<Link to={`/event/${item.id}`}>{item.title}</Link>}
                description={item?.desc?.substring(0, 64) + '...'}
              />
              <span style={styles.dateText}>{new Date(item.date).toLocaleDateString()}</span>
            </List.Item>
          )}
        />
      </Layout>
    </>
  )
}

const styles = {
  dateText: {
    alignSelf: 'flex-start',
    fontWeight: 'lighter',
    marginLeft: 8
  }
}
