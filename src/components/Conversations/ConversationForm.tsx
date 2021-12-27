import React, { FC, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { Button, Alert } from 'react-bootstrap'

import styles from '../../styles/Messages.module.css'
import { IError } from '../../types/error'

const ConversationForm: FC<Props> = ({ addMessage }) => {
  const [body, setBody] = useState('')
  const [error, setError] = useState<IError>({
    message: '',
    variant: 'success',
  })

  const onSubmit = async (e) => {
    e.preventDefault()

    setError({ message: '' })

    if (!body) {
      setError({
        message: 'Something went wrong, try again ...',
        variant: 'danger',
      })
      return
    }

    const { data, error } = await addMessage(body)

    if (error)
      setError({
        message: 'Something went wrong, try again ...',
        variant: 'danger',
      })

    if (data) setBody('')
  }

  return (
    <div className={`${styles.chatMessage} clearfix`}>
      {error && error.message && (
        <Alert variant={error.variant}>{error.message}</Alert>
      )}
      <form onSubmit={onSubmit}>
        <div className="input-group mb-0">
          <input
            type="text"
            aria-label="body"
            aria-required="true"
            name="body"
            className="form-control"
            placeholder="Enter text here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <Button type="submit" variant="primary">
            <div className="input-group-prepend">
              <FontAwesomeIcon icon={faPaperPlane} size="2x" />
            </div>
          </Button>
        </div>
      </form>
    </div>
  )
}

interface Props {
  addMessage: (body: string) => Promise<{ data: boolean; error: string }>
}

export default React.memo(ConversationForm)
