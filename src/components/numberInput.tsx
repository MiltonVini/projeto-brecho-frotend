import { UseFormRegister } from "react-hook-form"

interface NumberInputProps {
    name: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>
}

export function NumberInput({name, register}: NumberInputProps) {
    return (
        <input
        type="number"
        step={"0.01"}
        min={"0"}
        id={name}
        {...register(name, {
            valueAsNumber: true
        })}
        className="w-full p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    )
}