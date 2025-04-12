import { useState } from "react"
import { UseBag } from "../hooks/bagHooks"
import styles from './styles/productCatalog.module.css'
import { MagnifyingGlass } from "@phosphor-icons/react"
import { Control, Controller } from "react-hook-form"

interface ProductCatalogProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>
    name: string
}

export function ProductCatalog({control, name} : ProductCatalogProps) {
    const [searchTerm, setSearchTerm] = useState("")

    const { products } = UseBag()

    const filteredProducts = products
  .filter(product =>
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
    return (
        <Controller 
            control={control}
            name={name}
            render={({ field }) => {
                const { value = [], onChange } = field

                const toggleProduct = (productId: string) => {
                    if (value.includes(productId)) {
                        onChange(value.filter((id: string) => id !== productId))
                    } else {
                        onChange([...value, productId])
                    }
                }

                return (
                    <div className="m-2">
                        <div className={styles.searchWrapper}>
                            <MagnifyingGlass size={32} color="#1c1c1c" className={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder="Buscar produto..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={styles.searchBar}
                            />
                        </div>


                        <div className={styles.catalog}>
                        <div className={`${styles.row} ${styles.header}`}>
                            <span className={styles.checkbox}></span>
                            <span>Produto</span>
                            <span>Código</span>
                            <span>Preço</span>
                            <span>Status</span>
                        </div>

                        {filteredProducts.map((product) => (
                            <div
                            key={product.id}
                            className={styles.row}
                            >
                            <div className={styles.checkbox}>
                                <input
                                    type="checkbox"
                                    checked={value.includes(product.id)}
                                    onChange={() => toggleProduct(product.id)}
                                />
                            </div>
                            <span>{product.description}</span>
                            <span>{product.id ?? "-"}</span>
                            <span>{product.price ? `R$ ${product.price}` : "-"}</span>
                            <span 
                                className={`${styles.statusBadge} ${product.is_sold ? styles.sold : styles.available}`}
                            >
                                {product.is_sold ? 'Vendido' : 'Disponível'}
                            </span>
                            </div>
                        ))}
                        </div>


                    </div>
                )
            }}
        
        
        />
    )
}