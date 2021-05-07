import { useState } from 'react'
import { useRouter } from 'next/router'
import { _lang } from 'libs/rus'
import cn from 'classnames'

import styles from './categories.module.sass'

import Link from 'next/link'

export default function Categories ({services}){

	const [ openedCategory, setOpenedCategory ] = useState(-1)

	const openCategory = (index) => {
		if(openedCategory === index)
			setOpenedCategory(-1)
		else
			setOpenedCategory(index)
	}

	const { locale } = useRouter()

	return (
		<div className={styles.container}>
			<h2>{_lang({ ru: "Мы разрабатываем", en: "We develop"}, locale)}</h2>
			<ul className={cn(styles.services, "ml")}>
				{services && services.map((item, index) => (
					<li key={index}>
						<button className="a" onClick={() => openCategory(index)}>{_lang(item.title, locale)}</button>
							{openedCategory === index && item.projects && (
							<div className={styles.linkList}>
								{item.projects.map((project, index) => (
									<Link href={'/services/'+item.url+'/'+project.url} key={index}>
										<a className="a">
											{_lang(project.title, locale)}
											<img src="/images/up-arrow.svg" alt="Стрелка"/>
										</a>							
									</Link>
								))}
							</div>
							)}
					</li>
				))}
			</ul>
		</div>
	)
}