import React from 'react';
import JSONTree from 'react-json-tree';
import {
  loggerTheme,
  loggerContainer as containerStyle
} from './style';

// -- Action

export const UPDATE = 'UPDATE';

// -- Component

export const Container = ({children}) =>
  <div style={containerStyle()}>
    {children}
  </div>;

export const LogEntry = ({action}) => {
  const {type, ...data} = action;

  return (
    <div>
      <div style={{background: '#4F5A65'}}>
        <div style={{padding: '8px 0 8px 16px'}}>
          {type}
        </div>
      </div>
      <JSONTree
        theme={loggerTheme()}
        keyName={'payload'}
        data={data}
      />
    </div>
  );
};

// -- Enhancer

const logger = Child => ({
  update(
    { log = []
    , state = Child.update()
    } = {},
    {type, action} = {}
  ) {
    switch (type) {
    case UPDATE:
      return {
        log: [...log, action],
        state: Child.update(state, action)
      };
    default:
      return {log, state};
    }
  },
  view({log, state, dispatch}) {
    return (
      <div>
        <Container>
          {log.map((action, index) =>
            <LogEntry key={index} {...action} />
          )}
        </Container>
        <Child.view
          {...state}
          dispatch={action => dispatch({
            type: UPDATE,
            action
          })}
        />
      </div>
    );
  }
});

export default logger;
