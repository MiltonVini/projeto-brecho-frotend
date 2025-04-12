import { Controller } from "react-hook-form"
import Select from "react-select"

interface Option {
  value: string
  label: string
}

interface MultiSelectInputProps {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any
  options: Option[]
  placeholder?: string
}

export function MultiSelectInput({
  name,
  control,
  options,
  placeholder
}: MultiSelectInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          isMulti={true}
          options={options}
          placeholder={placeholder}
          isClearable={true}
          value={options.find((opt) => opt.value === field.value)}
          onChange={(selected) =>
            field.onChange(selected ? selected.map((opt) => opt.value) : [])}
          className="w-98 p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
    />
  )
}
