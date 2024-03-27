import React, { ReactChild } from "react";
import { ViewMode } from "../../types/public-types";
import { TopPartOfCalendar } from "./top-part-of-calendar";
import {
  getCachedDateTimeFormat,
  // getDaysInMonth,
  getLocalDayOfWeek,
  getLocaleMonth,
  getWeekNumberISO8601,
  getLocaleYear,
  getYearColumnWidth,
  startOfDate, getMonthColumnWidth, getDateColumnWidthByViewMode, addToDate,
  formatDate, getDateIsActive
} from "../../helpers/date-helper";
import { DateSetup } from "../../types/date-setup";
import classnames from 'classnames'
import styles from "./calendar.module.css";

export type CalendarProps = {
  dateSetup: DateSetup;
  locale: string;
  viewMode: ViewMode;
  rtl: boolean;
  headerHeight: number;
  columnWidth: number;
  svgWidth: number;
  fontFamily: string;
  fontSize: string;
};

export const Calendar: React.FC<CalendarProps> = ({
  dateSetup,
  locale,
  viewMode,
  rtl,
  headerHeight,
  columnWidth,
  svgWidth,
  fontFamily,
  // fontSize,
}) => {
  const getCalendarValuesForYear = () => {
    const topValues: ReactChild[] = [];
    const bottomValues: ReactChild[] = [];
    for (let i = 0; i < dateSetup.dates.length; i++) {
      const date = dateSetup.dates[i];
      if (
        i === 0 ||
        date.getFullYear() !== dateSetup.dates[i - 1].getFullYear()
      ) {
        const topValue = getLocaleYear(date, locale);

        topValues.push(
          <TopPartOfCalendar
            key={topValue}
            value={topValue}
            width={getYearColumnWidth(viewMode, date)}
          />
        );
      }
    }
    return [topValues, bottomValues];
  };

  const getCalendarValuesForQuarterYear = () => {
    const topValues: ReactChild[] = [];
    const bottomValues: ReactChild[] = [];
    const topDefaultHeight = headerHeight * 0.5;
    for (let i = 0; i < dateSetup.dates.length; i++) {
      const date = dateSetup.dates[i];
      // const bottomValue = getLocaleMonth(date, locale);
      const quarter = "Q" + Math.floor((date.getMonth() + 3) / 3);

      const isActive = getDateIsActive(date, viewMode)

      bottomValues.push(
        <div
          key={date.getTime()}
          className={classnames(styles.calendarHeader_bottom_item,  {
            [styles.calendarHeader_bottom_item_active]: isActive
          })}
          style={{ width: getDateColumnWidthByViewMode(viewMode, date), height: 44 }}
        >
          {quarter}
        </div>
      );
      if (
        i === 0 ||
        date.getFullYear() !== dateSetup.dates[i - 1].getFullYear()
      ) {
        const topValue = getLocaleYear(date, locale)
        // console.log('QuarterYear',  i, topValue, date.getMonth(), date)
        let xText: number;
        if (rtl) {
          xText = (6 + i + date.getMonth() + 1) * columnWidth;
        } else {
          xText = (6 + i - date.getMonth()) * columnWidth;
        }
        let percent = 1
        const curMonth = date.getMonth()

        if(curMonth !== 0) {
          const curYearStartDay = startOfDate(date, "year")
          const nextYearStartDat = dateSetup.dates[i - 1] || startOfDate(addToDate(date, 1, 'year'), "year")

          percent = (nextYearStartDat.getTime() - date.getTime()) /  (nextYearStartDat.getTime() - curYearStartDay.getTime())
        }

        topValues.push(
          <TopPartOfCalendar
            key={topValue}
            value={topValue}
            x1Line={columnWidth * i}
            y1Line={0}
            y2Line={headerHeight * 0.5}
            xText={Math.abs(xText)}
            yText={topDefaultHeight * 0.9}
            width={getYearColumnWidth(viewMode, date) * percent}
          />
        );
      }
    }
    return [topValues, bottomValues];
  };

  const getCalendarValuesForMonth = () => {
    const topValues: ReactChild[] = [];
    const bottomValues: ReactChild[] = [];
    // const topDefaultHeight = headerHeight * 0.35;
    const dates = dateSetup.dates;
    let preRecordI = 0
    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];
      const bottomValue = getLocaleMonth(date, locale);

      const isActive = getDateIsActive(date, viewMode)
      
      bottomValues.push(
        <div
          key={'month'+date.getTime()}
          className={classnames(styles.calendarHeader_bottom_item,  {
            [styles.calendarHeader_bottom_item_active]: isActive
          })}
          style={{ width: getMonthColumnWidth(viewMode, date) }}
        >
          <div>
            {bottomValue}
          </div>
        </div>  
      );

      if (
        i === dates.length -1 ||
        date.getFullYear() !== dates[i + 1]?.getFullYear()
      ) {
        const topValue = getLocaleYear(date, locale)
        let xText: number;
        if (rtl) {
          xText = (6 + i + date.getMonth() + 1) * columnWidth;
        } else {
          xText = (6 + i - date.getMonth()) * columnWidth;
        }
        
        const curYearDates = dates.slice(preRecordI, i + 1)
        const yearWidth = curYearDates.reduce((preCount, cur) => {
          // console.log('yearWidth1 month',  cur.getFullYear(), cur.getMonth() )
          return preCount + getMonthColumnWidth(viewMode, cur)
        }, 0)

        preRecordI = i

        topValues.push(
          <TopPartOfCalendar
            key={topValue}
            value={topValue}
            x1Line={columnWidth * i}
            y1Line={0}
            y2Line={headerHeight * 0.5}
            xText={xText}
            yText={headerHeight * 0.3}
            width={yearWidth}
          />
        );
      }
    }
    return [topValues, bottomValues];
  };

  const getCalendarValuesForWeek = () => {
    const topValues: ReactChild[] = [];
    const bottomValues: ReactChild[] = [];
    let weeksCount: number = 1;
    // const topDefaultHeight = headerHeight * 0.35;
    const dates = dateSetup.dates;
    for (let i = dates.length - 1; i >= 0; i--) {
      const date = dates[i];
      let topValue = "";
      if (i === 0 || date.getMonth() !== dates[i - 1].getMonth()) {
        // top
        topValue = `${getLocaleYear(date, locale)}${getLocaleMonth(date, locale)}`;
      }
      // bottom
      const bottomValue = `${getWeekNumberISO8601(date)}周`;

      const isActive = getDateIsActive(date, viewMode)

      bottomValues.unshift(
        <div
          key={'week'+date.getTime()}
          className={classnames(styles.calendarHeader_bottom_item, styles.calendarHeader_bottom_item_vertical,  {
            [styles.calendarHeader_bottom_item_active]: isActive
          })}
          style={{ width: getDateColumnWidthByViewMode(viewMode, date)}}
        >
          <div>{bottomValue}</div>
          <div className={styles.calendarHeader_bottom_item_sub}>{formatDate(date)}-{formatDate(addToDate(date, 6, "day"))}</div>
        </div>  
      );

      if (topValue) {
        // if last day is new month
        if (i !== dates.length - 1) {
          // console.log('week', date, weeksCount)
          let percent = 1
          if(weeksCount < 4) {
            const nextMonthFirstDay = startOfDate(addToDate(date, 1, 'month'), 'month')
            const curMonthFirstDay = startOfDate(addToDate(date, 0, 'month'), 'month')

            percent = (nextMonthFirstDay.getTime() - date.getTime()) / (nextMonthFirstDay.getTime() - curMonthFirstDay.getTime())
          }
          topValues.unshift(
            <TopPartOfCalendar
              key={topValue}
              value={topValue}
              width={getMonthColumnWidth(viewMode, date) * percent}
            />
          );
        }
        weeksCount = 0;
      }
      weeksCount++;
    }
    return [topValues, bottomValues];
  };

  const getCalendarValuesForDay = () => {
    const topValues: ReactChild[] = [];
    const bottomValues: ReactChild[] = [];
    const dates = dateSetup.dates;
    let dayCount = 1
    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];

      const weekDay = getLocalDayOfWeek(date, locale, "short")
      const day = date.getDate(); 
      const paddedDay = (day < 10 ? '0' : '') + day;  

      const isActive = getDateIsActive(date, viewMode)

      bottomValues.push(
        <div
          key={'day'+date.getTime()}
          className={classnames(styles.calendarHeader_bottom_item, styles.calendarHeader_bottom_item_vertical, {
            [styles.calendarHeader_bottom_item_active]: isActive
          })}
          style={{ width: getDateColumnWidthByViewMode(viewMode, date), height: 44, left: columnWidth * i, top: headerHeight * 0.5 - 1 }}
        >
          <div>{paddedDay}</div>
          <div className={styles.calendarHeader_bottom_item_sub}>{weekDay[1]}</div> 
        </div>  
      );

      // dayCount用于计算当前月有多少天
      if(date.getMonth() === dates[i + 1]?.getMonth()) {
        dayCount++
      }

      if (
        (
        date.getMonth() !== dates[i + 1]?.getMonth())
      ) {
        const curMonth = getLocaleMonth(date, locale);
        const curYear = getLocaleYear(date, locale)

        const percent = (dayCount / date.getDate()) || 1
        dayCount = 1
        topValues.push(
          <TopPartOfCalendar
            key={curMonth + date.getFullYear()}
            value={curYear + curMonth}
            width={getMonthColumnWidth(viewMode, date) * percent}
          />
        );
      }
    }
    return [topValues, bottomValues];
  };

  const getCalendarValuesForPartOfDay = () => {
    const topValues: ReactChild[] = [];
    const bottomValues: ReactChild[] = [];
    const ticks = viewMode === ViewMode.HalfDay ? 2 : 4;
    const topDefaultHeight = headerHeight * 0.5;
    const dates = dateSetup.dates;
    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];
      const bottomValue = getCachedDateTimeFormat(locale, {
        hour: "numeric",
      }).format(date);
      // console.log('bottomValue', bottomValue)
      bottomValues.push(
        <text
          key={date.getTime()}
          y={headerHeight * 0.8}
          x={columnWidth * (i + +rtl)}
          className={styles.calendarBottomText}
          fontFamily={fontFamily}
        >
          {bottomValue}
        </text>
      );
      if (i === 0 || date.getDate() !== dates[i - 1].getDate()) {
        const topValue = `${getLocalDayOfWeek(
          date,
          locale,
          "short"
        )}, ${date.getDate()} ${getLocaleMonth(date, locale)}`;
        topValues.push(
          <TopPartOfCalendar
            key={topValue + date.getFullYear()}
            value={topValue}
            x1Line={columnWidth * i + ticks * columnWidth}
            y1Line={0}
            y2Line={topDefaultHeight}
            xText={columnWidth * i + ticks * columnWidth * 0.5}
            yText={topDefaultHeight * 0.9}
          />
        );
      }
    }

    return [topValues, bottomValues];
  };

  const getCalendarValuesForHour = () => {
    const topValues: ReactChild[] = [];
    const bottomValues: ReactChild[] = [];
    const topDefaultHeight = headerHeight * 0.5;
    const dates = dateSetup.dates;
    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];
      const bottomValue = getCachedDateTimeFormat(locale, {
        hour: "numeric",
      }).format(date);

      bottomValues.push(
        <text
          key={date.getTime()}
          y={headerHeight * 0.8}
          x={columnWidth * (i + +rtl)}
          className={styles.calendarBottomText}
          fontFamily={fontFamily}
        >
          {bottomValue}
        </text>
      );
      if (i !== 0 && date.getDate() !== dates[i - 1].getDate()) {
        const displayDate = dates[i - 1];
        const topValue = `${getLocalDayOfWeek(
          displayDate,
          locale,
          "long"
        )}, ${displayDate.getDate()} ${getLocaleMonth(displayDate, locale)}`;
        const topPosition = (date.getHours() - 24) / 2;
        topValues.push(
          <TopPartOfCalendar
            key={topValue + displayDate.getFullYear()}
            value={topValue}
            x1Line={columnWidth * i}
            y1Line={0}
            y2Line={topDefaultHeight}
            xText={columnWidth * (i + topPosition)}
            yText={topDefaultHeight * 0.9}
          />
        );
      }
    }

    return [topValues, bottomValues];
  };

  let topValues: ReactChild[] = [];
  let bottomValues: ReactChild[] = [];
  switch (dateSetup.viewMode) {
    case ViewMode.Year:
      [topValues, bottomValues] = getCalendarValuesForYear();
      break;
    case ViewMode.QuarterYear:
      [topValues, bottomValues] = getCalendarValuesForQuarterYear();
      break;
    case ViewMode.Month:
      [topValues, bottomValues] = getCalendarValuesForMonth();
      break;
    case ViewMode.Week:
      [topValues, bottomValues] = getCalendarValuesForWeek();
      break;
    case ViewMode.Day:
      [topValues, bottomValues] = getCalendarValuesForDay();
      break;
    case ViewMode.QuarterDay:
    case ViewMode.HalfDay:
      [topValues, bottomValues] = getCalendarValuesForPartOfDay();
      break;
    case ViewMode.Hour:
      [topValues, bottomValues] = getCalendarValuesForHour();
  }
  return (
    <div className="calendar">
      <div
        style={{ width: svgWidth, height: headerHeight }}
        // x={0}
        // y={0}
        // width={columnWidth * dateSetup.dates.length}
        // height={headerHeight}
        className={styles.calendarHeader}
        // fill="#fafafa"
      >
        <div className={styles.calendarHeader_top}>
          {topValues}
        </div> 
        {
          bottomValues.length > 0 && (
            <div className={styles.calendarHeader_bottom}>
              {bottomValues}
            </div>
          )
        }
      </div>
    </div>
  );
};
