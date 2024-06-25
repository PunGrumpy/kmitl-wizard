<script lang="ts">
  import type { InformationI } from '../utils/StudentScraping'
  export let information: InformationI
</script>

<div
  class="backdrop-blur-xs bg-orange-100/70 dark:bg-orange-900/70 text-orange-600 dark:text-orange-400 rounded-lg font-mplus px-4 py-3 border border-orange-200 dark:border-orange-700 flex flex-col md:flex-row justify-between items-center"
>
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/KMITL_Sublogo.svg/1024px-KMITL_Sublogo.svg.png"
    alt="KMITL Logo"
    class="w-12 h-12 md:w-20 md:h-20 object-contain"
  />
  <div class="text-center md:text-right">
    <h1 class="text-xl font-bold">
      ตารางเรียน {information.Semester}/{information.year}
    </h1>
    <p class="text-sm">{information.studentID} {information.name}</p>
    <p class="text-sm">
      Faculty: {information.faculty}, Department: {information.department},
      Major: {information.major}
    </p>
  </div>
</div>
