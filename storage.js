const StorageKey = "todoData";

export const saveData = (todoData) => {
  localStorage.setItem(StorageKey, JSON.stringify(todoData));
};

export const loadData = () => {
  if (localStorage.getItem(StorageKey)) {
    return JSON.parse(localStorage.getItem(StorageKey));
  }
  return {};
};

export const addData = (date, todo, todoData) => {
  if (!todoData[date]) {
    todoData[date] = [];
  }
  todoData[date].push(todo);
  saveData(todoData);
};

export const deleteData = (date, index, todoData) => {
  todoData[date].splice(index, 1);
  saveData(todoData);
};
