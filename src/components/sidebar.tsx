import { Link } from 'react-router-dom'
import styles from './styles/sidebar.module.css'

export function Sidebar() {
    
    return (
        <div className={styles.sidebar}>
            <h2>Projeto Brechó</h2>

            <hr/>

            <ul>
                <li><Link to="/">Sacolinhas</Link></li>
                <li><Link to="/sales">Vendas</Link></li>
                <li><Link to="">Cadastrar Sacolinha</Link></li>
                <li><Link to="/products">Cadastrar Produto</Link></li>
                <li><Link to="/clients">Cadastrar Cliente</Link></li>
            </ul>
        </div>
    )
}