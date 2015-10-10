import React from 'react';
import logger from './logger';
import timeTravel from './timeTravel';
import {
  devToolsContainer as containerStyle,
  devToolsView as viewStyle,
  devToolsPanel as panelStyle
} from './style';

// -- Action
// Your application MUST use an action -> type === 'UPDATE'
// in order to use this enhancer.
// (not agree ? let's chat -> open an issue)

export const UPDATE = 'UPDATE';

// -- Component

export const View = ({children}) =>
  <div style={viewStyle()}>
    {children}
  </div>;

export const Panel = () =>
  <div style={panelStyle()}></div>;

export const Container = ({children}) =>
  <div style={containerStyle()}>
    {children}
  </div>;

// -- Enhancer

const devTools = (Child) => {
  const Enhanced = timeTravel(logger(Child));

  return {
    update(
      {state = Enhanced.update()} = {},
      {type, action} = {}
    ) {
      switch (type) {
      case UPDATE:
        return {
          state: Enhanced.update(state, action)
        };
      default:
        return {state};
      }
    },
    view({state, dispatch}) {
      return (
        <Container>
          <Panel />
          <View>
            <Enhanced.view
              {...state}
              dispatch={action => dispatch({
                type: UPDATE,
                action
              })}
              />
          </View>
        </Container>
      );
    }
  };
};

export default devTools;
