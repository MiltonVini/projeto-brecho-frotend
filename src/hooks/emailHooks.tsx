import { useContext } from "react";
import { EmailContext } from "../contexts/emailContext";

export function useEmail() {
    const context = useContext(EmailContext)

    return context
}