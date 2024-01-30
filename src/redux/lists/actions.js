import {
  START_FETCHING_LISTS_CATEGORIES,
  SUCCESS_FETCHING_LISTS_CATEGORIES,
  ERROR_FETCHING_LISTS_CATEGORIES,
  START_FETCHING_LISTS_TALENTS,
  ERROR_FETCHING_LISTS_TALENTS,
  SUCCESS_FETCHING_LISTS_TALENTS,
  START_FETCHING_LISTS_EVENTS,
  ERROR_FETCHING_LISTS_EVENTS,
  SUCCESS_FETCHING_LISTS_EVENTS,
  START_FETCHING_LISTS_TICKETS,
  SUCCESS_FETCHING_LISTS_TICKETS,
  ERROR_FETCHING_LISTS_TICKETS,
  START_FETCHING_LISTS_ORGANIZERS,
  SUCCESS_FETCHING_LISTS_ORGANIZERS,
  ERROR_FETCHING_LISTS_ORGANIZERS,
} from "./constants";

import { getData } from "../../utils/fetch";
import debounce from "debounce-promise";

let debouncedFetchListsCategories = debounce(getData, 1000);
let debouncedFetchListsTalents = debounce(getData, 1000);
let debouncedFetchListsEvents = debounce(getData, 1000);
let debounceFetchListTickets = debounce(getData, 1000);
let debounceFetchListOrganizers = debounce(getData, 1000);

export const startFetchingListsCategories = () => {
  return {
    type: START_FETCHING_LISTS_CATEGORIES,
  };
};

export const successFetchingListCategories = ({ categories }) => {
  return {
    type: SUCCESS_FETCHING_LISTS_CATEGORIES,
    categories,
  };
};

export const errorFetchingListCategories = () => {
  return {
    type: ERROR_FETCHING_LISTS_CATEGORIES,
  };
};

export const fetchListCategories = () => {
  return async (dispatch) => {
    dispatch(startFetchingListsCategories());

    try {
      let res = await debouncedFetchListsCategories("/cms/categories");

      let _temp = [];

      res.data.data.forEach((res) => {
        _temp.push({
          value: res._id,
          label: res.name,
          target: { value: res._id, name: "category" },
        });
      });

      dispatch(
        successFetchingListCategories({
          categories: _temp,
        })
      );
    } catch (error) {
      dispatch(errorFetchingListCategories());
    }
  };
};

export const startFetchingListsTalents = () => {
  return {
    type: START_FETCHING_LISTS_TALENTS,
  };
};

export const successFetchingListTalents = ({ talents }) => {
  return {
    type: SUCCESS_FETCHING_LISTS_TALENTS,
    talents,
  };
};

export const errorFetchingListTalents = () => {
  return {
    type: ERROR_FETCHING_LISTS_TALENTS,
  };
};

export const fetchListTalents = () => {
  return async (dispatch) => {
    dispatch(startFetchingListsTalents());

    try {
      let res = await debouncedFetchListsTalents("/cms/talents");

      let _temp = [];

      res.data.data.forEach((res) => {
        _temp.push({
          value: res._id,
          label: res.name,
          target: { value: res._id, name: "talent" },
        });
      });

      dispatch(
        successFetchingListTalents({
          talents: _temp,
        })
      );
    } catch (error) {
      dispatch(errorFetchingListTalents());
    }
  };
};

// event

export const startFetchingListsEvents = () => {
  return {
    type: START_FETCHING_LISTS_EVENTS,
  };
};

export const successFetchingListEvents = ({ events }) => {
  return {
    type: SUCCESS_FETCHING_LISTS_EVENTS,
    events,
  };
};

export const errorFetchingListEvents = () => {
  return {
    type: ERROR_FETCHING_LISTS_EVENTS,
  };
};

export const fetchListEvents = () => {
  return async (dispatch) => {
    dispatch(startFetchingListsEvents());

    try {
      let res = await debouncedFetchListsEvents("/cms/events");

      let _temp = [];

      res.data.data.forEach((res) => {
        _temp.push({
          value: res._id,
          label: res.title,
          target: { value: res._id, name: "event" },
        });
      });

      dispatch(
        successFetchingListEvents({
          events: _temp,
        })
      );
    } catch (error) {
      dispatch(errorFetchingListEvents());
    }
  };
};

// tickets
export const startFetchingListTickets = () => {
  return {
    type: START_FETCHING_LISTS_TICKETS,
  };
};

export const successFetchingListTickets = ({ tickets }) => {
  return {
    type: SUCCESS_FETCHING_LISTS_TICKETS,
    tickets,
  };
};

export const errorFetchingListTickets = () => {
  return {
    type: ERROR_FETCHING_LISTS_TICKETS,
  };
};

export const fetchListTickets = () => {
  return async (dispatch) => {
    dispatch(startFetchingListTickets());

    try {
      let res = await debounceFetchListTickets("/cms/events");

      let _temp = [];

      res.data.data.forEach((res) => {
        _temp.push({
          value: res._id,
          label: res.statusEvent,
          target: { value: res._id, name: "statusEvent" },
        });
      });

      dispatch(
        successFetchingListTickets({
          tickets: _temp,
        })
      );
    } catch (error) {
      dispatch(errorFetchingListTickets());
    }
  };
};

// organizers

export const startFetchingListOrganizers = () => {
  return {
    type: START_FETCHING_LISTS_ORGANIZERS,
  };
};

export const successFetchingListOrganizers = ({ organizers }) => {
  return {
    type: SUCCESS_FETCHING_LISTS_ORGANIZERS,
    organizers,
  };
};

export const errorFetchingListOrganizers = () => {
  return {
    type: ERROR_FETCHING_LISTS_ORGANIZERS,
  };
};

export const fetchListOrganizers = () => {
  return async (dispatch) => {
    dispatch(startFetchingListOrganizers());

    try {
      let res = await debounceFetchListOrganizers("/cms/users");

      let _temp = [];

      res.data.data.forEach((res) => {
        _temp.push({
          name: res.name,
          email: res.email,
          password: res.password,
        });
      });

      dispatch(
        successFetchingListOrganizers({
          organizers: _temp,
        })
      );
    } catch (error) {
      dispatch(errorFetchingListOrganizers());
    }
  };
};
