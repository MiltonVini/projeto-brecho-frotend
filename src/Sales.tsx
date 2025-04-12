import { useForm } from "react-hook-form"
import { Sidebar } from "./components/sidebar"
import { UseBag } from "./hooks/bagHooks"
import { useEffect, useState } from "react"
import { SelectInput } from "./components/selectInput"
import { ProductCatalog } from "./components/productCatalog"
import { Modal } from "./components/modal"

interface IInsertSalesFormInput {
    client_id: string
    product_id: string[]
    bag_id: string
}

export function Sales() {
    const [showModal, setShowModal] = useState(false)
    const { handleSubmit, register, control, watch, setValue, reset } = useForm<IInsertSalesFormInput>()
    const { fetchAllClients, clients, fetchAllProducts, fetchClientActiveBag, clientActiveBag, insertSalesFormSubmit, handleCreateBag } = UseBag()
    const selectedClientId = watch("client_id")

    const clientOptions = clients.map((client) => ({
        value: client.id,
        label: client.instagram_name,
      }))

    const handleInsertSales = async (data: IInsertSalesFormInput) => {
        try {
            await insertSalesFormSubmit(data)
            setShowModal(true)
            reset()
        } catch (error) {
            console.error(error)
        } finally {
            setTimeout(() => {
                setShowModal(false)
            }, 3000)
        }
    }

    useEffect(() => {
        fetchAllClients()
        fetchAllProducts()
    }, [fetchAllClients, fetchAllProducts])

    useEffect(() => {
        if (selectedClientId) {
            setValue("bag_id", "")

            fetchClientActiveBag(selectedClientId)
        }
    }, [selectedClientId, fetchClientActiveBag, setValue])

    useEffect(() => {
        if (clientActiveBag) {
            setValue("bag_id", clientActiveBag.id)
        }
    }, [clientActiveBag, setValue])
    

    return (
        <div>
            <Sidebar/>
            <div className="ml-64 p-6 m2 w-5/6">
                <h3 className="text-2xl font-semibold mb-2">Inserir uma Venda</h3>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <form onSubmit={handleSubmit(handleInsertSales)}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Cliente
                        </label>

                        <SelectInput 
                            name="client_id"
                            control={control}
                            options={clientOptions}
                            placeholder="Selecione ou pesquise o cliente"
                        />

                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Produtos
                        </label>

                        <ProductCatalog 
                            name="product_id"
                            control={control}
                        />

                        {
                            selectedClientId && (
                                <div className="m-2">
                                <label htmlFor="bag_id" className="block text-sm font-medium text-gray-700 mb-1">
                                    Sacolinha
                                </label>
        
                                {
                                    clientActiveBag ? (
                                        <>
                                            <input
                                                type="hidden"
                                                id="bag_id"
                                                {...register("bag_id")}
                                            />
        
                                        <div className="border border-green-200 bg-green-50 p-4 rounded-md shadow-sm mb-4">
                                            <p className="text-sm text-green-800 font-medium">
                                                Este cliente já possui uma sacolinha ativa.
                                            </p>
                                        </div>
        
        
                                        </>
        
                                    ) : (
                                        <div className="border border-blue-200 bg-blue-50 p-4 rounded-md shadow-sm mb-4">
                                            <p className="text-sm text-blue-700 font-medium mb-1">
                                                Cliente não possui uma sacolinha ativa.
                                            </p>
                                            <p className="text-sm text-blue-600 mb-3">
                                                Clique no botão abaixo para criar uma nova sacolinha.
                                            </p>
                                            <button
                                                type="button"
                                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                                onClick={() => handleCreateBag(selectedClientId)}
                                            >
                                                Criar Sacolinha
                                            </button>
                                        </div>     
                                    )
                                }
                            </div>
                            )
                        }


                        <button 
                            type="submit"
                            className="m-2 bg-[#CFECF4] text-dark px-4 py-2 rounded-sm hover:bg-[#B0CDEE] transition-colors"
                        >
                            Inserir
                        </button>
                    </form>

                    <Modal 
                        isOpen={showModal}
                        message="Venda inserida com sucesso!"
                    />

                </div>

            </div>
        </div>
    )
}