export function Task() {
  return (
    <div className="flex cursor-grab flex-col items-start rounded-lg bg-white px-4 py-6 text-black shadow-task-shadow hover:text-main-purple dark:bg-dark-grey dark:text-white  dark:hover:text-main-purple">
      <strong className="block pb-2 text-md ">
        Build UI for onboarding flow
      </strong>
      <span className="text-sm font-bold text-medium-grey">
        0 of 3 substasks
      </span>
    </div>
  )
}
