import React, { useState } from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is imported

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date: Date | string | moment.Moment) => {
    if (date instanceof Date) {
      setSelectedDate(date);
    } else if (typeof date === 'string') {
      setSelectedDate(new Date(date));
    } else if (date && date.toDate) {
      setSelectedDate(date.toDate());
    }
  };

  return (
    <div className="relative">
        <div className="absolute bg-white border rounded-md shadow-lg z-10">
          <Datetime
            value={selectedDate}
            input={true}
            onChange={handleDateChange}
            className="w-full p-2 border border-gray-300 focus:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg"
          />
        </div>
    </div>
  );
};

export default DatePicker;
