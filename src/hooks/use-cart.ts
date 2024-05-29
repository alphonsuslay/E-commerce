import { ProductDocument } from '@/models/ProductDocument'
import { create } from 'zustand'
import {
  createJSONStorage,
  persist,
} from 'zustand/middleware'

export type CartItem = {
  product: ProductDocument
}

type CartState = {
  items: CartItem[]
  addItem: (product: ProductDocument) => void
  removeItem: (productId: string) => void
  clearCart: () => void
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          return { items: [...state.items, { product }] }
        }),
        removeItem: (id) =>
          set((state) => ({
            items: state.items.filter(
              (item) => item.product && item.product.id !== id
            ),
          })),
        
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)