<script lang="ts">
  import type { ScheduleI } from '../utils/StudentScraping'
  export let subject: ScheduleI

  const getSectionType = () =>
    subject.time.type === 'ทฤษฏี' ? subject.theory : subject.practice
  const displayRoom = () => (subject.room ? `( ${subject.room} )` : '')
</script>

<div
  class="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow flex flex-col justify-between h-full"
>
  <div class="flex justify-between text-md text-gray-400">
    <p>{subject.time.type}</p>
    <p class="whitespace-nowrap">
      {subject.time.start} - {subject.time.end}
    </p>
  </div>
  <h3 class="text-orange-500 font-bold text-lg">{subject.name}</h3>
  <div class="flex justify-between text-md text-gray-600">
    <p class="whitespace-nowrap">
      section({getSectionType()})
    </p>
    <p class="whitespace-nowrap">
      {subject.building}
      {displayRoom()}
    </p>
  </div>
</div>
