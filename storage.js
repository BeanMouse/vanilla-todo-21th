const StorageKey = "todoData";
//데이터 저장
export const saveData = (todoData) => {
  localStorage.setItem(StorageKey, JSON.stringify(todoData));
};
//데이터 로드
export const loadData = () => {
  const localStorageData = localStorage.getItem(StorageKey);
  if (localStorageData) {
    return JSON.parse(localStorageData);
  }
  return {};
};
//데이터 추가
export const addData = (date, todo, todoData) => {
  if (!todoData[date]) {
    todoData[date] = [];
  }
  todoData[date].push(todo);
  saveData(todoData);
};
//데이터 삭제
export const deleteData = (date, index, todoData) => {
  todoData[date].splice(index, 1);
  saveData(todoData);
};
