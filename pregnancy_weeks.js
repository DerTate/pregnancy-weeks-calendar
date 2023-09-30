// Copyright © 2023 DerTate (https://github.com/DerTate)

function generateICalFile(dueDate) {
  var dueDate = new Date(dueDate);

  // Adjust for the local time zone offset
  var timeZoneOffset = dueDate.getTimezoneOffset();
  dueDate.setMinutes(dueDate.getMinutes() + timeZoneOffset);

  var startDate = new Date(dueDate);
  startDate.setDate(startDate.getDate() - 279);

  const calendarEvents = [];

  for (let i = 1; i <= 40; i++) {
    const weekStartDate = new Date(startDate);
    weekStartDate.setDate(weekStartDate.getDate() + (i - 1) * 7);

    const weekEndDate = new Date(weekStartDate);
    weekEndDate.setDate(weekEndDate.getDate() + 7);

    const weekEvent = {
      summary: `Week ${i} of Pregnancy`,
      description: `Click <a href="https://www.thebump.com/pregnancy-week-by-week/${i}-weeks-pregnant">here</a> for information about the baby's development, pregnancy symptoms, and tasks this week.`,
      start: formatDateForICal(weekStartDate),
      end: formatDateForICal(weekEndDate),
      allDay: true
    };

    calendarEvents.push(weekEvent);
  }

  const secondTrimesterStartDate = new Date(startDate);
  secondTrimesterStartDate.setDate(secondTrimesterStartDate.getDate() + 13 * 7);
  const thirdTrimesterStartDate = new Date(secondTrimesterStartDate);
  thirdTrimesterStartDate.setDate(thirdTrimesterStartDate.getDate() + 14 * 7);

  const firstTrimesterStart = {
    summary: 'First Trimester Start',
    description: `Click <a href="https://www.thebump.com/topics/first-trimester">here</a> for information about the first trimester.`,
    start: formatDateForICal(startDate),
    end: formatDateForICal(startDate),
    allDay: true
  };

  const secondTrimesterStart = {
    summary: 'Second Trimester Start',
    description: `Click <a href="https://www.thebump.com/topics/second-trimester">here</a> for information about the second trimester.`,
    start: formatDateForICal(secondTrimesterStartDate),
    end: formatDateForICal(secondTrimesterStartDate),
    allDay: true
  };

  const thirdTrimesterStart = {
    summary: 'Third Trimester Start',
    description: `Click <a href="https://www.thebump.com/topics/third-trimester">here</a> for information about the second trimester.`,
    start: formatDateForICal(thirdTrimesterStartDate),
    end: formatDateForICal(thirdTrimesterStartDate),
    allDay: true
  };

  const dueDateEvent = {
    summary: 'Due Date',
    description: `Here comes Baby!`,
    start: formatDateForICal(new Date(dueDate)),
    end: formatDateForICal(new Date(dueDate)),
    allDay: true
  };

  calendarEvents.push(
    firstTrimesterStart,
    secondTrimesterStart,
    thirdTrimesterStart,
    dueDateEvent
  );

  let iCalData = 'BEGIN:VCALENDAR\r\nVERSION:2.0\r\n';

  calendarEvents.forEach((event) => {
    iCalData += 'BEGIN:VEVENT\r\n';
    iCalData += `SUMMARY:${event.summary}\r\n`;
    iCalData += `DESCRIPTION:${event.description}\r\n`,
    iCalData += `DTSTART;VALUE=DATE:${event.start}\r\n`;
    iCalData += `DTEND;VALUE=DATE:${event.end}\r\n`;
    iCalData += 'END:VEVENT\r\n';
  });

  iCalData += 'END:VCALENDAR';

  return iCalData;
}

function formatDateForICal(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

function generateICalFileAndDownload() {
  const dueDate = document.getElementById('dueDate').value;
  const iCalFile = generateICalFile(dueDate);

  const element = document.createElement('a');
  const file = new Blob([iCalFile], { type: 'text/calendar' });
  element.href = URL.createObjectURL(file);
  element.download = 'pregnancy_calendar.ics';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
