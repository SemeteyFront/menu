import { createSlice, PayloadAction} from '@reduxjs/toolkit'
import { getMenu } from './async'
import { Menu } from '../types/type'
import { menu } from './menu'



type Initial = {
  id: number
  menu: Menu[]
  filters: Menu[]
  modal: Menu[] | []
  price: number
  find: Menu | null
}

const fill = [
  {
    "id": 1,
    "name": "Стейк Рибай",
    "price": 25,
    "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCqYAyYvg4fxkoJjN81pIaB_IgPh8KikKAlQ&usqp=CAU",
    "description": "Сочный и ароматный кусок мяса, известный своим мраморным жиром.",
    "count": 0
  },
  {
    "id": 1,
    "name": "Стейк Рибайq",
    "price": 25,
    "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCqYAyYvg4fxkoJjN81pIaB_IgPh8KikKAlQ&usqp=CAU",
    "description": "Сочныйv и ароматный кусок мяса, известный своим мраморным жиром.",
    "count": 0
  },
  {
    "id": 1,
    "name": "Стейк Рибайt",
    "price": 25,
    "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCqYAyYvg4fxkoJjN81pIaB_IgPh8KikKAlQ&usqp=CAU",
    "description": "Сочныйc и ароматный кусок мяса, известный своим мраморным жиром.",
    "count": 0
  },
  {
    "id": 1,
    "name": "Филе Миньон",
    "price": 34,
    "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPRqhMPv2bZJk-7EnQ0Nyif7Rz-5F-lut2DQ&usqp=CAU",
    "description": "Невероятно нежный и почти безжирный стейк, часто считается самым желаемым.",
    "count": 0
  },
  {
    "id": 1,
    "name": "Стейк Нью-Йорк",
    "price": 29,
    "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2YkadfFtfTyD8WuCfAx36KnvQJDi9euzrxg&usqp=CAU",
    "description": "Классический стейк с хорошим сочетанием нежности и аромата.",
    "count": 0
  },
  {
    "id": 1,
    "name": "Стейк Т-Боун",
    "price": 31,
    "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXKuazRtvji36BnuqgQnru7yy26egm8Bh3sA&usqp=CAU",
    "description": "Стейк, сочетающий два куска мяса: филейную часть и часть из ребер.",
    "count": 0
  }
]

const initialState: Initial = {
  id: 0,
  menu: menu,
  filters: fill,
  modal: [],
  price: 0,
  find: null
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
    },
    findObjects(state, action: PayloadAction<string>) {
      const find = state.menu.find(food => food.description === action.payload)
      if(find) {
        state.find = find
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMenu.fulfilled, (state, action) => {
        state.filters = state.menu.filter(food => food.id === 1)
      })
  }
})

export const { clickId, addModal, increment, decrement, findObjects } = clickSlice.actions
export default clickSlice.reducer