import { useEffect } from "react"
import { Bags } from "./components/bags"
import { BagsFilters } from "./components/bagsFilters"
import { Layout } from "./components/layout"
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
    <Layout>
      <h3 className="text-2xl">Lista de Sacolinhas</h3>

      <BagsFilters/>
      <Bags />
    </Layout>
  )
}

export default App
