<script lang="ts">
  import type { InformationI, ScheduleI } from '../libs/utils/StudentScraping'
  import Icon from '@iconify/svelte'
  import { toBlob } from 'html-to-image'
  import { downloadBlob } from '../libs/utils/StudentHelper'
  import Head from '../libs/components/scheduleTable/Head.svelte'
  import ScheduleTable from '../libs/components/scheduleTable/ScheduleTable.svelte'

  export let schedule: Array<ScheduleI>
  export let information: InformationI

  let captureScreen: any
  const exportPng = async () => {
    const blob = await toBlob(captureScreen)
    if (blob == null) return
    downloadBlob(
      blob,
      `schedule_${information.studentID}_${information.Semester}_${information.year}.png`
    )
  }
</script>

<main class="min-h-screen p-4 flex flex-col justify-between bg-gray-100">
  <div bind:this={captureScreen} class="bg-white p-3 shadow-lg rounded-lg">
    <Head {information} />
    <div class="my-5">
      <ScheduleTable {schedule} />
    </div>
  </div>
  <footer class="flex justify-between items-center mt-4">
    <div class="flex space-x-3">
      <button
        on:click={exportPng}
        class="rounded-lg py-2 px-4 bg-orange-500 text-white text-sm hover:bg-orange-600 transition-colors flex items-center"
      >
        <Icon icon="ph:file-png-light" class="mr-2" /> Export
      </button>
      <button
        on:click={() =>
          (window.location.href = 'https://github.com/BossNz/kmitl-x')}
        class="rounded-lg py-2 px-4 bg-orange-500 text-white text-sm hover:bg-orange-600 transition-colors flex items-center"
      >
        <Icon icon="mdi:github" class="mr-2" /> Contribute
      </button>
    </div>
    <div class="text-right text-sm text-orange-500">
      <p>
        Redesign by BossNz <Icon
          icon="fluent-emoji:love-you-gesture"
          class="inline"
        />
      </p>
      <p>Powered by Computer Science, KMITL</p>
    </div>
  </footer>
</main>
