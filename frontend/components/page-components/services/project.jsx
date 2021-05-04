import cn from 'classnames'
import styles from './services.module.sass'

import Service from './service'
import Media from './media'

export default function Project ({project}){
	if(!project) return <div></div>

	return (
		<>
			{ project.services && project.services.map((item, index) => <Service service={item} key={index}/> )}
			{ project.cases && (
				<>
					<h2>Реализованные проекты</h2>
					<div className={styles.gallery}>
						{project.cases.map((item, index) => <Media item={item} key={index}/>)}
					</div>
				</>
			)}
		</>
	)
}