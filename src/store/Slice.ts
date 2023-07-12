import { createSlice, PayloadAction} from '@reduxjs/toolkit'
import { getMenu } from './async'
import { Menu } from '../types/type'



type Initial = {
  id: number
  menu: Menu[]
  filters: Menu[]
  modal: Menu[] | []
  price: number
}

const initialState: Initial = {
  id: 0,
  menu: [],
  filters: [],
  modal: [],
  price: 0
}

const clickSlice = createSlice({
  name: 'id',
  initialState,
  reducers: {
    clickId(state, action: PayloadAction<number>) {
      state.id = action.payload
      state.filters = state.menu.filter(item => item.id === action.payload)
    },
    addModal(state, action: PayloadAction<string> ) {
      const ar = state.menu.find(item => item.name === action.payload)
      if (ar) {
        const foundFood = state.modal.some(food => food.name === ar.name)
        const indexFilter = state.filters.findIndex(food => food.name === ar.name)
        // const indexMenu = state.filters.findIndex(food => food.name === ar.name)
        state.filters[indexFilter].count++
        // state.menu[indexMenu].count++
        if(!foundFood) {
          state.price += ar.price
          state.modal = [...state.modal, ar]
          const index = state.modal.findIndex(item => item.name === ar.name)
          if(index !== -1) {
            state.modal[index].count++
          }
        } else {
          const index = state.modal.findIndex(item => item.name === ar.name)
          if(index !== -1) {
            state.modal[index].count++
            state.price = state.price + state.modal[index].price
          }
        } 
      }
    },
    increment(state, action: PayloadAction<string>) {
        const index = state.modal.findIndex(food => food.name === action.payload)
        // const indexFilter = state.filters.findIndex(food => food.name === action.payload)
        // state.menu[indexFilter].count++
        console.log(index);
        if(index !== -1) {
          state.modal[index].count++
          state.price += state.modal[index].price
        }
    },
    decrement(state, action: PayloadAction<string>) {
        const index = state.modal.findIndex(food => food.name === action.payload)
        const indexFilter = state.filters.findIndex(food => food.name === action.payload)
        state.filters[indexFilter].count--
        if(state.modal[index].count <= 1) {
          state.price -= state.modal[index].price
          state.modal = state.modal.filter(food => food.name !== action.payload)
        } else if (index !== -1) {
          state.modal[index].count--
          state.price -= state.modal[index].price
        }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMenu.fulfilled, (state, action) => {
        state.menu = action.payload
        state.filters = state.menu.filter(food => food.id === 1)
      })
  }
})

export const { clickId, addModal, increment, decrement } = clickSlice.actions
export default clickSlice.reducer