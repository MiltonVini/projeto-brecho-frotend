import { useParams } from "react-router-dom";
import { Sidebar } from "./components/sidebar";
import { UseBag } from "./hooks/bagHooks";
import { useEffect } from "react";
import { format } from "date-fns";
import { Toast } from "./components/toast";
import { useEmail } from "./hooks/emailHooks";
import { Label } from "./components/label";
import { TShirt } from "@phosphor-icons/react";

export function BagDetails() {
    const { fecthBagDetails, bagDetails, fecthClientInfo, client, fecthSalesByBag, bagSales, updateDeliveredBag, showToast } = UseBag()
    const { handleEmailSubmit, emailMessage, setShowTrackingInput, showTrackingInput, setTrackingCode, trackingCode, showToastTrackingCode } = useEmail()

    const { id } = useParams<{id: string}>()
    const clientInstagramName = client ? client.instagram_name : '' 
    const message = emailMessage(clientInstagramName, trackingCode)

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
                                    <span className={`px-4 py-2 font-semibold text-xl rounded-xl ${bagDetails?.is_delivered ? 'bg-[#DFF3E7] text-green-800 border-[#84D19B]' : 'bg-[#FDFCD4] text-yellow-800 border-[#F4F493]'}`}>
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
                                            className="m-1 w-[15rem] bg-[#84D19B] hover:bg-[#6FBF87] text-white text-sm font-medium 
                                                px-5 py-2 rounded-md shadow-sm transition-all duration-200
                                                hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#B0D0EF]"
                                            onClick={() => id && updateDeliveredBag(id)}
                                        >
                                            Marcar como Entregue
                                        </button>

                                        <button 
                                            className="m-1 w-[15rem] bg-[#CFE0F4] hover:bg-[#B0D0EF] text-gray-800 text-sm font-medium 
                                                px-5 py-2 rounded-md shadow-sm transition-all duration-200
                                                hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#B0D0EF]"
                                        >
                                            Adicionar Venda
                                        </button>

                                        <button 
                                                className="m-1 w-[15rem] bg-[#CFE0F4] hover:bg-[#B0D0EF] text-gray-800 text-sm font-medium 
                                                px-5 py-2 rounded-md shadow-sm transition-all duration-200
                                                hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#B0D0EF]"
                                 onClick={() => setShowTrackingInput(!showTrackingInput)}
                                        >
                                                Inserir Rastreamento
                                        </button>

                                        {
                                            showTrackingInput && (
                                                <div className="mt-4 p-4 border border-gray-300 rounded-lg shadow-sm bg-white w-full max-w-md">
                                                    <Label 
                                                        text="Código de Rastreio"
                                                        inputName="tracking_code"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={trackingCode}
                                                        onChange={(e) => setTrackingCode(e.target.value)}
                                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#84D19B] focus:border-[#84D19B] sm:text-sm"
                                                        placeholder="EX: NX123456789BR"       
                                                    >
                                                    </input>
                                                    <button
                                                        onClick={() => client && handleEmailSubmit({to: client.email, message: message})}
                                                        className="mt-4 w-full bg-[#84D19B] hover:bg-[#6FBF87] text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
                                                    >
                                                        Enviar Rastreio
                                                    </button>
                                                </div>
                                            )
                                        }

                                    </div>
                                </div>

                                <div>
                                <p className="text-lg font-semibold text-gray-800 mb-2">Produtos</p>
                                <div className="p-4 border border-gray-200 rounded-xl bg-white shadow-md space-y-3">
                                            <ul>

                                                {
                                                    bagSales?.map((sale) => (
                                                        <li 
                                                        key={sale.product.id}
                                                        className="flex items-center justify-between p-2 border border-gray-200 rounded-lg bg-white shadow-sm hover:border-gray-300 transition-all mb-1"
                                                        >
                                                            <div className="flex items-center gap-3">
                                                            <TShirt size={28} className="text-blue-500" />
                                                            <span className="text-gray-700 font-medium">{sale.product.description}</span>
                                                            </div>

                                                            <span className="text-gray-900 font-semibold">{`R$ ${sale.product.price}`}</span>
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

                                <Toast 
                                    isOpen={showToastTrackingCode}
                                    message="Código de rastreio enviado com sucesso!"
                                />

                            </div>
                        </div>
            )}
        </div>
    )
}
