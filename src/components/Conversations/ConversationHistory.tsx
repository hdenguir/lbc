import React, { FC } from 'react'
import { format } from 'date-fns'
import { Message } from '../../types/message'
import AlwaysScrollToBottom from '../generics/AlwaysScrollToBottom'
import { useAuth } from '../../hooks/useAuth'

import styles from '../../styles/Messages.module.css'
import { User } from '../../types/user'

const ConversationHistory: FC<Props> = ({ currentConversation, users }) => {
  const { user } = useAuth()
  const listMessages = currentConversation.sort((a, b) =>
    a.timestamp > b.timestamp ? 1 : -1
  )
  const currentUser = user ? 1 : 0

  const isCurrentUser = (authorId: number) => authorId !== currentUser

  const userName = (authorId: number) =>
    users.find((user) => user.id === authorId).nickname

  return (
    <div className={styles.chatHistory}>
      <ul className="m-b-0 messages-list">
        {listMessages.map((message) => {
          const date = new Date(message.timestamp)
          const formatedDate = format(date, `dd/MM/yy - HH:mm:ss aaaaa'm'`)
          return (
            <li className="clearfix">
              <div
                className={`${styles.messageData} ${
                  isCurrentUser(message.authorId) ? '' : styles.textRight
                }`}
              >
                <span className={styles.messageDataTime}>
                  <strong>{userName(message.authorId)}</strong>,{' '}
                  <small className={styles.fontItalic}>{formatedDate}</small>
                </span>
              </div>
              <div
                className={`${styles.message} ${
                  isCurrentUser(message.authorId)
                    ? styles.myMessage
                    : styles.otherMessage
                } ${isCurrentUser(message.authorId) ? '' : styles.floatRight}`}
              >
                {message.body}
              </div>
            </li>
          )
        })}
        <AlwaysScrollToBottom />
      </ul>
    </div>
  )
}

interface Props {
  currentConversation: Array<Message>
  users: Array<User>
}

export default React.memo(ConversationHistory)
