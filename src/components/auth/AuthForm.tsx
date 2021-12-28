import React, { FC, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Button, Form, Alert } from 'react-bootstrap'
import { fetcher } from '../../actions'
import { IError } from '../../types/error'

const LoginForm: FC<Props> = () => {
  const [action, setAction] = useState<string>('login')
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const [nickname, setNickname] = useState<string>('')
  const [error, setError] = useState<IError>({
    message: '',
    variant: 'success',
  })

  useEffect(() => {
    setAction(!isLogin ? 'login' : 'register')
  }, [isLogin])

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
        action,
      }),
    })

    if (error) {
      setError({
        message: 'The nickname or password is incorrect. Please retry...',
        variant: 'danger',
      })
      return
    }

    if (data) {
      setPassword('')
      setNickname('')
      setAction('login')
      setIsLogin(false)

      if (action === 'login') {
        localStorage.setItem('authUser', JSON.stringify(data))
        router.push('/messages')
      } else {
      }
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
      <Button variant="info" type="submit" className="text-capitalize">
        {action}
      </Button>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <p>
          {!isLogin ? `Don't have an account ? ` : 'Already registred ? '}{' '}
          <Button
            as="a"
            onClick={() => setIsLogin(!isLogin)}
            variant="outline-secondary"
            size="sm"
          >
            {!isLogin ? `Register here` : 'Login'}
          </Button>
        </p>
      </Form.Group>
    </Form>
  )
}

interface Props {}

export default LoginForm
