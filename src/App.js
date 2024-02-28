import { useRef, useState } from "react";

function App() {
  const [Tasks, setTasks] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const inputTask = useRef();
  const inputTitle = useRef();

  const ADD = () => {
    const valueTask = inputTask.current.value;
    const valueTitle = inputTitle.current.value;

    const allData = { completed: false, valueTask, valueTitle };

    if (valueTask != "" && valueTitle != "") {
      setTasks([...Tasks, allData]);

      inputTask.current.value = "";
      inputTitle.current.value = "";

      setShowTable(true);
    }
  };

  const itemDone = (Table) => {
    const newTasks = [...Tasks];

    newTasks[Table].completed = !newTasks[Table].completed;

    setTasks(newTasks);
  };

  const toDelete = (Table) => {
    const newTasks = [...Tasks];

    newTasks.splice(Table, 1);

    setTasks(newTasks);

    if (newTasks == 0) {
      setShowTable(false);
    }
  };

  const table = {
    display: showTable ? "block" : "none",
  };
  return (
    <>
      <div className="Tasks">
        <h2>To do list</h2>
        <input ref={inputTitle} placeholder="Enter new Title..." />
        <input ref={inputTask} placeholder="Enter new Task..." />

        <button onClick={ADD}>Add</button>
      </div>

      <table style={table}>
        <thead>
          <tr>
            <th className={"ol"}>N</th>
            <th>Title</th>
            <th>Task</th>
            <th>Done</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {Tasks.map(({ valueTask, valueTitle, completed }, Table) => {
            const AllTasks = Table + 1;
            return (
              <tr className={completed ? "done2" : ""}>
                <th
                  className={completed ? "done ol" : "ol"}
                  onClick={() => itemDone(Table)}
                >
                  {AllTasks})
                </th>
                <th
                  className={completed ? "done" : ""}
                  onClick={() => itemDone(Table)}
                >
                  {valueTitle}
                </th>
                <td
                  className={completed ? "done" : ""}
                  onClick={() => itemDone(Table)}
                >
                  {valueTask}
                </td>
                <td>
                  <ul>
                    <li
                      className={completed ? "done" : ""}
                      onClick={() => itemDone(Table)}
                    ></li>
                  </ul>
                </td>
                <td>
                  <span onClick={() => toDelete(Table)}>
                    <li className="delete"></li>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
