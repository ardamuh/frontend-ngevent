import {
  START_FETCHING_LISTS_CATEGORIES,
  SUCCESS_FETCHING_LISTS_CATEGORIES,
  ERROR_FETCHING_LISTS_CATEGORIES,
  START_FETCHING_LISTS_TALENTS,
  SUCCESS_FETCHING_LISTS_TALENTS,
  ERROR_FETCHING_LISTS_TALENTS,
  START_FETCHING_LISTS_EVENTS,
  SUCCESS_FETCHING_LISTS_EVENTS,
  ERROR_FETCHING_LISTS_EVENTS,
  START_FETCHING_LISTS_TICKETS,
  ERROR_FETCHING_LISTS_TICKETS,
  SUCCESS_FETCHING_LISTS_TICKETS,
  START_FETCHING_LISTS_ORGANIZERS,
  SUCCESS_FETCHING_LISTS_ORGANIZERS,
  ERROR_FETCHING_LISTS_ORGANIZERS,
} from "./constants";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  categories: [],
  statusCategories: statuslist.idle,
  talents: [],
  statusTalents: statuslist.idle,
  events: [],
  statusEvents: statuslist.idle,
  tickets: [],
  statusTickets: statuslist.idle,
  organizers: [],
  statusOrganizers: statuslist.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_LISTS_CATEGORIES:
      return { ...state, statusCategories: statuslist.process };

    case ERROR_FETCHING_LISTS_CATEGORIES:
      return { ...state, statusCategories: statuslist.error };

    case SUCCESS_FETCHING_LISTS_CATEGORIES:
      return {
        ...state,
        statusCategories: statuslist.success,
        categories: action.categories,
      };

    case START_FETCHING_LISTS_TALENTS:
      return { ...state, statusTalents: statuslist.process };

    case ERROR_FETCHING_LISTS_TALENTS:
      return { ...state, statusTalents: statuslist.error };

    case SUCCESS_FETCHING_LISTS_TALENTS:
      return {
        ...state,
        statusTalents: statuslist.success,
        talents: action.talents,
      };

    case START_FETCHING_LISTS_EVENTS:
      return { ...state, statusEvents: statuslist.process };

    case ERROR_FETCHING_LISTS_EVENTS:
      return { ...state, statusEvents: statuslist.error };

    case SUCCESS_FETCHING_LISTS_EVENTS:
      return {
        ...state,
        statusEvents: statuslist.success,
        events: action.events,
      };

    case START_FETCHING_LISTS_TICKETS:
      return { ...state, statusTickets: statuslist.process };

    case ERROR_FETCHING_LISTS_TICKETS:
      return { ...state, statusTickets: statuslist.error };

    case SUCCESS_FETCHING_LISTS_TICKETS:
      return {
        ...state,
        statusTickets: statuslist.success,
        tickets: action.tickets,
      };

    case START_FETCHING_LISTS_ORGANIZERS:
      return { ...state, statusOrganizers: statuslist.process };

    case ERROR_FETCHING_LISTS_ORGANIZERS:
      return { ...state, statusOrganizers: statuslist.error };

    case SUCCESS_FETCHING_LISTS_ORGANIZERS:
      return {
        ...state,
        statusOrganizers: statuslist.success,
        organizers: action.organizers,
      };

    default:
      return state;
  }
}
