import { Reducer } from "redux";
import { SET_PROFILE, SET_FILTERS } from "./actions";

const initialState = {
    profile: {
        id: null,
        username: null,
        name: null,
        surname: null,
        avatar: null,
        password: null,
        fare: null,
        tvUntil: null,
        likes: null,
        wishlist: null
    },
    filters: {
        rating: -1,
        timeStart: "",
        timeEnd: "",
        genre: "",
        minAge: -1,
        prodYear: "",
        prodPlace: "",
        duration: -1
    }
};

function userReducer(state = initialState, action: { type: any; payload: Reducer; }) {
    switch (action.type) {
        case SET_PROFILE:
            return {...state, profile: action.payload}
        case SET_FILTERS:
            return {...state, filters: action.payload}
        default:
            return state;
    }
}

export default userReducer;
