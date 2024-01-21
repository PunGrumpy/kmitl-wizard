<script lang="ts">
  import type { ScheduleI } from '../../utils/StudentScraping'
  export let subject: ScheduleI

  const getSectionType = () =>
    subject.time.type === 'ทฤษฏี' ? subject.theory : subject.practice
  const displayRoom = () => (subject.room ? `( ${subject.room} )` : '')
</script>

<div
  class="bg-orange-100/50 border-l-2 border-orange-200 px-3 py-1 h-full flex flex-col justify-between rounded
  hover:border-orange-400 hover:scale-105 hover:rotate-2 transition-all"
>
  <div class="flex justify-between text-xs text-gray-600">
    <p>{subject.time.type}</p>
    <p class="whitespace-nowrap">
      {subject.time.start} - {subject.time.end}
    </p>
  </div>
  <h3 class="text-orange-400 text-left text-sm">{subject.name}</h3>
  <div class="flex justify-between text-xs text-gray-600">
    <p class="whitespace-nowrap">
      section({getSectionType()})
    </p>
    <p class="whitespace-nowrap">
      {subject.building}{displayRoom()}
    </p>
  </div>
</div>
