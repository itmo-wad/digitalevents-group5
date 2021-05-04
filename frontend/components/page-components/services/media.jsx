import cn from 'classnames'
import styles from './services.module.sass'

export default function Media({item}){

	if(item.type === 0)							//Если это изображение - просто выводим его
		return <img src={item.src}/>

	return (
		<div></div>
	)
}
