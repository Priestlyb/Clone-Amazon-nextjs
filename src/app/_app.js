import '../app/globals.css'

export default function MyApp  ({ Component, pageProps: { session, ...pageProps }  })  {

  return (
      <Component {...pageProps} />
  )
}


