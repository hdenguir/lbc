import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { Container, Row, Col } from 'react-bootstrap'
import AuthForm from '../../components/auth/AuthForm'

const Login: NextPage<Props> = () => {
  return (
    <Container>
      <Head>
        <title>Login - Leboncoin</title>
        <meta name="description" content="Login - leboncoin.fr"></meta>
      </Head>
      <Row className="justify-content-md-center">
        <Col lg={6}>
          <AuthForm />
        </Col>
      </Row>
    </Container>
  )
}

interface Props {}

export default Login
