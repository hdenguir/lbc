import React, { FC, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, Form, Alert } from 'react-bootstrap'
import { fetcher } from '../../actions'
import { IError } from '../../types/error'

const RegisterForm: FC<Props> = () => {
  const [password, setPassword] = useState<string>('')
  const [nickname, setNickname] = useState<string>('')
  const [error, setError] = useState<IError>({
    message: '',
    variant: 'success',
  })

  const router = useRouter()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!nickname || !password) {
      setError({
        message: 'The nickname or password is incorrect. Please retry...',
        variant: 'danger',
      })
      return
    }

    const { data, error } = await fetcher('/users', {
      body: JSON.stringify({
        nickname,
        password,
        token: 'xxxx',
        action: 'register',
      }),
    })

    if (error) {
      setError({
        message: 'Something went wrong, try again ...',
        variant: 'danger',
      })
      return
    }

    if (data) {
      setPassword('')
      setNickname('')
      router.push('/auth/login')
      return
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      {error && error.message && (
        <Alert variant={error.variant}>{error.message}</Alert>
      )}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="nickname">Nickname</Form.Label>
        <Form.Control
          type="nickname"
          id="nickname"
          name="nickname"
          aria-label="nickname"
          aria-required="true"
          placeholder="Enter nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control
          type="password"
          id="password"
          name="password"
          aria-label="password"
          aria-required="true"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Link href="/auth/login">
          <a>Login</a>
        </Link>
      </Form.Group>
      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
  )
}

interface Props {}

export default RegisterForm
