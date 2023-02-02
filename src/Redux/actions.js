import axios from "axios";


export const LOGIN = "LOGIN";
export const ADD_TODO = "ADD_TODO";
export const COMPLETE_TASK = "COMPLETE_TASK";
export const DELETE_TASK = "DELETE_TASK";

export function loginSession(datos) {
  return async function (dispatch) {
    dispatch({
      type: LOGIN,
      payload: datos,
    });
  };
}
export function addTodo(task) {
  return async function (dispatch) {
    dispatch({
      type: ADD_TODO,
      payload: task,
    });
  };
}
export function completeTask(id) {
  return async function (dispatch) {
    dispatch({
      type: COMPLETE_TASK,
      payload: id,
    });
  };
}

export function deleteTask(id){
  return function(dispatch){
    dispatch(
      {
        type: DELETE_TASK,
        payload: id
      }
    )
  }
}
export function saveToDoList() {}
