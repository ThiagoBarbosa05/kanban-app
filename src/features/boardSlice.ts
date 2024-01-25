import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice, nanoid } from '@reduxjs/toolkit'

export interface BoardState {
  id: string
  name: string
  isSelected?: boolean
  columns: {
    id: string
    name: string
    color: string
  }[]
}

const initialState: BoardState[] = [
  {
    id: nanoid(),
    name: 'Platform Launch',
    isSelected: true,
    columns: [
      { id: nanoid(), name: 'TODO', color: '#49C4E5' },
      { id: nanoid(), name: 'DOING', color: '#8471F2' },
      { id: nanoid(), name: 'DONE', color: '#67E2AE' },
    ],
  },
  {
    id: nanoid(),
    name: 'Marketing Plan',
    isSelected: false,
    columns: [
      { id: nanoid(), name: 'TODO', color: '#49C4E5' },
      { id: nanoid(), name: 'DOING', color: '#8471F2' },
      { id: nanoid(), name: 'DONE', color: '#67E2AE' },
    ],
  },
  {
    id: nanoid(),
    name: 'Roadmap',
    isSelected: false,
    columns: [
      { id: nanoid(), name: 'TODO', color: '#49C4E5' },
      { id: nanoid(), name: 'DOING', color: '#8471F2' },
      { id: nanoid(), name: 'DONE', color: '#67E2AE' },
    ],
  },
]

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addBoard(state, action: PayloadAction<BoardState>) {
      state.push(action.payload)
    },
    editBoard(state, action: PayloadAction<BoardState>) {
      const boardToEdit = state.find((board) => board.id === action.payload.id)
      if (boardToEdit) {
        boardToEdit.name = action.payload.name
        boardToEdit.columns = action.payload.columns
      }
    },
    selectBoard(state, action: PayloadAction<{ id: string }>) {
      state.forEach((board) => (board.isSelected = false))

      const boardFounded = state.find((board) => board.id === action.payload.id)

      if (boardFounded) {
        boardFounded.isSelected = true
      }
    },
  },
})

export const { addBoard, selectBoard, editBoard } = boardSlice.actions

export default boardSlice.reducer
