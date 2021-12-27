import React, { FC, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, Form, Alert } from 'react-bootstrap'
import { fetcher } from '../../actions'
import { IError } from '../../types/error'

const LoginForm: FC<Props> = () => {
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
        action: 'login',
      }),
    })

    if (error) {
      setError({
        message: 'The nickname or password is incorrect. Please retry...',
        variant: 'danger',
      })
      return
    }

    if (data && data.id) {
      setPassword('')
      setNickname('')
      localStorage.setItem('authUser', JSON.stringify(data))
      router.push('/messages')
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
        <Link href="/auth/register">
          <a>Register</a>
        </Link>
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  )
}

interface Props {}

export default LoginForm
