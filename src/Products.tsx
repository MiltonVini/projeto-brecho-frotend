import { useForm } from "react-hook-form";
import { Label } from "./components/label";
import { NumberInput } from "./components/numberInput";
import { RadioButtonInput } from "./components/radioButtonInput";
import { Sidebar } from "./components/sidebar";
import { TextInput } from "./components/textInput";
import { UseBag } from "./hooks/bagHooks";
import { ICreateProductFormInput } from "./providers/bagProvider";
import { useState } from "react";
import { Modal } from "./components/modal";

export function Products() {
    const [showModal, setShowModal] = useState(false)
    const { register, handleSubmit, reset } = useForm<ICreateProductFormInput>()
    const { onCreateProductFormSubmit } = UseBag()

    const handleCreateProduct = async (data: ICreateProductFormInput) => {
        try {
            await onCreateProductFormSubmit(data)
            setShowModal(true)
            reset()
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setShowModal(false)
            }, 3000)
        }

    }

    return (
        <div>
          <Sidebar />
            <div className="ml-64 p-6 w-full">
                <div className="max-w-xl bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-2xl font-semibold mb-6">Cadastrar Produto</h3>

                    <form onSubmit={handleSubmit(handleCreateProduct)}> 
                        <Label 
                            text="Descrição do Produto"
                            inputName="description"
                        />

                        <TextInput 
                            name="description"
                            register={register} 
                        />

                        <Label 
                            text="Preço do Produto"
                            inputName="price"
                        />
                        
                        <NumberInput 
                            name="price"
                            register={register}
                        />

                        
                        <Label 
                            text="Custo do Produto"
                            inputName="cost"
                        />
                        
                        <NumberInput 
                            name="cost"
                            register={register} 
                        />


                        <Label 
                            text="Tipo de Estoque"
                            inputName="stock_type"
                        />

                        <RadioButtonInput 
                            name="stock_type"
                            options={[
                                {label: "Único", value: "single"},
                                {label: "Múltiplo", value: "multiple"}
                            ]}
                            register={register}
                        
                        />


                        <button 
                            type="submit"
                            className="m-2 bg-[#CFECF4] text-dark px-4 py-2 rounded-sm hover:bg-[#B0CDEE] transition-colors"
                        >
                            Cadastrar
                        </button>
                    </form>

                    <Modal 
                        isOpen = {showModal}
                        message="Produto cadastrado com sucesso!"
                    />


                </div>

            </div>
        </div>
      )
}