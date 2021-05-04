import cn from 'classnames'
import styles from './services.module.sass'
import Link from 'next/link'


export default function Category ({category, activeProject}){
	if(!category) return <div></div>

	return (
		<>
			<div className="medium-text" style={{marginTop: "1em"}}>{category.text.ru}</div>
			<ul className={styles.projects}>
			{category.projects && category.projects.map((item, index) => (
				<li key={index}>
					<Link href={'/services/'+category.url+'/'+item.url}>
						<a className={cn(activeProject === item.url && styles.active)}>{item.title.ru}</a>
					</Link>
				</li>
			))}
			</ul>
		</>
	)
}