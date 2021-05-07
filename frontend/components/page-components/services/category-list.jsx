import cn from 'classnames'
import { _lang } from 'libs/rus'
import { useRouter } from 'next/router'
import styles from './services.module.sass'
import Link from 'next/link'


export default function CategoryList ({services, activeCategory}){

	const { locale } = useRouter()

	if(!services) return null

	return (
		<ul className={styles.categories}>
			{services.map((item, index) => (
				<li key={index}>
					<Link href={'/services/'+item.url}>
						<a className={cn(activeCategory === item.url && styles.active)}>{_lang(item.title, locale)}</a>
					</Link>
				</li>
			))}
		</ul>
	)
}