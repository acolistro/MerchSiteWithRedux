import merchListReducer from '../../reducers/merch-list-reducer';

describe('merchListReducer', () => {

  let action;

  const currentState = {
    1: {name: 'Alyssa, Joseph, & Katy',
      description: 'Reduxalated and Reactivated',
      quantity: 420,
      id: 1 },
    2: {name: 'Other people',
      description: 'Reduxified',
      quantity: 421,
      id: 2 }
  }

  const merchData = {
    name: 'Alyssa, Joseph, & Katy',
    description: 'Reduxalated and Reactivated',
    quantity: 420,
    id: 1
  };

  test('Should return default state if there is no action type passed into the reducer', () => {
    expect(merchListReducer({}, { type: null })).toEqual({});
  });

  test('Should successfully add new merchdandise data to masterMerchList', () => {
    const { name, description, quantity, id } = merchData;
    action = {
      type: 'ADD_MERCH',
      name: name,
      description: description,
      quantity: quantity,
      id: id
    };
    
    expect(merchListReducer({}, action)).toEqual({
      [id] : {
        name: name,
        description: description,
        quantity: quantity,
        id: id
      }
    });
  });

  test('Should successfully delete a merch item', () => {
    action = {
      type: 'DELETE_MERCH',
      id: 1
    };
    expect(merchListReducer(currentState, action)).toEqual({
      2: {name: 'Other people',
      description: 'Reduxified',
      quantity: 421,
      id: 2 }
    });
  });
});