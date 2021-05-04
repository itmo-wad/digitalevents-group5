import cn from 'classnames'
import styles from './services.module.sass'
import Link from 'next/link'

export default function CategoryList ({services, activeCategory}){

	if(!services) return null

	return (
		<ul className={styles.categories}>
			{services.map((item, index) => (
				<li key={index}>
					<Link href={'/services/'+item.url}>
						<a className={cn(activeCategory === item.url && styles.active)}>{item.title.ru}</a>
					</Link>
				</li>
			))}
		</ul>
	)
}