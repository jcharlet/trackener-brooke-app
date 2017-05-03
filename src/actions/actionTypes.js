///////////////////////
// Navigation actions
///////////////////////
export const NAV_NAVIGATE = 'Navigation/NAVIGATE';
export const NAV_HACK_DETAILS = 'HackDetails';
export const NAV_SETTINGS = 'Settings';
export const NAV_BOTTOM_TAB_NAV = 'BottomTabNavContainer';
export const NAV_AUTHENT_REGISTER = 'Register';
export const NAV_AUTHENT_LOGIN = 'Login';
export const NAV_TRACKER_STARTED = 'LiveTrackerStartedContainer';
export const NAV_TRACKER = 'LiveTracker';


///////////////////////
// API actions
///////////////////////
export const AUTO_LOGIN = 'login/AUTO_LOGIN';
export const LOGIN_SUCCESS = 'login/SUCCESS';
export const LOGIN_ERROR = 'login/ERROR';

export const REGISTER_SUCCESS = 'register/SUCCESS';
export const REGISTER_ERROR = 'register/ERROR';

export const LOGOUT = 'logout/LOGOUT';

export const RIDES_POST_SUCCESS = 'api/rides/SUCCESS';
export const RIDES_POST_ERROR = 'api/rides/ERROR';

///////////////////////
// Live Tracker actions
///////////////////////
export const START_RIDE = 'tracker/START_RIDE';
export const STOP_RIDE = 'tracker/STOP_RIDE';
export const PAUSE_RIDE = 'tracker/PAUSE_RIDE';
export const RESTART_RIDE = 'tracker/RESTART_RIDE';
export const UPDATE_TOTAL_DISTANCE = 'tracker/UPDATE_TOTAL_DISTANCE';
export const ADD_RIDE = 'tracker/ADD_RIDE';

// export const START_GPS_WATCH ='START_GPS_WATCH';

export const GPS_INIT_WATCH = 'gps/GPS_INIT_WATCH';
export const GPS_UPDATE_LOC = 'gps/GPS_UPDATE_LOC';

///////////////////////
// Hack details actions
///////////////////////

export const LOAD_RIDES = 'hacks/LOAD_RIDES';
export const SHOW_PREVIOUS_HACK = 'hacks/SHOW_PREVIOUS_HACK';
export const SHOW_NEXT_HACK = 'hacks/SHOW_NEXT_HACK';
export const REMOVE_HACK = 'hacks/REMOVE_HACK';

///////////////////////
// History actions
///////////////////////

export const LOAD_RIDES_SUMMARY = 'hacks/LOAD_RIDES_SUMMARY';


