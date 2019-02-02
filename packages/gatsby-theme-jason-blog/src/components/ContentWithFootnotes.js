import React from 'react';
import useFootnotes from '../hooks/use-footnotes';
import Footnotes from './Footnotes';

export default ({ render = () => {}, className = '' }) => {
  const [
    { active, hidden, footnote },
    { handleFootnoteClose, handleLinkClicks },
  ] = useFootnotes();

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div onClick={handleLinkClicks} className={className}>
      {render()}
      <Footnotes
        isActive={active}
        number={footnote.number}
        content={footnote.content}
        handleClose={handleFootnoteClose}
        isHidden={hidden}
      />
    </div>
  );
};
