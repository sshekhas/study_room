/* eslint-disable prettier/prettier */
import createDataContext from './createDataContext';

const historyReducer = (state, action) => {
  switch (action.type) {
    case 'add_details':
      return {
        ...state,
        userVisited: action.payload.newList,
      };

    default:
      return state;
  }
};
const setUserVisited = dispatch => {
  return (userVisited, newEntry) => {
    let data = userVisited.find( (item) => item.id === newEntry.id);
    if (!data){
      dispatch({
        type: 'add_details',
        payload: {
          newList: [...userVisited, newEntry],
        },
      });
    }
  };
};


export const {Provider, Context} = createDataContext(
  historyReducer,
  {setUserVisited},
  {
    userVisited: [],
  },
);
