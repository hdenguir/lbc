import React, { FC, useEffect } from 'react'
import Image from 'next/image'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'

import { Conversation } from '../../types/conversation'
import { User } from '../../types/user'
import NewConversationForm from './NewConversationForm'
import { useAuth } from '../../hooks/useAuth'

import styles from '../../styles/Messages.module.css'
import firstAvatar from '../../assets/avatar1.png'

const ConversationsList: FC<Props> = ({
  conversations,
  users,
  currentConversationId,
  setCurrentConversationId,
  addConversation,
}) => {
  const { user: currentUser } = useAuth()

  const router = useRouter()

  useEffect(() => {
    if (!currentUser) router.push('/auth/login')
  }, [])

  const recipientIds = conversations.map((conv) => conv.recipientId)
  const senderIds = conversations.map((conv) => conv.senderId)

  const listUsers = users.filter(
    (user) =>
      !recipientIds.includes(user.id) &&
      !senderIds.includes(user.id) &&
      user.id !== currentUser.id
  )

  return (
    <div id="plist" className={styles.peopleList}>
      <ul className={`list-unstyled ${styles.chatListLi} mt-2 mb-0`}>
        {conversations.length > 0 &&
          conversations
            .sort((a, b) =>
              a.lastMessageTimestamp > b.lastMessageTimestamp ? -1 : 1
            )
            .map((conv) => {
              const date = new Date(conv.lastMessageTimestamp * 1000)
              const formatedDate = format(date, 'dd/MM/yy à HH:mm:ss')

              return (
                <li
                  key={conv.id}
                  className={`clearfix ${
                    currentConversationId == conv.id
                      ? styles.chatListActive
                      : ''
                  }`}
                  onClick={() => setCurrentConversationId(conv.id)}
                >
                  <div className={styles.chatListLiImg}>
                    <Image
                      src={firstAvatar}
                      alt={`${conv.recipientNickname} - ${conv.senderNickname}`}
                      layout="fill"
                      objectFit="cover"
                      width={40}
                      height={40}
                    />
                  </div>

                  <div className={styles.peopleListAbout}>
                    <div className={styles.peopleListName}>
                      {`${conv.recipientNickname} - ${conv.senderNickname}`}
                    </div>
                    <div className={styles.peopleListStatus}>
                      <FontAwesomeIcon icon={faCircle} className="offline" />{' '}
                      {formatedDate}
                    </div>
                  </div>
                </li>
              )
            })}

        <li className={`clearfix ${styles.chatListActive}  mt-2`}>
          <NewConversationForm
            addConversation={addConversation}
            users={listUsers}
          />
        </li>
      </ul>
    </div>
  )
}

interface Props {
  conversations: Array<Conversation>
  users: Array<User>
  currentConversationId: number
  setCurrentConversationId: (id: number) => void
  addConversation: (
    url: string,
    options: { body: string }
  ) => Promise<{ data: boolean; error: string }>
}

export default React.memo(ConversationsList)
