import { Task, ViewMode } from "../types/public-types";
import DateTimeFormatOptions = Intl.DateTimeFormatOptions;
import DateTimeFormat = Intl.DateTimeFormat;

type DateHelperScales =
  | "year"
  | "month"
  | "day"
  | "hour"
  | "minute"
  | "second"
  | "millisecond";

const intlDTCache = {};
export const getCachedDateTimeFormat = (
  locString: string | string[],
  opts: DateTimeFormatOptions = {}
): DateTimeFormat => {
  const key = JSON.stringify([locString, opts]);
  let dtf = intlDTCache[key];
  
  if (!dtf) {
    dtf = new Intl.DateTimeFormat(locString, opts);
    intlDTCache[key] = dtf;
  }
  // console.log('dtf',intlDTCache,  dtf)
  return dtf;
};

export const addToDate = (
  date: Date,
  quantity: number,
  scale: DateHelperScales
) => {
  const newDate = new Date(
    date.getFullYear() + (scale === "year" ? quantity : 0),
    date.getMonth() + (scale === "month" ? quantity : 0),
    date.getDate() + (scale === "day" ? quantity : 0),
    date.getHours() + (scale === "hour" ? quantity : 0),
    date.getMinutes() + (scale === "minute" ? quantity : 0),
    date.getSeconds() + (scale === "second" ? quantity : 0),
    date.getMilliseconds() + (scale === "millisecond" ? quantity : 0)
  );
  return newDate;
};

export const startOfDate = (date: Date, scale: DateHelperScales) => {
  const scores = [
    "millisecond",
    "second",
    "minute",
    "hour",
    "day",
    "month",
    "year",
  ];

  const shouldReset = (_scale: DateHelperScales) => {
    const maxScore = scores.indexOf(scale);
    return scores.indexOf(_scale) <= maxScore;
  };
  const newDate = new Date(
    date.getFullYear(),
    shouldReset("year") ? 0 : date.getMonth(),
    shouldReset("month") ? 1 : date.getDate(),
    shouldReset("day") ? 0 : date.getHours(),
    shouldReset("hour") ? 0 : date.getMinutes(),
    shouldReset("minute") ? 0 : date.getSeconds(),
    shouldReset("second") ? 0 : date.getMilliseconds()
  );
  return newDate;
};

// 获取甘特图时间范围
export const ganttDateRange = (
  tasks: Task[],
  viewMode: ViewMode,
  preStepsCount: number
) => {
  let newStartDate: Date = tasks[0]?.taskItems?.[0]?.start || new Date(0);
  let newEndDate: Date = tasks[0]?.taskItems?.[0]?.start  || new Date(0);

  // 获取最小和最大的时间
  for (const task of tasks) {
    const { taskItems = []} = task
    for(const taskItemConfig of taskItems) {
      if (taskItemConfig.start < newStartDate) {
        newStartDate = taskItemConfig.start;
      }
      if (taskItemConfig.end > newEndDate) {
        newEndDate = taskItemConfig.end;
      }
    }
  }

  // console.log('newEndDate start', newStartDate, newEndDate)
  
  switch (viewMode) {
    case ViewMode.Year:
      newStartDate = addToDate(newStartDate, -1, "year");
      newStartDate = startOfDate(newStartDate, "year");
      newEndDate = addToDate(newEndDate, 1, "year");
      newEndDate = startOfDate(newEndDate, "year");
      break;
    case ViewMode.QuarterYear:
      newStartDate = addToDate(newStartDate, -3, "month");
      newStartDate = startOfDate(newStartDate, "month");
      newEndDate = addToDate(newEndDate, 3, "year");
      newEndDate = startOfDate(newEndDate, "year");
      break;
    case ViewMode.Month:
      newStartDate = addToDate(newStartDate, -1 * preStepsCount, "month");
      newStartDate = startOfDate(newStartDate, "month");
      newEndDate = addToDate(newEndDate, 1, "year");
      newEndDate = startOfDate(newEndDate, "year");
      break;
    case ViewMode.Week:
      newStartDate = startOfDate(newStartDate, "day");
      newStartDate = addToDate(
        getMonday(newStartDate),
        -7 * preStepsCount,
        "day"
      );
      newEndDate = startOfDate(newEndDate, "day");
      newEndDate = addToDate(newEndDate, 1.5, "month");
      break;
    case ViewMode.Day:
      newStartDate = startOfDate(newStartDate, "day");
      newStartDate = addToDate(newStartDate, -1 * preStepsCount, "day");

      const daysInMonth = getDaysInMonth(newEndDate.getMonth(), newEndDate.getFullYear())
      const newEndDay = newEndDate.getDate()
      // 用当前月份多少天，减去结束日期当天。用于渲染当月后续不足的天数
      const apartDay = daysInMonth - newEndDay

      newEndDate = startOfDate(newEndDate, "day");
      newEndDate = addToDate(newEndDate, apartDay + 1, "day");
      break;
    case ViewMode.QuarterDay:
      newStartDate = startOfDate(newStartDate, "day");
      newStartDate = addToDate(newStartDate, -1 * preStepsCount, "day");
      newEndDate = startOfDate(newEndDate, "day");
      newEndDate = addToDate(newEndDate, 66, "hour"); // 24(1 day)*3 - 6
      break;
    case ViewMode.HalfDay:
      newStartDate = startOfDate(newStartDate, "day");
      newStartDate = addToDate(newStartDate, -1 * preStepsCount, "day");
      newEndDate = startOfDate(newEndDate, "day");
      newEndDate = addToDate(newEndDate, 108, "hour"); // 24(1 day)*5 - 12
      break;
    case ViewMode.Hour:
      newStartDate = startOfDate(newStartDate, "hour");
      newStartDate = addToDate(newStartDate, -1 * preStepsCount, "hour");
      newEndDate = startOfDate(newEndDate, "day");
      newEndDate = addToDate(newEndDate, 1, "day");
      break;
  }
  return [newStartDate, newEndDate];
};

export const seedDates = (
  startDate: Date,
  endDate: Date,
  viewMode: ViewMode
) => {
  let currentDate: Date = new Date(startDate);
  const dates: Date[] = [currentDate];
  while (currentDate < endDate) {
    switch (viewMode) {
      case ViewMode.Year:
        currentDate = addToDate(currentDate, 1, "year");
        break;
      case ViewMode.QuarterYear:
        currentDate = addToDate(currentDate, 3, "month");
        break;
      case ViewMode.Month:
        currentDate = addToDate(currentDate, 1, "month");
        break;
      case ViewMode.Week:
        currentDate = addToDate(currentDate, 7, "day");
        break;
      case ViewMode.Day:
        currentDate = addToDate(currentDate, 1, "day");
        break;
      case ViewMode.HalfDay:
        currentDate = addToDate(currentDate, 12, "hour");
        break;
      case ViewMode.QuarterDay:
        currentDate = addToDate(currentDate, 6, "hour");
        break;
      case ViewMode.Hour:
        currentDate = addToDate(currentDate, 1, "hour");
        break;
    }
    dates.push(currentDate);
  }
  return dates;
};

export const getLocaleYear = (date: Date, locale: string) => {
  let bottomValue = getCachedDateTimeFormat(locale, {
    year: "numeric",
  }).format(date);
  return bottomValue;
};

export const getLocaleMonth = (date: Date, locale: string) => {
  let bottomValue = getCachedDateTimeFormat(locale, {
    month: "2-digit",
  }).format(date);
  bottomValue = bottomValue.replace(
    bottomValue[0],
    bottomValue[0].toLocaleUpperCase()
  );
  return bottomValue;
};

export const getLocalDayOfWeek = (
  date: Date,
  locale: string,
  format?: "long" | "short" | "narrow" | undefined
) => {
  let bottomValue = getCachedDateTimeFormat(locale, {
    weekday: format,
  }).format(date);
  // console.log('getLocalDayOfWeek', bottomValue)
  bottomValue = bottomValue.replace(
    bottomValue[0],
    bottomValue[0].toLocaleUpperCase()
  );
  return bottomValue;
};

/**
 * Returns monday of current week
 * @param date date for modify
 */
const getMonday = (date: Date) => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  return new Date(date.setDate(diff));
};

export const getWeekNumberISO8601 = (date: Date) => {
  const tmpDate = new Date(date.valueOf());
  const dayNumber = (tmpDate.getDay() + 6) % 7;
  tmpDate.setDate(tmpDate.getDate() - dayNumber + 3);
  const firstThursday = tmpDate.valueOf();
  tmpDate.setMonth(0, 1);
  if (tmpDate.getDay() !== 4) {
    tmpDate.setMonth(0, 1 + ((4 - tmpDate.getDay() + 7) % 7));
  }
  const weekNumber = (
    1 + Math.ceil((firstThursday - tmpDate.valueOf()) / 604800000)
  ).toString();

  if (weekNumber.length === 1) {
    return `0${weekNumber}`;
  } else {
    return weekNumber;
  }
};

export const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getPaddedNumber = (num: number): string => {
  return (num < 10 ? '0' : '') + num;
}

export const getColumnWidthByViewMode = (viewMode: ViewMode) => {
  let columnWidth = 44;
  if (viewMode === ViewMode.Year) {
    columnWidth = 365;
  } else if (viewMode === ViewMode.Month) {
    columnWidth = 248;
  } else if (viewMode === ViewMode.Week) {
    columnWidth = 168;
  }

  return columnWidth
}

export const getTodayXByTimeMode = (viewMode: ViewMode) => {
  const columnWidth = getColumnWidthByViewMode(viewMode)

  let percentage = 0.5
  const now = new Date()

  if (viewMode === ViewMode.Year) {
  } else if (viewMode === ViewMode.Month) {
  } else if (viewMode === ViewMode.Week) {
  } else {
    const curMonth = now.getMonth()
    const curYear = now.getMonth()
    const curDate = now.getDate()

    const days = getDaysInMonth(curMonth, curYear)

    percentage = 0.5 || curDate / days
  }

  const x = percentage * columnWidth

  return x
}

export const formatData = (date: Date) => {
  const month = getPaddedNumber(date.getMonth() + 1)
  const day = getPaddedNumber(date.getDate())
  return `${date.getFullYear()}${month}${day}`
}

export const getDaysBetweenDates = (date1: Date, date2: Date) => {
  if(!date1 || !date2) {
    return 0
  }

  // 计算两个日期之间的毫秒差  
  var diff = Math.abs(+date2 - (+date1));  

  // 将毫秒差转换为天数  
  var days = Math.ceil(diff / (1000 * 60 * 60 * 24)); // 1000毫秒/秒 * 60秒/分钟 * 60分钟/小时 * 24小时/天  

  return days;  
}
