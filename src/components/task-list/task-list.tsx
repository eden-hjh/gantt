import React, { useEffect, useRef } from "react";
import { BarTask } from "../../types/bar-task";
import { Task } from "../../types/public-types";
import { GanttEvent } from "../../types/gantt-task-actions";
import styles from "./task-list.module.css";

export type TaskListProps = {
  columns: any[];
  headerHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  rowHeight: number;
  rowCount?: number;
  ganttHeight: number;
  scrollY: number;
  locale: string;
  tasks: Task[];
  taskListRef: React.RefObject<HTMLDivElement>;
  horizontalContainerClass?: string;
  selectedTask: BarTask | undefined;
  setSelectedTask: (task: string) => void;
  onExpanderClick: (task: Task) => void;
  TaskListHeader: React.FC<{
    headerHeight: number;
    rowWidth: string;
    fontFamily: string;
    fontSize: string;
    columns: any[];
  }>;
  TaskListTable: React.FC<{
    columns: any[];
    rowHeight: number;
    rowCount?: number;
    rowWidth: string;
    fontFamily: string;
    fontSize: string;
    locale: string;
    tasks: Task[];
    selectedTaskId: string;
    ganttEvent: GanttEvent;
    setSelectedTask: (taskId: string) => void;
    onExpanderClick: (task: Task) => void;
  }>;
  ganttEvent: GanttEvent;
};

export const TaskList: React.FC<TaskListProps> = ({
  columns,
  headerHeight,
  fontFamily,
  fontSize,
  rowWidth,
  rowHeight,
  rowCount,
  scrollY,
  tasks,
  selectedTask,
  setSelectedTask,
  onExpanderClick,
  locale,
  ganttHeight,
  taskListRef,
  horizontalContainerClass,
  TaskListHeader,
  TaskListTable,
  ganttEvent
}) => {
  const horizontalContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (taskListRef.current) {
      taskListRef.current.scrollTop = scrollY;
    }
  }, [scrollY]);

  const headerProps = {
    columns,
    headerHeight,
    fontFamily,
    fontSize,
    rowWidth,
  };
  const selectedTaskId = selectedTask ? selectedTask.id : "";
  const tableProps = {
    columns,
    rowHeight,
    rowCount,
    rowWidth,
    fontFamily,
    fontSize,
    tasks,
    locale,
    selectedTaskId: selectedTaskId,
    ganttEvent,
    setSelectedTask,
    onExpanderClick,
  };

  return (
    <div className={styles.taskList} ref={taskListRef}>
      <TaskListHeader {...headerProps} />
      <div
        ref={horizontalContainerRef}
        className={horizontalContainerClass}
        style={ganttHeight ? { height: ganttHeight } : {}}
      >
        {/* <div> */}
          <TaskListTable {...tableProps} />
        {/* </div> */}
        
      </div>
    </div>
  );
};
