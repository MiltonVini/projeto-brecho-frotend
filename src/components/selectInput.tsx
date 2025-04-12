import { Controller } from "react-hook-form"
import Select from "react-select"

interface Option {
  value: string
  label: string
}

interface SelectInputProps {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any
  options: Option[]
  placeholder?: string
}

export function SelectInput({
  name,
  control,
  options,
  placeholder
}: SelectInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          options={options}
          placeholder={placeholder}
          isClearable={true}
          value={options.find((opt) => opt.value === field.value)}
          onChange={(selected) => field.onChange(selected?.value || "")}
          className="w-98 p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
    />
  )
}
