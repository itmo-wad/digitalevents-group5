import cn from 'classnames'
import styles from './page.module.sass'

import Footer from './footer'
import Link from 'next/link'

export default function Page ({children, style, contacts}){


	return (
		<div className={cn(styles.content)} style={style}>
			<div className={styles.noise}>
				<Link href="/"><a>
					<img src="/images/full-logo.png" alt="Логотип DigitalEvents" className={styles.logo}/>
					</a></Link>
				{children}
			</div>
			{<Footer contacts={contacts}/>}
		</div>
	)
}