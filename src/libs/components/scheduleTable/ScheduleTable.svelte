<script lang="ts">
  import { createTimeSlot } from '../../utils/StudentHelper'
  import type { ScheduleI } from '../../utils/StudentScraping'
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

<div>
  <table class="w-full rounded-2xl table-auto" cellspacing={44}>
    <thead>
      <tr>
        <th scope="col" />
        {#each hours as hour (hour)}
          {#if hour < 20 - 1}
            <th
              scope="col"
              class="border-x border-orange-100 w-[8.33%]"
              colspan="4"
            >
              {`${formatTime(hour)} - ${formatTime(hour + 1)}`}
            </th>
          {/if}
        {/each}
      </tr></thead
    >
    <tbody>
      {#each days as day (day.name)}
        <tr class="hover:bg-orange-100/20 group">
          <th
            scope="row"
            class="text-right font-semibold text-sm text-orange-300 whitespace-nowrap group-hover:scale-125 group-hover:text-orange-400 transition-all"
          >
            {day.name}
          </th>
          {#each createTimeSlot(schedule, day.code) as slot}
            <td class="border-x border-orange-100" colspan={slot?.colSpan || 1}>
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

<style scoped>
  th,
  td {
    @apply font-prompt;
  }
  th {
    @apply font-normal whitespace-nowrap text-orange-400;
  }
  td {
    @apply w-[2.22%] p-1 h-28;
  }
</style>
