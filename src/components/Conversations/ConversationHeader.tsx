import React, { FC } from 'react'
import Image from 'next/image'
import { Col, Row } from 'react-bootstrap'
import styles from '../../styles/Messages.module.css'
import secondAvatar from '../../assets/avatar2.png'

const ConversationHeader: FC<Props> = ({ currentConversation }) => {
  const conversationTitle = currentConversation
    ? `${currentConversation.recipientNickname} - ${currentConversation.senderNickname}`
    : null
  return (
    <div className={`${styles.chatHeader} clearfix`}>
      <Row>
        <Col lg={6} className={styles.chatHeaderTitle}>
          <div className={styles.chatHeaderImg}>
            <Image
              src={secondAvatar}
              alt={conversationTitle}
              layout="fill"
              objectFit="cover"
              width={40}
              height={40}
            />
          </div>

          <div className={styles.chatAbout}>
            <h6 className="mb-0">{conversationTitle}</h6>
          </div>
        </Col>
      </Row>
    </div>
  )
}

interface Props {
  currentConversation: any
}

export default ConversationHeader
