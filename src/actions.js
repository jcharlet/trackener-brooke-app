export const startRide = () => {
  const action = {
    type: 'START'
  };
  return action;
};

export const stopRide = () => {
  const action = {
    type: 'STOP'
  };
  return action;
};

export const pauseRide = () => {
  const action = {
    type: 'PAUSE'
  };
  return action;
};
