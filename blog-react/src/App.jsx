import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { useState, useEffect } from 'react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import styled from 'styled-components'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ThemedExample from './components/Chat'
const supabase = createClient('https://cyfpjgfjgocvjoqdblbp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5ZnBqZ2ZqZ29jdmpvcWRibGJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg0OTIzNTIsImV4cCI6MjAwNDA2ODM1Mn0.3hq1S-yAh1Uq2K5lBbYJSvvmvGlg8NHd0kq7P-rlwQs')

// create a styled component to make the items in in it display column
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 1rem;
`

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (
      <>
        <StyledDiv>
          <AccountCircleIcon sx={{ fontSize: 100 }} />
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={['google', 'github']}
          />
      </StyledDiv>
      </>
    )
  }
  else {
    return (
      <>
        <ThemedExample />
      </>
    )
  }
}