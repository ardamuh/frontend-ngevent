import {
  START_FETCHING_ORGANIZERS,
  SUCCESS_FETCHING_ORGANIZERS,
  ERROR_FETCHING_ORGANIZERS,
} from "./constants";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const intialState = {
  data: [],
  keyword: "",
  status: statuslist.idle,
};

export default function reducer(state = intialState, action) {
  switch (action.type) {
    case START_FETCHING_ORGANIZERS:
      return { ...state, status: statuslist.process };

    case ERROR_FETCHING_ORGANIZERS:
      return { ...state, status: statuslist.error };

    case SUCCESS_FETCHING_ORGANIZERS:
      return {
        ...state,
        status: statuslist.success,
        data: action.organizers,
      };

    default:
      return state;
  }
}
