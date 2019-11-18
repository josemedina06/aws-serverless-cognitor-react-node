/**
 * Action types
 */

export const SET_USER = 'user/SET_USER';
export const REQEUST_USER = 'user/REQEUST_USER';
export const FETCH_USER = 'user/FETCH_USER';
export const RECEIVE_USER = 'user/RECEIVE_USER';

/**
 * Action types
 */
export const setUser = (user) => ({type: SET_USER, user});
export const fetchUser = () => ({type: FETCH_USER});
export const requestUser = () => ({type: REQEUST_USER});
export const receiveUser = (user) => ({type: RECEIVE_USER, user});

/**
 * Reducers
 */

const initialState = {
    user: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REQEUST_USER:
            return { 
                ...state,
            };
        case RECEIVE_USER:
                return {
                    ...state,
                    user: action.userinfo
                };        
        default:
            return state;
    };
};