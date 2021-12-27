import React, { useEffect } from 'react'
import type { FC } from 'react'
import {
  Navbar as MainNavbar,
  Nav,
  Container,
  NavDropdown,
} from 'react-bootstrap'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuth } from '../../hooks/useAuth'
import styles from '../../styles/Messages.module.css'

const Navbar: FC = () => {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) router.push('/auth/login')
  }, [user])

  const logout = (): void => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('authUser')
    }
    router.push('/auth/login')
  }

  return (
    <MainNavbar bg="dark" variant="dark" className="mb-5">
      <Container>
        <MainNavbar.Brand>
          <Link href="/">
            <a className={styles.navLink}>LeBonCoin</a>
          </Link>
        </MainNavbar.Brand>
        <Nav className="justify-content-end">
          <Link href="/messages">
            <a className="nav-link">Messages</a>
          </Link>
          {user?.nickname ? (
            <NavDropdown title={user.nickname} id="navbarScrollingDropdown">
              <NavDropdown.ItemText onClick={() => logout()}>
                Logout
              </NavDropdown.ItemText>
            </NavDropdown>
          ) : (
            <Link href="/signin">
              <a className="nav-link">Se Connecter</a>
            </Link>
          )}
        </Nav>
      </Container>
    </MainNavbar>
  )
}

export { Navbar }
