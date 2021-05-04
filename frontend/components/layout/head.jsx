import Head from 'next/head'

function Header({title}){

	return (
		<Head>
			<title>{title}</title>
			<link rel="preconnect" href="https://fonts.gstatic.com"/>
			<link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet"/>
		</Head>
	)
}

export default Header