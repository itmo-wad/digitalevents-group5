import 'styles/globals.sass'

import Layout from 'components/layout'

function MyApp({ Component, pageProps }) {

  return (
    <Layout contacts={pageProps.contacts}>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
