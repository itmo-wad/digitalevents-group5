import styles from './video.module.sass'

export default function Video (){

	return (
		<video 
			className={styles.video} 
			src="/images/video.mp4" 
			loop={true} 
			alt="Промо-видео" 
			autoPlay={true} 
			muted={true} 
			playsInline={true}
			poster="/images/poster.jpg"
		/>
	)
}