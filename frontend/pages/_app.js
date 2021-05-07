import 'styles/globals.sass'

import Layout from 'components/layout'
import { ScrollProvider } from 'components/scroll'

function MyApp({ Component, pageProps }) {

	return (
		<ScrollProvider>
			<Layout contacts={pageProps.contacts}>
				<Component {...pageProps} />
			</Layout>
		</ScrollProvider>
	)
}

export default MyApp
