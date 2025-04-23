import { ReactNode, useState } from "react"
import { EmailContext } from "../contexts/emailContext"
import { emailServiceApi } from "../lib/axios"

interface EmailProviderProps {
  children: ReactNode
}

interface IEmailSubmitProps {
    to: string,
    subject?: string,
    message: string
}

export function EmailProvider({children}: EmailProviderProps) {
    const [showTrackingInput, setShowTrackingInput] = useState(false)
    const [trackingCode, setTrackingCode] = useState("")
    const [showToastTrackingCode, setShowToastTrackingCode] = useState(false)


    const handleEmailSubmit = async (data: IEmailSubmitProps) => {
        try {

            const response = await emailServiceApi.post('/emails', {
                to: data.to,
                subject: "Ei! Sua sacolinha está a caminho 🛍️ @unusual.brecho",
                message: data.message
            })
    
            console.log(response)

            if (response.status === 200) {
                setShowToastTrackingCode(true)
            }
    
            return response
        } catch (error) {
            console.error(error)
        } finally {
            setTimeout(() => {
                setShowTrackingInput(false)
                setShowToastTrackingCode(false)
            }, 3000)
        }
    }

    const emailMessage = (instagramName: string, trackingCode: string) => {
        const message = `
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Código de Rastreio</title>
            </head>
            <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
                <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); padding: 24px;">
                <h2 style="color: #222;">Olá! ${instagramName} 🌟</h2>
                <p style="font-size: 16px; color: #333;">
                    Seu pedido foi postado com sucesso! Abaixo está o código de rastreio para acompanhar sua entrega:
                </p>

                <div style="margin: 20px 0; padding: 12px; background-color: #f1f5f9; border-left: 4px solid rgb(252, 186, 132);">
                    <p style="margin: 0; font-size: 18px; font-weight: bold; color: #111;">Código de Rastreio:</p>
                    <p style="margin: 0; font-size: 16px; color: #333;">${trackingCode}</p>
                </div>

                <p style="font-size: 16px; color: #333;">
                    Você pode acompanhar o status da entrega clicando no botão abaixo:
                </p>

                <a
                    href="https://melhorrastreio.com.br"
                    target="_blank"
                    style="display: inline-block; background-color:rgb(252, 186, 132); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;"
                >
                    Rastrear Pedido
                </a>

                <p style="font-size: 14px; color: #999;">Unusual Brechó</p>
                </div>
            </body>
            </html>  
        `

        return message
    }
    


    return (
        <EmailContext.Provider
            value={{
                handleEmailSubmit,
                emailMessage,
                trackingCode,
                setTrackingCode,
                setShowTrackingInput,
                showTrackingInput,
                showToastTrackingCode

            }}
        
        >
            {children}
        </EmailContext.Provider>
    )
}