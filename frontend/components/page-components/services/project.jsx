import styles from './services.module.sass'
import { _lang } from 'libs/rus'
import { useRouter } from 'next/router'

import Service from './service'
import Media from './media'

export default function Project ({project}){
	const { locale } = useRouter()

	if(!project) return <div></div>

	return (
		<>
			{ project.services && project.services.map((item, index) => <Service service={item} key={index}/> )}
			{ project.cases && (
				<>
					<h2>{_lang({ru: "Реализованные проекты", en: "Сompleted projects"}, locale)}</h2>
					<div className={styles.gallery}>
						{project.cases.map((item, index) => <Media item={item} key={index}/>)}
					</div>
				</>
			)}
		</>
	)
}