import { useContext } from 'react'
import { BagContext } from '../contexts/bagContext'

export function UseBag() {
  const context = useContext(BagContext)

  return context
}