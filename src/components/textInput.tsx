import { UseFormRegister } from "react-hook-form"

interface TextInputProps {
    name: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>
}

export function TextInput({name, register}: TextInputProps) {
    return (
        <input
        type="text"
        id={name}
        {...register(name)}
        className="w-full p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    )
}