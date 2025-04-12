import { useParams } from "react-router-dom";
import { Sidebar } from "./components/sidebar";
import { UseBag } from "./hooks/bagHooks";
import { useEffect } from "react";
import { format } from "date-fns";
import { Toast } from "./components/toast";

export function BagDetails() {
    const { fecthBagDetails, bagDetails, fecthClientInfo, client, fecthSalesByBag, bagSales, updateDeliveredBag, showToast } = UseBag()

    const { id } = useParams<{id: string}>()

    useEffect(() => {
        if (id) {
            fecthBagDetails(id)
        }
    }, [id, fecthBagDetails])

    useEffect(() => {
        if (bagDetails) {
            fecthClientInfo(bagDetails.client_id)
        }
    }, [bagDetails, fecthClientInfo])

    useEffect(() => {
        if (bagDetails) {
            fecthSalesByBag(bagDetails.id)
        }
    }, [bagDetails, fecthSalesByBag])


    return (
        <div className="flex">
            <Sidebar />
            {bagDetails && (
                            <div className="ml-64 p-4 w-full">
                            <h3 className="text-2xl mb-2">{`Sacolinha ${client?.instagram_name}`}</h3>
            
                            <div className="w-5/6 p-4 border-2 border-gray-300 rounded rounded-sm">
                                <div className="flex flex-row gap-2 items-center">
                                    <p className="text-xl">Situação</p> 
                                    <span className={`px-4 py-2 text-white text-xl rounded-sm ${bagDetails?.is_delivered ? 'bg-[#84D19B]' : 'bg-[#D1CB84]'}`}>
                                        {bagDetails?.is_delivered ? 'Entregue' : 'Entrega a Combinar'}
                                    </span>
                                </div>
            
                                <div className="flex flex-row gap-12 mt-6 ml-12">
                                    <div className="flex flex-col items-center justify-center bg-white shadow-sm border border-gray-200 rounded-lg p-4 w-48 h-26">
                                        <p className="text-gray-600 text-sm">Total em Vendas</p>
                                        <p className="text-xl font-bold">R$ YY</p>
                                    </div>

                                    <div className="flex flex-col items-center justify-center bg-white shadow-sm border border-gray-200 rounded-lg p-4 w-48 h-26">
                                        <p className="text-gray-600 text-sm">Sacolinha Ativa desde</p>
                                        <p className="text-xl font-bold">{format(new Date(bagDetails.created_at), 'dd/MM/yyyy')}</p>
                                        <p className="text-sm text-gray-500">X Dias</p>
                                    </div>
            
                                    <div className="flex flex-col items-center ml-auto">
                                        <button
                                            className="p-1 bg-[#84D19B] hover:bg-[#6FBF87] w-[15rem] text-white font-semibold rounded-sm mb-2 cursor-pointer"
                                            onClick={() => id && updateDeliveredBag(id)}
                                        >
                                            Marcar como Entregue
                                        </button>

                                        <button className="p-1 bg-[#CFE0F4] w-[15rem] text-dark rounded-sm mb-2">Adicionar Venda</button>

                                        <button className="p-1 bg-[#CFE0F4] w-[15rem] text-dark rounded-sm mb-2">Inserir Rastreamento</button>
                                    </div>
                                </div>

                                <div>
                                    <p>Produtos</p>
                                    <div className="p-4 border border-gray-300 rounded-lg bg-white shadow-sm">
                                            <ul>

                                                {
                                                    bagSales?.map((sale) => (
                                                        <li 
                                                            key={sale.product.id}    
                                                            className="p-3 mb-2 border-2 border-gray-200 rounded-lg flex justify-between items-center bg-white shadow-sm"
                                                        >
                                                            <span className="text-dark font-medium">{sale.product.description}</span> 
                                                            <span className="text-dark font-bold">{`R$ ${sale.product.price}`}</span>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                    </div>
                                </div>

                                <Toast 
                                    isOpen={showToast}
                                    message="Sacolinha marcada como entregue com sucesso!"
                                />

                            </div>
                        </div>
            )}
        </div>
    )
}
