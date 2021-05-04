import styles from './about.module.sass'

export default function AboutPage({pageData}) {
	return (
		<>
			<h1 className="mt-0">О нас</h1>
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

export async function getStaticProps(){
	const pageData = await getData('about-page', 'ru')
	const { contacts } = await getData('contacts-page', 'ru')


	return { 
		props: { pageData, contacts },
		revalidate: 1
	}
}