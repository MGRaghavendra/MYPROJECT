import styles from './sectionTitle.module.scss';

export const SectionTitle = (props:any):JSX.Element =>{
    const { sectionInfo } = props;
    const { name } = sectionInfo;
    return <h3 className={`${styles.title}`}>{name}</h3>
}