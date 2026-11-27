import { ReactNode, useEffect, useState } from "react"
import { List } from "@phosphor-icons/react"
import { Sidebar } from "./sidebar"

interface LayoutProps {
    children: ReactNode
}

export function Layout({ children }: LayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const closeSidebar = () => setIsSidebarOpen(false)

    useEffect(() => {
        if (!isSidebarOpen) return

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsSidebarOpen(false)
        }

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"
        window.addEventListener("keydown", handleKeyDown)

        return () => {
            document.body.style.overflow = previousOverflow
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [isSidebarOpen])

    return (
        <div className="min-h-screen">
            <header className="sticky top-0 z-30 flex items-center gap-3 h-14 px-4 bg-white border-b border-gray-200 lg:hidden">
                <button
                    type="button"
                    aria-label="Abrir menu"
                    aria-controls="sidebar"
                    aria-expanded={isSidebarOpen}
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 -ml-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <List size={24} />
                </button>
                <span className="text-lg font-semibold">Projeto Brechó</span>
            </header>

            {isSidebarOpen && (
                <div
                    aria-hidden="true"
                    onClick={closeSidebar}
                    className="fixed inset-0 z-30 bg-black/40 lg:hidden"
                />
            )}

            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

            <main className="p-4 md:p-6 lg:ml-64">
                {children}
            </main>
        </div>
    )
}
