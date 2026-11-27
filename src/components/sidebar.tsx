import { Link } from 'react-router-dom'
import styles from './styles/sidebar.module.css'
import { Bag, Tag, User, ShoppingCart, TShirt, X } from '@phosphor-icons/react'

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    return (
        <aside id="sidebar" className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
            <div className="flex items-center justify-between">
                <h2>Projeto Brechó</h2>
                <button
                    type="button"
                    aria-label="Fechar menu"
                    onClick={onClose}
                    className="p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:hidden"
                >
                    <X size={22} />
                </button>
            </div>
            <hr />
            <ul>
                <li>
                    <Link to="/bags" className={styles.linkItem} onClick={onClose}>
                        <Bag size={22} /> Sacolinhas
                    </Link>
                </li>
                <li>
                    <Link to="/sales" className={styles.linkItem} onClick={onClose}>
                        <Tag size={22} /> Vendas
                    </Link>
                </li>
                <li>
                    <Link to="" className={styles.linkItem} onClick={onClose}>
                        <ShoppingCart  size={22} /> Cadastrar Sacolinha
                    </Link>
                </li>
                <li>
                    <Link to="/products" className={styles.linkItem} onClick={onClose}>
                        <TShirt size={22} /> Cadastrar Produto
                    </Link>
                </li>
                <li>
                    <Link to="/clients" className={styles.linkItem} onClick={onClose}>
                        <User size={22} /> Cadastrar Cliente
                    </Link>
                </li>
            </ul>
        </aside>
    )
}
