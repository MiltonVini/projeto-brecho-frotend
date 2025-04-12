interface OptionProps {
    label: string
    value: string
}

interface RadioButtonInputProps {
    name: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: any
    options: OptionProps[]
  }
  
  export function RadioButtonInput({ name, register, options }: RadioButtonInputProps) {
    return (
        <div className="flex gap-4">
          {options.map((option) => (
            <label key={option.value} className="flex items-center gap-2">
              <input
                type="radio"
                value={option.value}
                {...register(name)}
                className="accent-blue-500"
              />
              {option.label}
            </label>
          ))}
        </div>
    )
  }
  