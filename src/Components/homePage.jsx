import { useState } from "react";
import NavBar from "./navBar";
import ToDoList from "./toDoList";

const HomePage = () => {

  const dataUser = JSON.parse(localStorage.getItem("profileData"));
  
  const [tareas, setTareas] = useState([]);

  function cleanCompletedTask() {
    let completedTask = tareas.filter((task) => task.isCompleted === false);
    setTareas(completedTask);
  }

  return (
    <div className="min-h-screen">
      <div className="bg-homebackground  bg-center bg-cover relative block h-[400px]">
        <NavBar />
      </div>
      <div className="flex flex-col">
        <div className="relative flex justify-center -mt-12">
          <div className="bg-gradient-to-t from-purple-100 via-rose-200 to-sky-200 w-3/5 rounded-xl  flex flex-col justify-self-center min-h-[450px]">
            <div className="w-full flex flex-row justify-between ">
              <div>
                <span className=" mt-4 ml-4 flex self-start">
                  <p className=" text-2xl self-start font-bold hover:text-green-400">
                    Hola
                  </p>
                  <p className="ml-2 text-blue-400 text-2xl font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-400 to-green-500">
                    {dataUser.name}
                  </p>
                  <p className=" text-2xl self-start font-bold hover:text-green-400">
                    ,
                  </p>
                </span>
                <span className="flex self-start">
                  <p className=" mt-4 ml-4 text-lg font-bold">
                    Qué haremos hoy?
                  </p>
                </span>
              </div>
              <div className="flex items-center mx-4">
                <button
                  className="w-28 h-12 mx-2 text-center text-white bg-slate-800 hover:bg-slate-600 rounded-md"
                  onClick={() => {
                    cleanCompletedTask();
                  }}
                >
                  Eliminar Completadas
                </button>
                <button
                  className="w-28 h-12 mx-2 text-center text-white bg-slate-800 hover:bg-slate-600 rounded-md"
                  onClick={() => {
                    setTareas([]);
                  }}
                  s
                >
                  Eliminar Lista
                </button>
              </div>
            </div>
            <div className="my-12 w-full">
              <ToDoList setTareas={setTareas} tareas={tareas}></ToDoList>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
