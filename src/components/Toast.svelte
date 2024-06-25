<script lang="ts">
  import { onMount } from 'svelte'
  import { tick } from 'svelte'

  export let message: string
  export let duration: number = 3000

  let visible = false
  let timeoutId: NodeJS.Timeout

  onMount(async () => {
    visible = true

    timeoutId = setTimeout(() => {
      visible = false
    }, duration)

    await tick()
  })

  function closeToast() {
    clearTimeout(timeoutId)
    visible = false
  }
</script>

<div>
  <button
    class="toast {visible
      ? 'visible'
      : ''} relative cursor-pointer focus:outline-none"
    on:click={closeToast}
    aria-label="Close notification"
  >
    {message}
  </button>
</div>

<style>
  .toast {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    padding: 0.75rem 1.25rem;
    background-color: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(0.5rem);
    color: rgba(255, 255, 255, 0.9);
    border-radius: 0.5rem;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
    opacity: 0;
    transform: translateY(2rem);
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
  }
  .toast.visible {
    opacity: 1;
    transform: translateY(0);
  }
</style>
