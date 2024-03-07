import { Task } from "../../dist/types/public-types";

export function initTasks() {
  const currentDate = new Date();
  const tasks: any[] = [
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        2,
        12,
        28
      ),
      start1: new Date(currentDate.getFullYear(), currentDate.getMonth(), 6),
      end1: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 5,
        8,
        12,
        28
      ),
      name: "Idea",
      id: "Task 0",
      progress: 45,
      type: "task",
      displayOrder: 2,
      taskItems: [{
        id: '1',
        name: '', // 任务条上显示的名称
        start: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
        end: new Date(currentDate.getFullYear(),currentDate.getMonth(),2),
        styles: {
          backgroundColor: '#276ff5'
        },
        isDisabled: true
      }, {
        id: '2',
        name: '', // 任务条上显示的名称
        start: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 4),
        end: new Date(currentDate.getFullYear(),currentDate.getMonth() + 2,6),
        styles: {
          backgroundColor: '#ff991c'
        },
        isDisabled: true,
        dependencies: []
      }]
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4, 0, 0),
      name: "Research",
      id: "Task 1",
      progress: 25,
      dependencies: ["Task 0"],
      type: "task",
      displayOrder: 3,
      taskItems: [{
        id: '3',
        name: '', // 任务条上显示的名称
        start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
        end: new Date(currentDate.getFullYear(),currentDate.getMonth(), 2),
        styles: {
          backgroundColor: '#276ff5'
        },
        isDisabled: true
      }, {
        id: '4',
        name: '', // 任务条上显示的名称
        start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
        end: new Date(currentDate.getFullYear(),currentDate.getMonth(),7),
        styles: {
          backgroundColor: '#ff991c'
        },
        isDisabled: true,
        dependencies: []
      }]
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8, 0, 0),
      name: "Discussion with team",
      id: "Task 2",
      progress: 10,
      dependencies: ["Task 1"],
      type: "task",
      displayOrder: 4,
      taskItems: [{
        id: '5',
        name: '', // 任务条上显示的名称
        start: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 4),
        end: new Date(currentDate.getFullYear(),currentDate.getMonth()-1,20),
        styles: {
          backgroundColor: '#276ff5'
        },
        isDisabled: true
      }, {
        id: '6',
        name: '', // 任务条上显示的名称
        start: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 8),
        end: new Date(currentDate.getFullYear(),currentDate.getMonth(),6),
        styles: {
          backgroundColor: '#ff991c'
        },
        isDisabled: true,
        dependencies: []
      }]
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 9, 0, 0),
      name: "Developing",
      id: "Task 3",
      progress: 2,
      dependencies: ["Task 2"],
      type: "task",
      displayOrder: 5,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
      name: "Review",
      id: "Task 4",
      type: "task",
      progress: 70,
      dependencies: ["Task 2"],
      project: "ProjectSample",
      displayOrder: 6,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      name: "Release",
      id: "Task 6",
      progress: currentDate.getMonth(),
      type: "task",
      dependencies: ["Task 4"],
      displayOrder: 7,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 19),
      name: "Party Time",
      id: "Task 9",
      progress: 0,
      isDisabled: true,
      type: "task",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 19),
      name: "Party Time",
      id: "Task 10",
      progress: 0,
      isDisabled: true,
      type: "task",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 19),
      name: "Party Time",
      id: "Task 11",
      progress: 0,
      isDisabled: true,
      type: "task",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 19),
      name: "Party Time",
      id: "Task 12",
      progress: 0,
      isDisabled: true,
      type: "task",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 19),
      name: "Party Time",
      id: "Task 13",
      progress: 0,
      isDisabled: true,
      type: "task",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 19),
      name: "Party Time",
      id: "Task 14",
      progress: 0,
      isDisabled: true,
      type: "task",
    },
    // {
    //   start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
    //   end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 19),
    //   name: "Party Time",
    //   id: "Task 15",
    //   progress: 0,
    //   isDisabled: true,
    //   type: "task",
    // },
    // {
    //   start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
    //   end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 19),
    //   name: "Party Time",
    //   id: "Task 16",
    //   progress: 0,
    //   isDisabled: true,
    //   type: "task",
    // },
    // {
    //   start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
    //   end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 19),
    //   name: "Party Time",
    //   id: "Task 17",
    //   progress: 0,
    //   isDisabled: true,
    //   type: "task",
    // },
    // {
    //   start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
    //   end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 19),
    //   name: "Party Time",
    //   id: "Task 18",
    //   progress: 0,
    //   isDisabled: true,
    //   type: "task",
    // },
  ];
  return tasks;
}

export const columns = [
  // { code: 'No', name: '序号', width: 60, align: 'center' },
  { code: 'name', name: '名称', width: 200 },
  { code: 'start', name: '开始时间', width: 200 },
  { code: 'end', name: '结束时间', width: 200 }
]

export function getStartEndDateForProject(tasks: Task[], projectId: string) {
  const projectTasks = tasks.filter(t => t.project === projectId);
  let start = projectTasks[0].start;
  let end = projectTasks[0].end;

  for (let i = 0; i < projectTasks.length; i++) {
    const task = projectTasks[i];
    if (start.getTime() > task.start.getTime()) {
      start = task.start;
    }
    if (end.getTime() < task.end.getTime()) {
      end = task.end;
    }
  }
  return [start, end];
}
