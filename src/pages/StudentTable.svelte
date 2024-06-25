<script lang="ts">
  import type { InformationI, ScheduleI } from '../utils/StudentScraping'
  import Icon from '@iconify/svelte'
  import { toBlob } from 'html-to-image'
  import { downloadBlob } from '../utils/StudentHelper'
  import Head from '../components/Head.svelte'
  import ScheduleTable from '../components/ScheduleTable.svelte'
  import ThemeToggle from '../components/ThemeToggle.svelte'
  import Toast from '../components/Toast.svelte'

  export let schedule: Array<ScheduleI>
  export let information: InformationI

  let captureScreen: HTMLDivElement
  let toastMessage: string = ''
  let showToast: boolean = false

  const showNotification = (message: string) => {
    toastMessage = message
    showToast = true
    setTimeout(() => {
      showToast = false
    }, 3000)
  }

  const screenshotToClipboard = async () => {
    const blob = await toBlob(captureScreen)
    if (blob == null) return
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
    showNotification('Screenshot copied to clipboard!')
  }

  const exportPng = async () => {
    const blob = await toBlob(captureScreen)
    if (blob == null) return
    const data = {
      studentID: information.studentID,
      semester: information.semester,
      year: information.year,
      schedule: schedule
    }
    downloadBlob(
      blob,
      `schedule_${data.studentID}_${data.semester}_${data.year}.png`
    )
    showNotification('PNG exported successfully!')
  }
</script>

<main
  class="min-h-screen p-6 flex flex-col justify-between bg-zinc-100 dark:bg-zinc-900"
>
  <div
    bind:this={captureScreen}
    class="backdrop-blur-xs bg-white-70 dark:bg-black-70 p-4 shadow-lg rounded-lg"
  >
    <Head {information} />
    <div class="my-4">
      <ScheduleTable {schedule} />
    </div>
  </div>
  <footer
    class="flex flex-col md:flex-row justify-between items-center mt-6 space-y-3 md:space-y-0 md:space-x-6"
  >
    <div class="flex space-x-4">
      <button
        on:click={screenshotToClipboard}
        class="rounded-lg py-2 px-4 bg-orange-600 text-white text-xs hover:bg-orange-700 transition-colors flex items-center"
      >
        <Icon icon="ph:clipboard-light" class="mr-2" /> Copy to Clipboard
      </button>
      <button
        on:click={exportPng}
        class="rounded-lg py-2 px-4 bg-orange-600 text-white text-xs hover:bg-orange-700 transition-colors flex items-center"
      >
        <Icon icon="ph:file-png-light" class="mr-2" /> Export
      </button>
      <button
        on:click={() =>
          (window.location.href = 'https://github.com/PunGrumpy/kmitl-wizard')}
        class="rounded-lg py-2 px-4 bg-orange-600 text-white text-xs hover:bg-orange-700 transition-colors flex items-center"
      >
        <Icon icon="mdi:github" class="mr-2" /> Contribute
      </button>
      <ThemeToggle />
    </div>
    <div
      class="text-center md:text-right text-xs text-orange-600 dark:text-orange-400"
    >
      <p>
        Redesign by <a
          href="https://pungrumpy.com"
          target="_blank"
          rel="noopener noreferrer"
          style="text-decoration: none; color: inherit;">PunGrumpy</a
        >
        <Icon
          icon="ph:ghost-fill"
          class="inline-block text-orange-600 dark:text-orange-400"
        />
      </p>
    </div>
  </footer>
  {#if showToast}
    <Toast message={toastMessage} />
  {/if}
</main>
