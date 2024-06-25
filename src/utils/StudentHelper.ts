import type { ScheduleI } from './StudentScraping'

const downloadBlob = (blob: Blob, name = 'file.txt'): void => {
  const navigator = window.navigator as any
  if (navigator?.msSaveOrOpenBlob) {
    return navigator.msSaveOrOpenBlob(blob)
  }

  const data = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = data
  link.download = name

  link.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    })
  )

  setTimeout(() => {
    window.URL.revokeObjectURL(data)
    link.remove()
  }, 100)
}

const createTimeSlot = (
  schedule: ScheduleI[],
  day: string = 'จ.'
): Array<undefined | (ScheduleI & { colSpan: number })> => {
  const timeSlot: Array<undefined | (ScheduleI & { colSpan: number })> = []
  const findDay = schedule.filter(item => item.time.day === day)
  const colSlot = 44
  const startTime = 8 * 60
  const timeInterval = 15

  for (let i = 0; i < colSlot; i++) {
    const currentTime = startTime + i * timeInterval
    const hours = Math.floor(currentTime / 60)
    const minutes = currentTime % 60
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`

    const findTime = findDay.find(item => item.time.start === formattedTime)
    if (findTime) {
      const colSpan = calculateNumberOfCols(
        findTime.time.start,
        findTime.time.end,
        timeInterval
      )
      i += colSpan - 1
      timeSlot.push({ ...findTime, colSpan })
    } else {
      timeSlot.push(undefined)
    }
  }
  return timeSlot
}

const calculateNumberOfCols = (
  startTime: string,
  endTime: string,
  intervalMinutes: number
): number => {
  const startMinutes = convertToMinutes(startTime)
  const endMinutes = convertToMinutes(endTime)

  return (endMinutes - startMinutes) / intervalMinutes
}

const convertToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

export { downloadBlob, createTimeSlot }
