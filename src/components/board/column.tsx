// import { TaskDetail } from '../modal/task/task-detail'
// import { Task } from './task'

interface ColumnProps {
  column: {
    id: string
    name: string
    color: string
  }
}

export default function Column({ column }: ColumnProps) {
  return (
    <section className="min-w-[280px]">
      <div className="flex items-center gap-3 pb-6 text-sm font-bold uppercase tracking-[2.4px] text-medium-grey">
        <span
          className={`block h-[15px] w-[15px] rounded-full `}
          style={{ backgroundColor: `${column.color}` }}
        ></span>
        {column.name} (4)
      </div>

      <div className="flex flex-col gap-5">
        {/* <TaskDetail>
          <Task />
        </TaskDetail>
        <TaskDetail>
          <Task />
        </TaskDetail>
        <TaskDetail>
          <Task />
        </TaskDetail>
        <TaskDetail>
          <Task />
        </TaskDetail>
        <TaskDetail>
          <Task />
        </TaskDetail>
        <TaskDetail>
          <Task />
        </TaskDetail>
        <TaskDetail>
          <Task />
        </TaskDetail>
        <TaskDetail>
          <Task />
        </TaskDetail>
        <TaskDetail>
          <Task />
        </TaskDetail> */}
      </div>
    </section>
  )
}
