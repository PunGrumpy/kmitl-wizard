<script lang="ts">
  import { onMount } from 'svelte'
  export let message: string
  export let duration: number = 3000

  let visible = false

  onMount(() => {
    visible = true
    setTimeout(() => {
      visible = false
    }, duration)
  })
</script>

<div class="toast {visible ? 'visible' : ''}">
  {message}
</div>

<style>
  .toast {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    padding: 0.75rem 1.25rem;
    background-color: #333;
    color: #fff;
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
