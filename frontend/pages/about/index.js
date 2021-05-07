import { _lang } from 'libs/rus'
import { useRouter } from 'next/router'

import styles from './about.module.sass'

export default function AboutPage({pageData}) {
	const { locale } = useRouter()

	return (
		<>
			<h1 className="mt-0">{_lang({ ru: "О нас", en: "About us"}, locale)}</h1>
			<div className="medium-text ml">{pageData.first.text}</div>
			{pageData.first.image && (<img className={styles.image} src={pageData.first.image.src} alt="Digital Events"/>)}

			<div className={styles.flex}>
				<div className="medium-text">{pageData.second.text}</div>
				{pageData.second.image && (<img className={styles.image} src={pageData.second.image.src} alt="Digital Events"/>)}
			</div>

			<div className="medium-text ml">{pageData.third.text}</div>
			{pageData.third.image && (<img className={styles.image} src={pageData.third.image.src} alt="Digital Events"/>)}
		</>
	)
}

import { getData } from 'server-side/get-static-data'

export async function getStaticProps({locale}){
	const pageData = await getData('about-page', locale)
	const { contacts } = await getData('contacts-page', locale)


	return { 
		props: { pageData, contacts },
		revalidate: 1
	}
}