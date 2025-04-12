import { CheckCircle } from '@phosphor-icons/react'
import styles from './styles/toast.module.css'

interface ToastProps {
    isOpen: boolean
    message: string
    }

export function Toast({isOpen, message}: ToastProps) {
    if (!isOpen) return null

    return (
        <div className={`${styles.toast} ${isOpen ? styles.show : ''}`}>
            <CheckCircle size={26} className="text-green-500 mr-2" />
            {message}
        </div>
    )
}