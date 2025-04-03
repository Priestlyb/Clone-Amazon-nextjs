import { Provider } from 'react-redux'
import { store } from '../app/store'
import '../app/globals.css'
import { useState, useEffect } from 'react'

const MyApp = ({ Component, pageProps }) => {

  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <h1>{isClient ? 'This is never prerendered' : 'Prerendered'}</h1>
    </Provider>
  )
}

export default MyApp
