import { useReducer, useEffect } from "react";
import axios from "axios";

const url = "https://cors.bridged.cc/https://jobs.github.com/positions.json";

const ACTIONS = {
  MAKE_REQUEST: "make-request",
  GET_DATA: "get-data",
  ERROR: "error",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { isLoading: true, jobs: [] };

    case ACTIONS.GET_DATA:
      return { ...state, isLoading: false, jobs: action.payload.jobs };

    case ACTIONS.ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        jobs: [],
      };

    default:
      return state;
  }
};

const useFetchJobs = (params) => {
  const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true });

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    axios
      .get(url, {
        cancelToken: cancelToken.token,
        params: { markdown: true, ...params },
      })
      .then((resp) => {
        dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: resp.data } });
      })
      .catch((e) => {
        if (axios.isCancel(e)) {
          return dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
        }
      });

    return () => {
      cancelToken.cancel();
    };
  }, [params]);

  return state;
};
export default useFetchJobs;
