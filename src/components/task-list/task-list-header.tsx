import React from "react";
import styles from "./task-list-header.module.css";

const alignMap = {
  'left': 'flex-start',
  'center': 'center',
  'right': 'flex-end'
}

export const TaskListHeaderDefault: React.FC<{
  headerHeight: number;
  // rowWidth: string;
  fontFamily: string;
  fontSize: string;
  columns: any[]
}> = ({ headerHeight, fontFamily, fontSize, columns }) => {
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
          height: headerHeight,
        }}
      >
        {
          columns?.map((column) => {
            const {
              code,
              name,
              width,
              align = 'left'
            } = column || {}
            return (
              <div
                key={code}
                className={styles.ganttTable_HeaderItem}
                style={{
                  width: width || 160,
                  justifyContent: alignMap[align] || alignMap.left
                  // minWidth: rowWidth,
                }}
              >
                <div className={styles.ganttTable_HeaderItem_name}>{name}</div>
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
