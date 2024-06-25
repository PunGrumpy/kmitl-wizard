<script lang="ts">
  import type { InformationI, ScheduleI } from '../utils/StudentScraping'
  import Icon from '@iconify/svelte'
  import { toBlob } from 'html-to-image'
  import { downloadBlob } from '../utils/StudentHelper'
  import Head from '../components/Head.svelte'
  import ScheduleTable from '../components/ScheduleTable.svelte'
  import ThemeToggle from '../components/ThemeToggle.svelte'
  import Toast from '../components/Toast.svelte'
  import packageJson from '../../package.json'
  import { onMount } from 'svelte'

  export let schedule: Array<ScheduleI>
  export let information: InformationI

  let captureScreen: HTMLDivElement
  let toastMessage: string = ''
  let showToast: boolean = false
  let showUpdateNotification: boolean = false
  let latestVersion: string = ''

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

  const checkUpdateVersion = async () => {
    const res = await fetch(
      'https://api.github.com/repos/PunGrumpy/kmitl-wizard/releases/latest'
    )
    const data = await res.json()
    latestVersion = data.tag_name
    const currentVersion = `v${packageJson.version}`
    if (latestVersion !== currentVersion) {
      showUpdateNotification = true
      showNotification(`New version available: ${latestVersion}`)
    }
  }

  onMount(async () => {
    await checkUpdateVersion()
  })
</script>

<main
  class="min-h-screen p-6 flex flex-col justify-between bg-zinc-100 dark:bg-zinc-900"
>
  {#if showUpdateNotification}
    <div
      class="bg-orange-500 text-white dark:bg-orange-600 dark:text-black text-center p-4 rounded-lg mb-4"
    >
      New version available: <a
        href="https://github.com/PunGrumpy/kmitl-wizard/releases/tag/{latestVersion}"
        class="underline hover:text-orange-200 dark:hover:text-orange-400 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        {latestVersion}
      </a>
    </div>
  {/if}
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
