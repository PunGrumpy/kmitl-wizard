<script lang="ts">
  import type { InformationI } from '../utils/StudentScraping'
  export let information: InformationI
</script>

<div
  class="bg-orange-100/50 text-orange-500 rounded-lg font-mplus px-4 py-4 border border-orange-200 flex flex-col md:flex-row justify-between items-center"
>
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/KMITL_Sublogo.svg/1024px-KMITL_Sublogo.svg.png"
    alt="kmitl logo"
    class="w-16 h-16 md:w-24 md:h-24 object-contain"
  />
  <div class="text-center md:text-right mt-2 md:mt-0">
    <h1 class="text-xl md:text-2xl font-bold">
      ตารางเรียน {information.Semester}/{information.year}
    </h1>
    <p class="text-xs md:text-sm">{information.studentID} {information.name}</p>
    <p class="text-xs md:text-sm">
      Faculty: {information.faculty}, Department: {information.department},
      Major: {information.major}
    </p>
  </div>
</div>
