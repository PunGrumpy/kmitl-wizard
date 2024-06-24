<script lang="ts">
  import Icon from '@iconify/svelte'
  import { onMount } from 'svelte'

  let theme = 'dark'

  onMount(() => {
    theme = localStorage.getItem('theme') || 'dark'
    applyTheme(theme)
  })

  function applyTheme(theme: string) {
    const root = document.documentElement
    root.classList.remove('light', 'dark')

    if (theme === 'light') {
      root.classList.add('light')
    } else {
      root.classList.add('dark')
    }

    localStorage.setItem('theme', theme)
  }

  function toggleTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    theme = newTheme
    applyTheme(newTheme)
  }
</script>

<div
  class="rounded-lg py-2 px-4 bg-orange-500 text-white text-xs md:text-sm hover:bg-orange-600 transition-colors flex items-center"
>
  <button
    on:click={toggleTheme}
    class="rounded-lg bg-orange-500 text-white text-xs md:text-sm hover:bg-orange-600 transition-colors flex items-center"
  >
    <Icon
      icon={theme === 'light' ? 'ph:moon-stars-fill' : 'ph:sun-fill'}
      class="mr-2"
    />
    {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
  </button>
</div>
