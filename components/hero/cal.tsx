import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  viewMonthGrid,
  viewMonthAgenda,
} from '@schedule-x/calendar'

const CalendarView = () => {
	const calendar = useCalendarApp({
		defaultView: viewMonthGrid.name,
		views: [viewMonthAgenda],
		events: [
		  {
			id: '1',
			title: 'Event 1',
			start: '2023-12-16',
			end: '2023-12-16',
		  },
		],
	  })

	return <ScheduleXCalendar calendarApp={calendar} />
}

export default CalendarView
