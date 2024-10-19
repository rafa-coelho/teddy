import { ToastProvider } from './components/toast/toast.context'
import Welcome from './components/welcome/welcome.component'

function App () {
  return (
    <>
      <ToastProvider >
        <Welcome />
      </ToastProvider>
    </>
  )
}

export default App
