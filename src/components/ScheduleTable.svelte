<script lang="ts">
  import { createTimeSlot } from '../utils/StudentHelper'
  import type { ScheduleI } from '../utils/StudentScraping'
  import CardSubject from './CardSubject.svelte'

  export let schedule: Array<ScheduleI>

  const days = [
    { name: 'Mon', code: 'จ.' },
    { name: 'Tue', code: 'อ.' },
    { name: 'Wed', code: 'พ.' },
    { name: 'Thu', code: 'พฤ.' },
    { name: 'Fri', code: 'ศ.' },
    { name: 'Sat', code: 'ส.' },
    { name: 'Sun', code: 'อา.' }
  ]

  const hours = Array.from({ length: 20 - 8 }, (_, i) => i + 8)
  const formatTime = (hour: number) => `${hour.toString().padStart(2, '0')}:00`
</script>

<div class="overflow-x-auto">
  <table class="min-w-full bg-white dark:bg-gray-800 rounded-2xl">
    <thead class="bg-gray-100 dark:bg-gray-900">
      <tr>
        <th scope="col" class="p-2" />
        {#each hours as hour (hour)}
          {#if hour < 20 - 1}
            <th
              scope="col"
              class="border-x border-gray-200 dark:border-gray-700 p-2 text-xs md:text-sm"
              colspan="4"
            >
              {`${formatTime(hour)} - ${formatTime(hour + 1)}`}
            </th>
          {/if}
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each days as day, i (day.name)}
        <tr
          class="{i % 2 === 0
            ? 'bg-gray-50 dark:bg-gray-700'
            : 'bg-white dark:bg-gray-800'} hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <th
            scope="row"
            class="text-right font-semibold text-xs md:text-sm p-2 text-orange-400 dark:text-orange-300"
          >
            {day.name}
          </th>
          {#each createTimeSlot(schedule, day.code) as slot}
            <td
              class="border-x border-gray-200 dark:border-gray-700 p-2"
              colspan={slot?.colSpan || 1}
            >
              {#if slot}
                <CardSubject subject={slot} />
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
