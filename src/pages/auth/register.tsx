import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { Container, Row, Col } from 'react-bootstrap'
import RegisterForm from '../../components/auth/RegisterForm'

const Register: NextPage<Props> = () => {
  return (
    <Container>
      <Head>
        <title>Register - Leboncoin</title>
        <meta name="description" content="Register leboncoin.fr"></meta>
      </Head>
      <Row className="justify-content-md-center">
        <Col lg={6}>
          <RegisterForm />
        </Col>
      </Row>
    </Container>
  )
}

interface Props {}

export default Register
