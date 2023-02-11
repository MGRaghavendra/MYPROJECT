import { appConfig } from '@/appconfig'
import styles from './card.module.scss'
export default function Card({carddata}:any){
    return <div className={styles.card}>
        <img src={`${appConfig.bannerImgpath}/content/${carddata?.display?.imageUrl.split(',').join('/')}`} alt=""/>
    </div>
}