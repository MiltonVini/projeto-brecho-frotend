import styles from './styles/loadindModal.module.css'

export function LoadingModal() {
    return (
        <div className={styles.container}>
            <div className={styles.loading}></div>
        </div>
    )
}