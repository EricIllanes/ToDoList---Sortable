import { ADD_TODO, COMPLETE_TASK, DELETE_TASK, LOGIN } from "./actions";

const initialState = {
  profileData: [],
  toDoSaved: [],
  toDo: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem('profileData', JSON.stringify({name: action.payload.name}));
      return {
        ...state,
        profileData: action.payload,
      };

    case ADD_TODO:
      return {
        ...state,
        toDo: [...state.toDo, action.payload],
      };

    case COMPLETE_TASK:
      let indexOfTask = state.toDo.findIndex(
        (task) => task.id === action.payload
      );
      return {
        ...state,
        toDo: state.toDo.map((task, index) => {
          if (index === indexOfTask) {
            return {
              ...task,
              isCompleted: !task.isCompleted,
            };
          } else {
            return task;
          }
        }),
      };

    case DELETE_TASK:
      return {
        ...state,
        toDo: state.toDo.filter((task) => task.id !== action.payload),
      };

    default:
      return state;
  }
}
