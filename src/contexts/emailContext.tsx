import { createContext } from "react"

interface IEmailSubmitProps {
    to: string
    subject?: string
    message: string
}

interface EmailContextType {
    handleEmailSubmit: (data: IEmailSubmitProps) => void
    emailMessage: (instagramName: string, trackingCode: string) => string
    trackingCode: string
    setTrackingCode: React.Dispatch<React.SetStateAction<string>>
    setShowTrackingInput: React.Dispatch<React.SetStateAction<boolean>>
    showTrackingInput: boolean
    showToastTrackingCode: boolean
}

export const EmailContext = createContext({} as EmailContextType)