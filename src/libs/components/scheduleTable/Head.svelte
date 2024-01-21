<script lang="ts">
  import type { InformationI } from '../../utils/StudentScraping'
  export let information: InformationI
</script>

<div
  class="bg-orange-100/50 text-orange-500 rounded-lg font-prompt px-4 py-4 border border-orange-200 flex justify-between items-center"
>
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/KMITL_Sublogo.svg/1024px-KMITL_Sublogo.svg.png"
    alt="kmitl logo"
    class="w-24 h-24 object-contain"
  />
  <div class="text-right">
    <h1 class="text-2xl font-bold">
      ตารางเรียน {information.Semester}/{information.year}
    </h1>
    <p class="text-sm">{information.studentID} {information.name}</p>
    <p class="text-sm">
      Faculty: {information.faculty}, Department: {information.department},
      Major: {information.major}
    </p>
  </div>
</div>
