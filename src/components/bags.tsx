import { format } from "date-fns"
import { UseBag } from "../hooks/bagHooks"
import { useNavigate } from "react-router-dom"
import { LoadingModal } from "./loadingModal"

export function Bags() {
    const { bags, isLoading, searchTerm } = UseBag()

    const navigate = useNavigate()

    const handleRedirect = (id: string) => {
        navigate(`/bag/${id}`)
    }

    const isDeliveredFieldClass = (isDelivered: boolean) => {
        const className = isDelivered ? 'bg-[#DFF3E7] text-green-800 border-[#84D19B]' : 'bg-[#FDFCD4] text-yellow-800 border-[#F4F493]'

        return className
    }

    const filteredBags = bags?.filter((bag) => bag.client.instagram_name.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <div className="w-5/6 rounded-sm border border-gray-300">
            <table className="w-full bg-white">
                <thead className="border-b border-dark">
                    <tr>
                        <th className="px-6 py-3 text-left rounded-tl-lg">Cliente</th>
                        <th className="px-6 py-3 text-center">Status</th>
                        <th className="px-6 py-3 text-center">Data de Criação</th>
                        <th className="px-6 py-3 text-center rounded-tr-lg">Data de Entrega</th>
                    </tr>
                </thead>
                {
                    isLoading ? (
                        <tbody>
                        <tr>
                          <td colSpan={4}>
                            <div className="flex justify-center items-center py-10">
                              <LoadingModal />
                            </div>
                          </td>
                        </tr>
                      </tbody>                  
                    ) : (
                        <tbody>
                        {
                            filteredBags?.map((bag) => (
                                <tr key={bag.id} className="border-b border-dark">
                                    <td className="px-6 py-3 text-left">
                                        <button 
                                            className="text-[#054AA4] bg-transparent border-0 cursor-pointer"
                                            onClick={() => handleRedirect(bag.id)}    
                                        >
                                            {bag.client.instagram_name}
                                        </button>
                                    </td>
                                    <td className="px-6 py-3 text-center">
                                        <span className={`px-4 py-2 rounded-xl ${isDeliveredFieldClass(bag.is_delivered)}`}>
                                            {bag.is_delivered ? 'Entregue' : 'Entrega a Combinar'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 text-center">{format(new Date(bag.created_at), 'dd/MM/yyyy')}</td>
                                    <td className="px-6 py-3 text-center">{bag.delivered_at ? format(new Date(bag.delivered_at), 'dd/MM/yyyy') : '-'}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    )
                }
            </table>
        </div>
    )
}
