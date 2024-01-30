export interface Task {
  id: string
  title: string
  description?: string
  boardId: string
  columnId: string
  subtasks: {
    id: string
    title: string
    isCompleted?: boolean
  }[]
}
