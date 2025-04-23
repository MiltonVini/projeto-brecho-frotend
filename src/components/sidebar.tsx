import { Link } from 'react-router-dom'
import styles from './styles/sidebar.module.css'
import { Bag, Tag, User, ShoppingCart, TShirt } from '@phosphor-icons/react'

export function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <h2>Projeto Brechó</h2>
            <hr />
            <ul>
                <li>
                    <Link to="/" className={styles.linkItem}>
                        <Bag size={22} /> Sacolinhas
                    </Link>
                </li>
                <li>
                    <Link to="/sales" className={styles.linkItem}>
                        <Tag size={22} /> Vendas
                    </Link>
                </li>
                <li>
                    <Link to="" className={styles.linkItem}>
                        <ShoppingCart  size={22} /> Cadastrar Sacolinha
                    </Link>
                </li>
                <li>
                    <Link to="/products" className={styles.linkItem}>
                        <TShirt size={22} /> Cadastrar Produto
                    </Link>
                </li>
                <li>
                    <Link to="/clients" className={styles.linkItem}>
                        <User size={22} /> Cadastrar Cliente
                    </Link>
                </li>
            </ul>
        </div>
    )
}
