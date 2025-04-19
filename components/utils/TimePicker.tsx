import React from 'react'

interface TimePickerProps {
	label?: string
	value: Date
	onChange: (value: Date) => void
	min?: string
	max?: string
	step?: number
	disabled?: boolean
}

const formatTimeValue = (date: Date): string => {
	const hours = String(date.getHours()).padStart(2, '0')
	const minutes = String(date.getMinutes()).padStart(2, '0')
	return `${hours}:${minutes}`
}

const TimePicker: React.FC<TimePickerProps> = ({
	label,
	value,
	onChange,
	min,
	max,
	step = 60,
	disabled = false,
}) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const [hours, minutes] = e.target.value.split(':').map(Number)
		const newDate = new Date(value)
		newDate.setHours(hours, minutes, 0, 0)
		onChange(newDate)
	}

	return (
		<div className='flex flex-col gap-1'>
			{label && <label className='font-medium'>{label}</label>}
			<input
				type='time'
				value={formatTimeValue(value)}
				onChange={handleChange}
				min={min}
				max={max}
				step={step}
				disabled={disabled}
				className='border border-gray-300 p-2 rounded-md shadow-sm'
			/>
		</div>
	)
}

export default TimePicker
