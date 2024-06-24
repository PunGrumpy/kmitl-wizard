<script lang="ts">
  import type { InformationI, ScheduleI } from '../utils/StudentScraping'
  import Icon from '@iconify/svelte'
  import { toBlob } from 'html-to-image'
  import { downloadBlob } from '../utils/StudentHelper'
  import Head from '../components/Head.svelte'
  import ScheduleTable from '../components/ScheduleTable.svelte'

  export let schedule: Array<ScheduleI>
  export let information: InformationI

  let captureScreen: HTMLDivElement

  const screenshotToClipboard = async () => {
    const blob = await toBlob(captureScreen)
    if (blob == null) return
    navigator.clipboard.write([
      new ClipboardItem({
        'image/png': blob
      })
    ])
  }

  const exportPng = async () => {
    const blob = await toBlob(captureScreen)
    if (blob == null) return
    const data = {
      studentID: information.studentID,
      semester: information.Semester,
      year: information.year,
      schedule: schedule
    }
    downloadBlob(
      blob,
      `schedule_${data.studentID}_${data.semester}_${data.year}.png`
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
  <footer class="flex flex-col md:flex-row justify-between items-center mt-4">
    <div class="flex space-x-3 mb-2 md:mb-0">
      <button
        on:click={screenshotToClipboard}
        class="rounded-lg py-2 px-4 bg-orange-500 text-white text-xs md:text-sm hover:bg-orange-600 transition-colors flex items-center"
      >
        <Icon icon="ph:clipboard-light" class="mr-2" /> Copy to Clipboard
      </button>
      <button
        on:click={exportPng}
        class="rounded-lg py-2 px-4 bg-orange-500 text-white text-xs md:text-sm hover:bg-orange-600 transition-colors flex items-center"
      >
        <Icon icon="ph:file-png-light" class="mr-2" /> Export
      </button>
      <button
        on:click={() =>
          (window.location.href = 'https://github.com/PunGrumpy/kmitl-x')}
        class="rounded-lg py-2 px-4 bg-orange-500 text-white text-xs md:text-sm hover:bg-orange-600 transition-colors flex items-center"
      >
        <Icon icon="mdi:github" class="mr-2" /> Contribute
      </button>
    </div>
    <div class="text-center md:text-right text-xs md:text-sm text-orange-500">
      <p>
        Redesign by PunGrumpy <Icon
          icon="ph:ghost-fill"
          class="inline-block text-orange-500"
        />
      </p>
    </div>
  </footer>
</main>
