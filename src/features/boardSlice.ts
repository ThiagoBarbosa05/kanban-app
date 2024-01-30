import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice, nanoid } from '@reduxjs/toolkit'

import { Task } from '@/@types'

export interface BoardState {
  id: string
  name: string
  isSelected?: boolean
  columns: {
    id: string
    name: string
    color: string
  }[]
  tasks?: {
    id: string
    title: string
    description?: string
    boardId: string
    columnId: string
    subtasks: {
      id: string
      title: string
      isCompleted: boolean
    }[]
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
    tasks: [],
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
    tasks: [],
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
    tasks: [],
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
    selectBoard(state, action: PayloadAction<{ id?: string }>) {
      state.forEach((board) => (board.isSelected = false))

      const boardFounded = state.find((board) => board.id === action.payload.id)

      if (boardFounded) {
        boardFounded.isSelected = true
      } else {
        state[0].isSelected = true
      }
    },
    deleteBoard(state, action: PayloadAction<{ id: string }>) {
      return state.filter((board) => board.id !== action.payload.id)
    },
    addColumn(
      state,
      action: PayloadAction<{
        id: string
        columns: { id: string; name: string; color: string }[]
      }>,
    ) {
      const board = state.find((board) => board.id === action.payload.id)

      if (board) {
        board.columns = action.payload.columns
      }
    },
    addTask(state, action: PayloadAction<Task>) {
      const board = state.find((board) => board.id === action.payload.boardId)

      if (board) {
        board.tasks?.push(action.payload)
      }
    },
  },
})

export const {
  addBoard,
  selectBoard,
  editBoard,
  deleteBoard,
  addColumn,
  addTask,
} = boardSlice.actions

export default boardSlice.reducer
