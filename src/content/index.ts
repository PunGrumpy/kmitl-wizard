import StudentTable from '../pages/StudentTable.svelte'
import StudentScraping from '../utils/StudentScraping'
import '../assets/css/tailwind.css'

// Load font
const font = document.createElement('style')
font.innerHTML = "@import url('https://use.typekit.net/atg0zvr.css');"
document.head.appendChild(font)

const scheduleTable = document.querySelector('table') as HTMLTableElement
document.body.innerHTML = ''

const student = new StudentScraping(scheduleTable)
const schedule = student.getSchedule()
const information = student.getStudent()
new StudentTable({ target: document.body, props: { schedule, information } })
