import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from 'src/features/notifications'
import { FC } from 'react'
import { Contacts } from 'src/widgets'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorView } from 'src/shared/ui'

const queryClient = new QueryClient()

export const App: FC = () => {
  return (
    <ErrorBoundary fallbackRender={({ error }) => <ErrorView err={error} />}>
      <QueryClientProvider client={queryClient}>
        <NotificationContextProvider>
          <>
            <Contacts />
          </>
        </NotificationContextProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}