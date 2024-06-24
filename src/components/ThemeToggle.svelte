<script lang="ts">
  import { onMount } from 'svelte'

  let theme = 'system'

  onMount(() => {
    theme = localStorage.getItem('theme') || 'system'
    applyTheme(theme)
  })

  function applyTheme(theme: string) {
    const root = document.documentElement
    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
      root.classList.add(prefersDark ? 'dark' : 'light')
    } else {
      root.classList.add(theme)
    }

    localStorage.setItem('theme', theme)
  }

  function handleThemeChange(event: Event) {
    if (event.target instanceof HTMLSelectElement) {
      theme = event.target.value
    }
    applyTheme(theme)
  }
</script>

<div>
  <label for="theme-toggle" class="text-xs md:text-sm text-orange-500"
    >Theme:
  </label>
  <select
    id="theme-toggle"
    on:change={handleThemeChange}
    bind:value={theme}
    class="border rounded px-2 py-1"
  >
    <option value="system">System</option>
    <option value="light">Light</option>
    <option value="dark">Dark</option>
  </select>
</div>
