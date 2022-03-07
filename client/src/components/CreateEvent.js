import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { Button, Form, Input, Layout, Select, Typography, message } from 'antd'
import { CREATE_EVENT, GET_LOCATIONS, GET_USERS } from 'queries'

const { Title } = Typography

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

export const CreateEvent = () => {
  const { data: usersData, loading: usersLoading } = useQuery(GET_USERS)
  const { data: locationsData, loading: locationsLoading } = useQuery(GET_LOCATIONS)
  const [createEvent, { loading }] = useMutation(CREATE_EVENT)

  const [form] = Form.useForm()

  const onFinish = async (values) => {
    try {
      await createEvent({
        variables: {
          data: values
        }
      })
      message.success('Event created.')
      form.resetFields()
    } catch (err) {
      message.error(err.message)
    }
  }

  return (
    <Layout style={styles.container}>
      <Title level={4} style={{ textAlign: 'center' }}>New Event</Title>
      <Form
        form={form}
        name='createEvent'
        onFinish={onFinish}
        {...layout}
      >
        <Form.Item
          name='title'
          label='Title'
          rules={[{ required: true, message: 'Please input a title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name='desc' label='Description'>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name='date' label='Date'>
          <Input placeholder='yyyy-mm-dd' />
        </Form.Item>

        <Form.Item
          label='Location'
          name='location_id'
          rules={[{ required: true, message: 'Please select a location!' }]}
        >

          <Select loading={locationsLoading} disabled={locationsLoading} placeholder='Select location'>
            {locationsData?.locations.map((location) => (
              <Option key={location.id} value={location.id}>{location.name}</Option>
            ))}
          </Select>

        </Form.Item>

        <Form.Item
          label='User'
          name='user_id'
          rules={[{ required: true, message: 'Please select a user!' }]}
        >
          <Select loading={usersLoading} disabled={usersLoading} placeholder='Select user'>
            {usersData?.users.map((user) => (
              <Option key={user.id} value={user.id}>{user.username}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' loading={loading} disabled={loading}>
            Add
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  )
}

const styles = {
  container: {
    paddingLeft: 24,
    paddingTop: 24,
    paddingRight: 24,
    border: '1px solid #99999940',
    borderRadius: 3,
    marginBottom: 32
  }
}
