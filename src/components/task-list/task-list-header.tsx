import React from "react";
import styles from "./task-list-header.module.css";

export const TaskListHeaderDefault: React.FC<{
  headerHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  columns: any[]
}> = ({ headerHeight, fontFamily, fontSize, rowWidth, columns }) => {
  return (
    <div
      className={styles.ganttTable}
      style={{
        fontFamily: fontFamily,
        fontSize: fontSize,
      }}
    >
      <div
        className={styles.ganttTable_Header}
        style={{
          height: headerHeight - 2,
        }}
      >
        {
          columns?.map((column) => {
            const {
              code,
              name,
              width
            } = column || {}
            return (
              <div
                key={code}
                className={styles.ganttTable_HeaderItem}
                style={{
                  width: width || 200,
                  minWidth: rowWidth,
                }}
              >
                {name}
              </div>
            )
          })
        }
        {/* <div
          className={styles.ganttTable_HeaderItem}
          style={{
            minWidth: rowWidth,
          }}
        >
          &nbsp;Name
        </div> */}
        {/* <div
          className={styles.ganttTable_HeaderSeparator}
          style={{
            height: headerHeight * 0.5,
            marginTop: headerHeight * 0.2,
          }}
        /> */}
        {/* <div
          className={styles.ganttTable_HeaderItem}
          style={{
            minWidth: rowWidth,
          }}
        >
          &nbsp;From
        </div> */}
        {/* <div
          className={styles.ganttTable_HeaderSeparator}
          style={{
            height: headerHeight * 0.5,
            marginTop: headerHeight * 0.25,
          }}
        /> */}
        {/* <div
          className={styles.ganttTable_HeaderItem}
          style={{
            minWidth: rowWidth,
          }}
        >
          &nbsp;To
        </div> */}
      </div>
    </div>
  );
};
