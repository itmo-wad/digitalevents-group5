import cn from 'classnames'
import styles from './contacts.module.sass'

export default function Contact ({title, children}){
	return (
		<div className={cn(styles.contact, "ml")}>
			<div className={cn("medium-text", styles.title)}>{title}</div>
			<div className={styles.sub}>{children}</div>
		</div>
	)
}