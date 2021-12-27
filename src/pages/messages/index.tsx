import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { Col, Container, Row } from 'react-bootstrap'

import ConversationsList from '../../components/Conversations/ConversationsList'
import ConversationHeader from '../../components/Conversations/ConversationHeader'
import ConversationHistory from '../../components/Conversations/ConversationHistory'
import ConversationForm from '../../components/Conversations/ConversationForm'
import { useAuth } from '../../hooks/useAuth'
import { useRouter } from 'next/router'
import { fetcher } from '../../actions'

import styles from '../../styles/Messages.module.css'
import { Conversation } from '../../types/conversation'
import { User } from '../../types/user'
import { Message } from '../../types/message'

const Messages: NextPage<Props> = () => {
  const { user } = useAuth()
  const router = useRouter()

  const [conversations, setConversations] = useState<Conversation[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [currentConversationId, setCurrentConversationId] =
    useState<number>(null)
  const [currentConversation, setCurrentConversation] =
    useState<Message[]>(null)

  useEffect(() => {
    if (!user) router.push('auth/login')

    async function fetchConversations() {
      const { data: dataConversations } = await fetcher(
        `/conversations/${user.id}`,
        { method: 'GET' }
      )

      if (dataConversations) setConversations(dataConversations)
    }

    if (user?.id) fetchConversations()

    async function fetchUsers() {
      const { data: dataUsers } = await fetcher(`/users`, { method: 'GET' })

      if (dataUsers) setUsers(dataUsers)
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    if (!user?.id) return

    async function fetchMessages() {
      const { data } = await fetcher(`/messages/${currentConversationId}`, {
        method: 'GET',
      })

      if (data) setCurrentConversation(data)
    }
    if (currentConversationId) {
      fetchMessages()
    }
  }, [currentConversationId])

  const addMessage = async (
    body: string
  ): Promise<{ data: boolean; error: string }> => {
    const { data, error } = await fetcher('/messages', {
      body: JSON.stringify({
        body,
        timestamp: new Date().getTime(),
        conversationId: currentConversationId,
        authorId: user.id,
      }),
    })

    if (data && data?.id) {
      setCurrentConversation([...currentConversation, data])
    }

    return { data, error }
  }

  const addConversation = async (
    url: string,
    options: { body: string }
  ): Promise<{ data: boolean; error: string }> => {
    const { data, error } = await fetcher(url, options)

    if (!error && data) {
      const { data: dataConversations } = await fetcher(
        `/conversations/${user.id}`,
        { method: 'GET' }
      )
      if (dataConversations) setConversations(dataConversations)
    }

    return { data, error }
  }

  return (
    <Container>
      <Head>
        <title>Message - Leboncoin</title>
        <meta name="description" content="Message leboncoin.fr"></meta>
      </Head>
      <Row>
        <Col lg={12}>
          <div className={(styles.card, styles.chatApp)}>
            <ConversationsList
              conversations={conversations}
              users={users}
              setCurrentConversationId={setCurrentConversationId}
              currentConversationId={currentConversationId}
              addConversation={addConversation}
            />

            <div className={styles.chat}>
              {currentConversation && (
                <>
                  <ConversationHeader
                    currentConversation={
                      currentConversationId
                        ? conversations.find(
                            (c) => c.id === currentConversationId
                          )
                        : null
                    }
                  />
                  <ConversationHistory
                    currentConversation={currentConversation}
                    users={users}
                  />
                  <ConversationForm addMessage={addMessage} />
                </>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

interface Props {}

export default Messages
