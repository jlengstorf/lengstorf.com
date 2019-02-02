import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Transition } from 'react-transition-group';
import CloseButton from './CloseButton';
import { colors, animation } from '../../config/styles';

const Overlay = styled('div')`
  align-items: center;
  background: ${colors.lightestAlpha};
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  margin: 0;
  opacity: 0;
  overflow-y: auto;
  position: fixed;
  top: 0;
  transition: opacity ${animation.transitionTime} linear;
  width: 100vw;
  z-index: 1000;

  &.hidden {
    display: none;
    height: 0;
    left: -1;
    pointer-events: none;
    position: absolute;
    top: -1;
    width: 0;
    z-index: -1;
  }
`;

const handleOnDirectClick = handlerFn => event => {
  console.log(event.target.classList);
  console.log(Overlay);
  if (event.target.classList.contains(Overlay)) {
    console.log('popover clicked!');
    event.preventDefault();
    handlerFn();
  }
};

export default ({ children, hidePopover, visible, onEntered = () => {} }) => {
  const [hidden, setHidden] = useState(true);

  const handleEnter = () => {
    setHidden(false);
  };

  const handleExited = () => setHidden(true);

  const transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
  };

  return (
    <Transition
      in={visible}
      timeout={150}
      onEnter={handleEnter}
      onEntered={onEntered}
      onExited={handleExited}
    >
      {state => (
        // Adding a “click the background to close” functionality as a convenience
        // to mouse users. The close button is available for screen reader and
        // keyboard users, so I’m ignoring these a11y linter rules.
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
        <Overlay
          onClick={handleOnDirectClick(hidePopover)}
          style={transitionStyles[state]}
          className={hidden ? 'hidden' : ''}
        >
          {children}
          <CloseButton onClick={hidePopover}>close</CloseButton>
        </Overlay>
      )}
    </Transition>
  );
};
