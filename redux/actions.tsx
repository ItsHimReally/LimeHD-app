export const SET_PROFILE = 'SET_PROFILE';
export const SET_FILTERS = 'SET_FILTERS'
export const SET_CHANNELS = 'SET_CHANNELS'
export const SET_PROGRAMS = 'SET_PROGRAMS'

export const setProfile = (profile: { id: any; login: any; password: any; avatar: any}) => (dispatch: (arg0: { type: string; payload: any; }) => void) => {
    dispatch({
        type: SET_PROFILE,
        payload: profile,
    });
};

export const setFilters = (filters: {rating: any, timeStart: any, timeEnd: any, genre: any, minAge: any, prodYear: any, prodPlace: any, duration: any}) => (dispatch: (arg0: { type: string; payload: any; }) => void) => {
    dispatch({
        type: SET_FILTERS,
        payload: filters,
    });
};

export const setChannels = items => ({
    type: SET_CHANNELS,
    payload: items
});

export const setPrograms = items => ({
    type: SET_PROGRAMS,
    payload: items
});