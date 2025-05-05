import { useState } from 'react'
import { MantineProvider, Container, TextInput, Button, Paper, Title, Text, Stack, Code, Group, createTheme } from '@mantine/core'
import { IconBrandAzure } from '@tabler/icons-react'
import './App.css'

const theme = createTheme({
  primaryColor: 'blue',
  colors: {
    dark: [
      '#C1C2C5',
      '#A6A7AB',
      '#909296',
      '#5C5F66',
      '#373A40',
      '#2C2E33',
      '#25262B',
      '#1A1B1E',
      '#141517',
      '#101113',
    ],
  },
  components: {
    Button: {
      defaultProps: {
        variant: 'filled',
        color: 'blue',
      },
      styles: {
        root: {
          backgroundColor: '#0066cc',
          '&:hover': {
            backgroundColor: '#0052a3',
          },
        },
      },
    },
    Paper: {
      defaultProps: {
        bg: 'dark.7',
      },
    },
    TextInput: {
      defaultProps: {
        variant: 'filled',
      },
      styles: {
        input: {
          backgroundColor: '#1A1B1E',
          borderColor: '#373A40',
          '&:focus': {
            borderColor: '#0066cc',
          },
        },
      },
    },
  },
})

function App() {
  const [clientId, setClientId] = useState('')
  const [tenantId, setTenantId] = useState('')
  const [redirectUri, setRedirectUri] = useState(window.location.origin)
  const [authUrl, setAuthUrl] = useState('')

  const generateAuthUrl = (flow: 'implicit' | 'code' | 'device') => {
    const baseUrl = `https://login.microsoftonline.com/${tenantId || 'common'}/oauth2/v2.0`
    const params = new URLSearchParams({
      client_id: clientId,
      response_type: flow === 'implicit' ? 'token' : flow === 'code' ? 'code' : 'device_code',
      redirect_uri: redirectUri,
      scope: 'openid profile email',
      response_mode: flow === 'implicit' ? 'fragment' : 'query',
    })

    if (flow === 'device') {
      setAuthUrl(`${baseUrl}/devicecode?${params.toString()}`)
    } else {
      setAuthUrl(`${baseUrl}/authorize?${params.toString()}`)
    }
  }

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Container size="md" py="xl">
        <Paper shadow="sm" p="xl" withBorder radius="md">
          <Group mb="xl">
            <IconBrandAzure size={32} color="#0066cc" />
            <Title order={1} style={{ color: '#ffffff' }}>Microsoft Entra ID OAuth Playground</Title>
          </Group>

          <Stack gap="lg">
            <TextInput
              label="Client ID"
              placeholder="Enter your application (client) ID"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              size="md"
            />
            <TextInput
              label="Tenant ID"
              placeholder="Enter your tenant ID (or leave empty for common)"
              value={tenantId}
              onChange={(e) => setTenantId(e.target.value)}
              size="md"
            />
            <TextInput
              label="Redirect URI"
              placeholder="Enter your redirect URI"
              value={redirectUri}
              onChange={(e) => setRedirectUri(e.target.value)}
              size="md"
            />

            <Title order={3} mt="xl" style={{ color: '#ffffff' }}>Authentication Flows</Title>
            
            <Group>
              <Button onClick={() => generateAuthUrl('implicit')} size="md">
                Implicit Flow
              </Button>
              <Button onClick={() => generateAuthUrl('code')} size="md">
                Authorization Code Flow
              </Button>
              <Button onClick={() => generateAuthUrl('device')} size="md">
                Device Code Flow
              </Button>
            </Group>

            {authUrl && (
              <Paper withBorder p="md" mt="md" bg="dark.8">
                <Text size="sm" fw={500} mb="xs" style={{ color: '#ffffff' }}>Generated Authentication URL:</Text>
                <Code block style={{ backgroundColor: '#1A1B1E', color: '#ffffff' }}>{authUrl}</Code>
                <Button
                  component="a"
                  href={authUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  mt="md"
                  size="md"
                >
                  Open in New Tab
                </Button>
              </Paper>
            )}
          </Stack>
        </Paper>
      </Container>
    </MantineProvider>
  )
}

export default App
