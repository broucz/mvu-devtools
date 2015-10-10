import React from 'react';
import {
  timeTravelContainer as containerStyle,
  timeTravelUndoButton as undoButtonStyle,
  timeTravelRedoButton as redoButtonStyle,
  timeTravelUndoButtonDisabled as undoButtonStyleDisabled,
  timeTravelRedoButtonDisabled as redoButtonStyleDisabled
} from './style';

// -- Action

export const UNDO = 'UNDO';
export const REDO = 'REDO';
export const UPDATE = 'UPDATE';

// -- Component

export const Container = ({children}) =>
  <div style={containerStyle()}>
    {children}
  </div>;

export const ButtonBar = ({past, future, dispatch}) => {
  const noPast = (past.length === 0);
  const noFuture = (future.length === 0);

  return (
    <div>
      <div
        style={
          (noPast)
            ? undoButtonStyleDisabled()
            : undoButtonStyle()
        }
        onClick={() => {
          if (!noPast) {
            return dispatch({
              type: UNDO
            });
          }
        }}
      >UNDO</div>
      <div
        style={
          (noFuture)
            ? redoButtonStyleDisabled()
            : redoButtonStyle()
        }
        onClick={() => {
          if (!noFuture) {
            return dispatch({
              type: REDO
            });
          }
        }}
      >REDO</div>
    </div>
  );
};

// -- Enhancer

const timeTravel = Child => ({
  update(
    { past = []
    , present = Child.update()
    , future = []
    } = {},
    {type, action} = {}
  ) {
    switch (type) {
    case UNDO:
      return {
        past: past.slice(0, past.length - 1),
        present: past[past.length - 1],
        future: [present, ...future]
      };
    case REDO:
      return {
        past: [...past, present],
        present: future[0],
        future: future.slice(1)
      };
    case UPDATE:
      return {
        past: [...past, present],
        present: Child.update(present, action),
        future: []
      };
    default:
      return {past, present, future};
    }
  },
  view({past, present, future, dispatch}) {
    return (
      <div>
        <Container>
          <ButtonBar
            past={past}
            future={future}
            dispatch={action => dispatch(action)}
          />
        </Container>
        <Child.view
          {...present}
          dispatch={action => dispatch({
            type: UPDATE,
            action
          })}
        />
      </div>
    );
  }
});

export default timeTravel;
