/*
 * @Author: jianhang_he jianhang_he@kingdee.com
 * @Date: 2024-02-20 16:05:14
 * @LastEditors: jianhang_he jianhang_he@kingdee.com
 * @LastEditTime: 2024-03-06 15:14:11
 * @FilePath: \gantt-task-react\src\components\task-list\task-list-table.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import styles from "./task-list-table.module.css";
import { Task } from "../../types/public-types";

// const localeDateStringCache = {};
// const toLocaleDateStringFactory =
//   (locale: string) =>
//   (date: Date, dateTimeOptions: Intl.DateTimeFormatOptions) => {
//     const key = date.toString();
//     let lds = localeDateStringCache[key];
//     if (!lds) {
//       lds = date.toLocaleDateString(locale, dateTimeOptions);
//       localeDateStringCache[key] = lds;
//     }
//     return lds;
//   };
// const dateTimeOptions: Intl.DateTimeFormatOptions = {
//   weekday: "short",
//   year: "numeric",
//   month: "long",
//   day: "numeric",
// };

export const TaskListTableDefault: React.FC<{
  columns: any[];
  rowHeight: number;
  rowCount?: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  locale: string;
  tasks: Task[];
  selectedTaskId: string;
  setSelectedTask: (taskId: string) => void;
  onExpanderClick: (task: Task) => void;
}> = ({
  columns,
  rowHeight,
  rowWidth,
  tasks,
  fontFamily,
  fontSize,
  // locale,
  // onExpanderClick,
}) => {
  // const toLocaleDateString = useMemo(
  //   () => toLocaleDateStringFactory(locale),
  //   [locale]
  // );

  return (
    <div
      className={styles.taskListWrapper}
      style={{
        fontFamily: fontFamily,
        fontSize: fontSize,
      }}
    >
      {tasks.map((t, i) => {
        // let expanderSymbol = "";
        // if (t.hideChildren === false) {
        //   expanderSymbol = "▼";
        // } else if (t.hideChildren === true) {
        //   expanderSymbol = "▶";
        // }

        const taskItemsCount = t.taskItems?.length || 1

        return (
          <div
            className={styles.taskListTableRow}
            style={{ height: rowHeight * taskItemsCount }}
            key={`${t.id}row`}
          >
            {
              columns?.map((column) => {
                const { code, width, render } = column || {}
                const value = t[code]
                return (
                  <div
                    key={code}
                    className={styles.taskListCell}
                    style={{
                      width: width || 200,
                      minWidth: rowWidth,
                      maxWidth: rowWidth,
                    }}
                    title={value}
                  >
                    { typeof render === 'function' ? render(value, t, i) : <div>{typeof value !== 'string' ? '' : value}</div>}
                    {/* <div className={styles.taskListNameWrapper}>
                      <div
                        className={
                          expanderSymbol
                            ? styles.taskListExpander
                            : styles.taskListEmptyExpander
                        }
                        onClick={() => onExpanderClick(t)}
                      >
                        {expanderSymbol}
                      </div>
                      <div>{t[code]}</div>
                    </div> */}
                  </div>
                )
              })
            }
            {/* <div
              className={styles.taskListCell}
              style={{
                minWidth: rowWidth,
                maxWidth: rowWidth,
              }}
              title={t.name}
            >
              <div className={styles.taskListNameWrapper}>
                <div
                  className={
                    expanderSymbol
                      ? styles.taskListExpander
                      : styles.taskListEmptyExpander
                  }
                  onClick={() => onExpanderClick(t)}
                >
                  {expanderSymbol}
                </div>
                <div>{t.name}</div>
              </div>
            </div>
            <div
              className={styles.taskListCell}
              style={{
                minWidth: rowWidth,
                maxWidth: rowWidth,
              }}
            >
              &nbsp;{toLocaleDateString(t.start, dateTimeOptions)}
            </div>
            <div
              className={styles.taskListCell}
              style={{
                minWidth: rowWidth,
                maxWidth: rowWidth,
              }}
            >
              &nbsp;{toLocaleDateString(t.end, dateTimeOptions)}
            </div> */}
          </div>
        );
      })}
    </div>
  );
};
