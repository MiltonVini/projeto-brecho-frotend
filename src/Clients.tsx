import { useForm } from "react-hook-form";
import { Sidebar } from "./components/sidebar";
import { UseBag } from "./hooks/bagHooks";
import { useState } from "react";
import { Modal } from "./components/modal";

interface IClientFormInput {
    name: string
    instagram_user: string
    email: string
}

export function Clients() {
    const [showModal, setShowModal] = useState(false)
    const { handleSubmit, register, reset } = useForm<IClientFormInput>()
    const { onRegisterClientFormSubmit } = UseBag()

    const handleRegisterClient = async (data: IClientFormInput) => {

      try {
        await onRegisterClientFormSubmit(data)
        setShowModal(true)
        reset()
      } catch (error) {
        console.error(error)
      } finally {
        setTimeout(() => {
          setShowModal(false)
        }, 3000);
      }
    }

    return (
        <div>
          <Sidebar />
          <div className="ml-64 p-6 w-full">
            <h3 className="text-2xl font-semibold mb-6">Cadastrar Cliente</h3>
      
            <div className="max-w-xl bg-white p-6 rounded-xl shadow-md">
              <form onSubmit={handleSubmit(handleRegisterClient)} className="space-y-4">
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name")}
                    className="w-full p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
      
                <div>
                  <label htmlFor="instagram_user" className="block text-sm font-medium text-gray-700 mb-1">
                    Instagram
                  </label>
                  <input
                    type="text"
                    id="instagram_user"
                    {...register("instagram_user")}
                    className="w-full p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
      
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className="w-full p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
      
                <button
                  type="submit"
                  className="bg-[#CFECF4] text-dark px-4 py-2 rounded-sm hover:bg-blue-700 transition-colors"
                >
                    Cadastrar
                </button>
              </form>

              <Modal 
                isOpen={showModal}
                message="Cliente cadastrado com sucesso!"
              />

            </div>
          </div>
        </div>
      )
      

}