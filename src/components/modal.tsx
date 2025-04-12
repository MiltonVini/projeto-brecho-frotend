    import { CheckCircle } from '@phosphor-icons/react'
    import styles from './styles/modal.module.css'

    interface ModalProps {
    isOpen: boolean
    message: string
    }

    export function Modal({ isOpen, message}: ModalProps) {
    if (!isOpen) return null

    return (
        <div className={styles.wrapper}>
        <div className={styles.card}>
            <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Sucesso!</h2>
            <p className="text-gray-600 mb-4">{message}</p>
        </div>
        </div>
    )
    }
