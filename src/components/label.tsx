interface LabelProps {
    text: string
    inputName: string
}

export function Label({text, inputName}: LabelProps) {
    return (
        <label htmlFor={inputName} className="block text-sm font-medium text-gray-700 mb-1">
            {text}
        </label>
    )
}