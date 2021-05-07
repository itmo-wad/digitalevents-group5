import cn from 'classnames'
import { _lang } from 'libs/rus'
import { useRouter } from 'next/router'
import styles from './services.module.sass'
import Link from 'next/link'


export default function Category ({category, activeProject}){
	
	const { locale } = useRouter()

	if(!category) return <div></div>

	return (
		<>
			<div className="medium-text" style={{marginTop: "1em"}}>{_lang(category.text, locale)}</div>
			<ul className={styles.projects}>
			{category.projects && category.projects.map((item, index) => (
				<li key={index}>
					<Link href={'/services/'+category.url+'/'+item.url}>
						<a className={cn(activeProject === item.url && styles.active)}>{_lang(item.title, locale)}</a>
					</Link>
				</li>
			))}
			</ul>
		</>
	)
}