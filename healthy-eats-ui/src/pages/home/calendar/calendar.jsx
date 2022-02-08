import { useState } from 'react';
import { getFirstOfMonth, getFirstOfWeek, dayNames, getMonthWeeks, addMonths, getMonthName } from '../../../services/calendarService'
import './calendar.scss'
import { CalendarRow } from './calendarRow';

export function Calendar() {

    let [current, setCurrent] = useState(new Date());


    let fom = getFirstOfMonth(current);
    let fow = getFirstOfWeek(fom);

    var weeks = getMonthWeeks(fow);

    const monthName = getMonthName(current);

    const days = [0, 1, 2, 3, 4, 5, 6];

    return <div className="calendar">
        <div className="calendar-navigtion">
            <button
                onClick={() => setCurrent(addMonths(current, -1))}>
                {'<<'} Prev
            </button>

            <span className="calendar-navigtion-monthName">{monthName} - {current.getFullYear()}</span>

            <button
                onClick={() => setCurrent(addMonths(current, 1))}>
                Next {'>>'}
            </button>
        </div>

        <div className="calendar-header-row">
            {days.map((day, index) => <div className="calendar-header-row-cell">{dayNames[index]}</div>)}
        </div>

        {weeks.map((week, index) => <CalendarRow startOfWeek={week} key={`week-${index}`} />)}
    </div>
}