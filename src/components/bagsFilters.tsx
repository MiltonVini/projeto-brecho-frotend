import { MagnifyingGlass } from "@phosphor-icons/react"
import { UseBag } from "../hooks/bagHooks"
import { GetBagsParams } from "../providers/bagProvider"

export function BagsFilters() {
    const { setFilters, filters, setSearchTerm, searchTerm } = UseBag()

    const handleFilterButtonClick = (params: GetBagsParams) => {
      setFilters((prev) => {
        if (prev.is_delivered === params.is_delivered) {
          return {}
        }
        return {
          ...prev,
          ...params,
        }
      })
    }

    return (
        <div className="m-4 flex flex-columns gap-4 items-center">
        <span>Filtros</span>
        <button
            className={`
              px-4 py-2 font-medium rounded-lg border-2 transition-all duration-300 ease-in-out shadow-md
              ${filters.is_delivered === true 
                ? 'border-blue-600 bg-[#CFE0F4] text-dark hover:bg-[#B0CDEE] active:bg-[#95B7D6]' 
                : 'border-transparent bg-[#CFECF4] text-dark hover:bg-[#B0D8E8] active:bg-[#A0C8D8]'}
            `}
            onClick={() => handleFilterButtonClick({ is_delivered: true })}
        >
          Entregue
        </button>
        <button
            className={`
              px-4 py-2 font-medium rounded-lg border-2 transition-all duration-300 ease-in-out shadow-md
              ${filters.is_delivered === false 
                ? 'border-blue-600 bg-[#CFE0F4] text-dark hover:bg-[#B0CDEE] active:bg-[#95B7D6]' 
                : 'border-transparent bg-[#CFECF4] text-dark hover:bg-[#B0D8E8] active:bg-[#A0C8D8]'}
            `}
            onClick={() => handleFilterButtonClick({ is_delivered: false })}
        >
          Entrega a Combinar
        </button>
        <span>Cliente</span>
        <div className="relative w-[16rem]">
          <MagnifyingGlass 
            size={24} 
            className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" 
          />
          <input
            type="text"
            placeholder="Digite o @ ou nome do cliente"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-3 py-2 w-full text-sm border-2 border-[#ccc] rounded-sm bg-[#ECFAFE] focus:outline-none"
          />
        </div>
      </div>
    )
}