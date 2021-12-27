import React, { useState, FC } from 'react'
import { Button, Form, Alert, ButtonGroup } from 'react-bootstrap'
import { useAuth } from '../../hooks/useAuth'
import { useRouter } from 'next/router'
import { User } from '../../types/user'

import styles from '../../styles/Messages.module.css'
import { IError } from '../../types/error'

const NewConversationForm: FC<Props> = ({ addConversation, users }) => {
  const [recipientId, setRecipientId] = useState<number>(0)
  const [error, setError] = useState<IError>({
    message: '',
    variant: 'success',
  })
  const { user } = useAuth()
  const router = useRouter()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setError(null)

    if (!recipientId) {
      setError({
        message: 'Something went wrong, try again ...',
        variant: 'danger',
      })
      return
    }

    const recipientNickname = users.find(
      (user) => user.id === recipientId
    ).nickname

    const options = {
      recipientId,
      recipientNickname,
      senderId: user.id,
      senderNickname: user.nickname,
      lastMessageTimestamp: new Date().getTime() / 1000,
    }

    const { data, error } = await addConversation(`/conversations`, {
      body: JSON.stringify(options),
    })

    if (error)
      setError({
        message: 'Something went wrong, try again ...',
        variant: 'danger',
      })

    if (data) {
      setRecipientId(0)
      router.push('/messages')
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      {error && error.message && (
        <Alert variant={error.variant}>{error.message}</Alert>
      )}
      <h2 className={styles.title}>New conversation</h2>
      <Form.Group className="mb-3">
        <Form.Select
          size="sm"
          name="recipientId"
          onChange={(e) => setRecipientId(+e.target.value)}
          value={recipientId}
        >
          <option value={0}>Choose user ...</option>
          {users.map((user) => (
            <option value={user.id}>{user.nickname}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <ButtonGroup className="d-grid gap-2">
        <Button size="sm" variant="primary" type="submit">
          Create Conversation
        </Button>
      </ButtonGroup>
    </Form>
  )
}

interface Props {
  addConversation: (
    url: string,
    options: { body: string }
  ) => Promise<{ data: boolean; error: string }>
  users: Array<User>
}

export default React.memo(NewConversationForm)
