<script lang="ts">
  import type { ScheduleI } from '../utils/StudentScraping'
  export let subject: ScheduleI

  const getSectionType = () =>
    subject.time.type === 'ทฤษฏี' ? subject.theory : subject.practice
  const displayRoom = () => (subject.room ? `( ${subject.room} )` : '')
</script>

<div
  class="bg-zinc-50 dark:bg-zinc-800 shadow-md rounded-lg p-4 transition-shadow flex flex-col justify-between h-full"
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
    <p class="whitespace-nowrap">Section ({getSectionType()})</p>
    <p class="whitespace-nowrap">{subject.building} {displayRoom()}</p>
  </div>
</div>
