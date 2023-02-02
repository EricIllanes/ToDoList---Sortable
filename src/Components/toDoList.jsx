import { useState } from "react";
import deleteIcon from "../assets/deleteicon.svg";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useEffect } from "react";

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const ToDoList = ({tareas, setTareas}) => {
  // const [tareas, setTareas] = useState([]);
  const [task, setTask] = useState("");

  const onHandleChange = (e) => {
    setTask(e.target.value);
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    setTareas((prevTask) => [
      ...prevTask,
      { id: Date.now(), task: task, isCompleted: false },
    ]);
    setTask("");
  };

  const deleteTask = (id) => {
    setTareas((prevTask) => prevTask.filter((task) => task.id !== id));
  };

  const completeTask = (id) => {
    setTareas((prevTask) =>
      prevTask.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };
  return (
    <div className="flex justify-center flex-col">
      <DragDropContext
        onDragEnd={(result) => {
          const { source, destination } = result;
          if (!destination) {
            return;
          }
          if (
            source.index === destination.index &&
            source.droppableId === destination.droppableId
          ) {
            return;
          }

          setTareas((prevTasks) =>
            reorder(prevTasks, source.index, destination.index)
          );
        }}
      >
        <form
          onSubmit={(event) => onHandleSubmit(event)}
          className="flex w-full justify-center"
        >
          <input
            onChange={(event) => onHandleChange(event)}
            name="name"
            placeholder="Agrega una tarea..."
            value={task}
            autoComplete="off"
            className="flex w-3/4 rounded-md border border-gray-300 focus:border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-700 py-1 px-1.5 text-gray-500"
          />
        </form>
        <div className="flex flex-col my-4">
        {tareas.length >= 1 ?
        <div className="flex w-3/4 self-center">
 <span className="flex text-xs text-gray-600">***Puedes arrastrar las tareas para ordenarlas</span>
        </div>
       
        :
        <span className="flex ml-24"></span>    
    }
          <Droppable droppableId="tasks">
            {(droppableProvided) => (
              <div
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
                className="flex flex-col w-full justify-center items-center"
              >
                {tareas.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={`${task.id}`}
                    index={index}
                  >
                    {(draggableProvided) => (
                      <div
                        {...draggableProvided.draggableProps}
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.dragHandleProps}
                        className="bg-white cursor-pointer mt-4 flex w-2/3 self-center rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                      >
                        <input
                          type="checkbox"
                          className=" w-6 rounded-full mr-4 checked:bg-blue-400"
                          onClick={() => {
                            completeTask(task.id);
                          }}
                        />
                        {task.isCompleted ? (
                          <span className="line-through text-gray-400 italic">
                            {task.task}
                          </span>
                        ) : (
                          <span className="text-gray-800">{task.task}</span>
                        )}

                        <button
                          className=" flex justify-center w-6 ml-auto self-center"
                          onClick={() => {
                            deleteTask(task.id);
                          }}
                        >
                          <img
                            src={deleteIcon}
                            alt="delete"
                            className="w-6 hover:scale-125"
                          />
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default ToDoList;