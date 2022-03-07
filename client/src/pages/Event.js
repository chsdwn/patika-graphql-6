import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_EVENT, PARTICIPANT_ADDED } from 'queries'
import { Divider, Layout, List, PageHeader, Skeleton, Typography } from 'antd'

const { Paragraph, Text, Title } = Typography

export const Event = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data, loading, subscribeToMore } = useQuery(GET_EVENT, { variables: { id } })

  useEffect(() => {
    subscribeToMore({
      document: PARTICIPANT_ADDED,
      variables: { event_id: id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        return {
          event: {
            ...prev.event,
            participants: [
              subscriptionData.data.participantAdded,
              ...prev.event.participants
            ]
          }
        }
      }
    })
  }, [id, subscribeToMore])

  const handleGoHome = () => navigate('/')

  if (loading) return <div>Loading...</div>

  return (
    <Layout style={styles.container}>
      <PageHeader
        onBack={handleGoHome}
        title='Event Details'
        style={styles.header}
      />
      <Layout style={styles.titleDateContainer}>
        <Title level={2}>{data.event.title}</Title>
      </Layout>
      <Paragraph>{data.event.desc}</Paragraph>
      <List.Item>
        <Skeleton loading={false} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <List.Item.Meta
            title={data.event.user.username}
            description={data.event.user.email}
          />
          <Layout style={styles.dateLocationContainer}>
            <Text>{new Date(data.event.date).toLocaleDateString()}</Text>
            <Text>@{data.event.location.name}</Text>
          </Layout>
        </Skeleton>
      </List.Item>
      <Divider>Participants</Divider>
      <List
        bordered
        dataSource={data.event.participants}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text>{item.user.username}</Typography.Text>
          </List.Item>
        )}
      />
    </Layout>
  )
}

const styles = {
  container: {
    margin: 12,
    backgroundColor: '#fff'
  },
  header: {
    padding: 0,
    marginBottom: 8
  },
  titleDateContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'none'
  },
  dateLocationContainer: {
    justifyContent: 'center',
    alignItems: 'end',
    background: 'none'
  }
}
