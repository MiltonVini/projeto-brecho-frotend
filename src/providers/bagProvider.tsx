import { ReactNode, useCallback, useEffect, useState } from "react";
import { BagContext } from "../contexts/bagContext";
import { api } from "../lib/axios";
import { useForm } from "react-hook-form";

interface BagProviderProps {
  children: ReactNode
}

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

export interface GetProductDetails {
		id: string
		description: string
		price: number
		cost: number
		stock: number
		stock_type: string
		is_sold: boolean
		created_at: Date
		updated_at: Date
}

export interface GetBagsParams {
  is_delivered?: boolean | null
}

export interface IProductProps {
  id: string
  description: string
  price: number
  cost: number
  stock: number
  stock_type: string
  is_sold: boolean
  created_at: Date
  updated_at: Date
}

export interface ISalesProps {
  id: string
  sale_id: bigint
  transaction_date: Date
  client_id: string
  bag_id: string
  product: IProductProps
}

export interface IClientFormInput {
  name: string
  instagram_user: string
  email: string
}

export interface IClientProps {
  id: string
  name: string
  instagram_name: string
  email: string
}

export interface IClientActiveBagProps {
  id: string,
	client_id: string,
	created_at: Date,
	is_delivered: boolean,
	delivered_at: Date
}

export interface IInsertSalesFormInput {
  client_id: string
  product_id: string[]
  bag_id: string
}

export type StockType = "single" | "multiple"


export interface ICreateProductFormInput {
  description: string
  price: number
  cost: number
  stock_type: StockType
}

export function BagProvider({ children }: BagProviderProps) {
  const [bags, setBags] = useState<BagsProps[] | null>([])
  const [bagDetails, setBagDetails] = useState<BagsDetailsProps | null>(null)
  const [filters, setFilters] = useState<GetBagsParams>({})
  const [client, setClient] = useState<ClientProps | null>(null)
  const [productDetails, setProductsDetails] = useState<GetProductDetails | null>(null)
  const [bagSales, setBagSales] = useState<ISalesProps[] | null>([])
  const [clients, setClients] = useState<IClientProps[]>([])
  const [products, setProducts] = useState<IProductProps[]>([])
  const [clientActiveBag, setClientActiveBag] = useState<IClientActiveBagProps | null>(null)
  const [shouldRefreshBags, setShouldRefreshBags] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")



  const { reset } = useForm()

  const fetchAllBags = useCallback(async (params?: GetBagsParams) => {
    setIsLoading(true)

    try {
        const response = await api.get('/bags', {
          params: params
        })
        setBags(response.data)
    } catch (error) {
        console.error(error)
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 3000)
    }
  },[])

  const fecthBagDetails = useCallback(async (bagId: string) => {
    try {
      const response = await api.get(`/bags/${bagId}`)

      setBagDetails(response.data)
    } catch (error) {
      console.error(error)
    }
  },[])

  const fecthClientInfo = useCallback(async (id: string) => {
    try {
      const response = await api.get(`/clients/${id}`)
      setClient(response.data)
    } catch (error) {
      console.error(error)
    }
  }, [])

  const fetchProductDetails = useCallback(async (id: string) => {
    try {
      const response = await api.get(`/products/${id}`)
      setProductsDetails(response.data)
    } catch (error) {
      console.error(error)
    }
  }, [])

  const fecthSalesByBag = useCallback(async (id: string) => {
    try {
      const response = await api.get(`/sales/${id}`)
      setBagSales(response.data)
    } catch (error) {
      console.error(error)
    }
  }, [])

  const onRegisterClientFormSubmit = async (data: IClientFormInput) => {
    const response = await api.post('/clients', {
      name: data.name,
      instagram_name: data.instagram_user,
      email: data.email
    })

    reset()

    console.log(response)
  }

  const fetchAllClients = useCallback(async () => {
    const response = await api.get('/clients')

    console.log(response)

    setClients(response.data)
  },[])

  const fetchAllProducts = useCallback(async () => {
    const response = await api.get('/products')

    setProducts(response.data)
  }, [])

  const fetchClientActiveBag = useCallback(async (clientId: string) => {
    const response = await api.get(`clients/${clientId}/active-bag`)

    console.log(response)

    setClientActiveBag(response.data)
  }, [])

  const insertSalesFormSubmit = async (data: IInsertSalesFormInput) => {
    const response = await api.post('/sales', {
        bag_id: data.bag_id,
        product_list: data.product_id,
        client_id: data.client_id,
    })

    setShouldRefreshBags(true)

    console.log(response)
  }

  const onCreateProductFormSubmit = async (data: ICreateProductFormInput) => {
    const response = await api.post('/products', {
      description: data.description,
      price: data.price,
      cost: data.cost,
      stock_type: data.stock_type
    })

    console.log(response)
  }

  const updateDeliveredBag = async (bagId: string) => {
    try {
      const response = await api.patch(`/bags/${bagId}`)
      await fecthBagDetails(bagId)
  
      setShouldRefreshBags(true)
  
      setShowToast(true)
  
      console.log(response)
    } catch (error) {
      console.error(error)
    } finally {
      setTimeout(() => {
        setShowToast(false)
      }, 3000)
    }
  }

  const handleCreateBag = async (clientId: string) => {
    const response = await api.post('/bags', {
        client_id: clientId
    })

    setShouldRefreshBags(true)

    console.log(response)

    await fetchClientActiveBag(clientId)
}

  useEffect(() => {
    fetchAllBags(filters)
  }, [filters, fetchAllBags])

  return (
    <BagContext.Provider value={
            { 
                bags,
                setFilters,
                filters,
                fecthBagDetails,
                bagDetails,
                fecthClientInfo,
                client,
                setBagDetails,
                setClient,
                fetchProductDetails,
                productDetails,
                fecthSalesByBag,
                bagSales,
                onRegisterClientFormSubmit,
                fetchAllClients,
                clients,
                fetchAllProducts,
                products,
                fetchClientActiveBag,
                clientActiveBag,
                insertSalesFormSubmit,
                onCreateProductFormSubmit,
                updateDeliveredBag,
                shouldRefreshBags, 
                setShouldRefreshBags,
                fetchAllBags,
                handleCreateBag,
                showToast,
                isLoading,
                searchTerm,
                setSearchTerm

            }
        }>
      {children}
    </BagContext.Provider>
  );
}
