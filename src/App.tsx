import { useEffect } from "react"
import { Bags } from "./components/bags"
import { BagsFilters } from "./components/bagsFilters"
import { Sidebar } from "./components/sidebar"
import { UseBag } from "./hooks/bagHooks"

function App() {
  const { shouldRefreshBags, fetchAllBags, setShouldRefreshBags } = UseBag()

  useEffect(() => {
    if (shouldRefreshBags) {
        fetchAllBags()
        setShouldRefreshBags(false)
    }
  })

  return (
    <div className="flex">
      <Sidebar/>

      <div className="ml-64 p-6 m-2 w-5/6">
        <h3 className="text-2xl">Lista de Sacolinhas</h3>

        <BagsFilters/>
        <Bags />
      
      </div>
    </div>
  )
}

export default App
