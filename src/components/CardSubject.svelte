<script lang="ts">
  import type { ScheduleI } from '../utils/StudentScraping'
  export let subject: ScheduleI

  const getSectionType = () =>
    subject.time.type === 'Theory' ? subject.theory : subject.practice
  const displayBuilding = () => (subject.building ? subject.building : 'Online')
  const displayRoom = () => (subject.room ? `( ${subject.room} )` : '( GenEd )')
</script>

<div
  class="backdrop-blur-xs bg-white-70 dark:bg-black-70 shadow-md rounded-lg p-4 transition-shadow flex flex-col justify-between h-full"
>
  <div class="flex justify-between text-xs text-zinc-600 dark:text-zinc-400">
    <p>{subject.time.type}</p>
    <p class="whitespace-nowrap">{subject.time.start} - {subject.time.end}</p>
  </div>
  <h3 class="text-orange-600 font-semibold text-lg dark:text-orange-400 mt-2">
    {subject.name}
  </h3>
  <div
    class="flex justify-between text-xs text-zinc-800 dark:text-zinc-300 mt-2"
  >
    <p class="whitespace-nowrap">
      Section <span class="font-semibold">{getSectionType()}</span>
    </p>
    <p class="whitespace-nowrap">
      {displayBuilding()}
      {displayRoom()}
    </p>
  </div>
</div>
