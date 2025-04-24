import React, { createContext } from "react";
import { GetProductDetails } from "../providers/bagProvider";

export interface ClientProps {
    id: string
    name: string
    instagram_name: string
    email: string
}

export interface BagProductsProps {
  id: string
  bag_id: string
  product_id: string
}

export interface BagsProps {
  id: string
  created_at: Date
  is_delivered: boolean
  delivered_at: Date | null
  client: ClientProps
}

export interface BagsDetailsProps {
  id: string
  client_id: string
  created_at: Date
  is_delivered: boolean
  delivered_at: Date | null
  total_amount: number
  bagProducts: BagProductsProps[]
}

interface IProductProps {
    id: string
    description: string
    price: number
    cost: number
    is_sold: boolean
  }

interface ISalesProps {
    id: string
    sale_id: bigint
    transaction_date: Date
    client_id: string
    bag_id: string
    product: IProductProps
  }

  
interface IClientFormInput {
  name: string
  instagram_user: string
  email: string
}

interface IClientProps {
  id: string
  name: string
  instagram_name: string
  email: string
}

interface IClientActiveBagProps {
  id: string,
	client_id: string,
	created_at: Date,
	is_delivered: boolean,
	delivered_at: Date
}

interface IInsertSalesFormInput {
  client_id: string
  product_id: string[]
  bag_id: string
}

type StockType = "single" | "multiple"


interface ICreateProductFormInput {
  description: string
  price: number
  cost: number
  stock_type: StockType
}

export interface GetBagsParams {
  is_delivered?: boolean | null
}



interface BagContextType {
    bags: BagsProps[] | null
    setFilters: React.Dispatch<React.SetStateAction<GetBagsParams>>
    filters: GetBagsParams,
    fecthBagDetails: (bagId: string) => void
    bagDetails: BagsDetailsProps | null
    fecthClientInfo: (id: string) => void
    client: ClientProps | null
    setBagDetails: React.Dispatch<React.SetStateAction<BagsDetailsProps | null>>
    setClient: React.Dispatch<React.SetStateAction<ClientProps | null>>
    fetchProductDetails: (id: string) => void
    productDetails: GetProductDetails | null
    fecthSalesByBag: (id: string) => void
    bagSales: ISalesProps[] | null
    onRegisterClientFormSubmit: (data: IClientFormInput ) => void
    fetchAllClients: () => void
    clients: IClientProps[]
    fetchAllProducts: () => void
    products: IProductProps[]
    fetchClientActiveBag: (clientId: string) => void
    clientActiveBag: IClientActiveBagProps | null
    insertSalesFormSubmit: (data: IInsertSalesFormInput) => void
    onCreateProductFormSubmit: (data: ICreateProductFormInput) => void
    updateDeliveredBag: (bagId: string) => void
    shouldRefreshBags: boolean
    setShouldRefreshBags: React.Dispatch<React.SetStateAction<boolean>>
    fetchAllBags: (data?: GetBagsParams) => void
    handleCreateBag: (clientId: string) => void
    showToast: boolean
    isLoading: boolean
    searchTerm: string
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

export const BagContext = createContext({} as BagContextType)