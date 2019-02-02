import { useState } from 'react';

const useFootnotes = () => {
  const emptyFootnote = { number: 0, content: '' };
  const [active, setActive] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [footnote, setFootnote] = useState(emptyFootnote);

  const close = () => {
    setActive(false);
    setFootnote(emptyFootnote);

    setTimeout(() => {
      setHidden(true);
    }, 300);
  };

  const handleFootnoteClose = event => {
    event.preventDefault();
    close();
  };

  const handleLinkClicks = event => {
    // Don’t do anything for non-footnote links.
    if (!event.target.classList.contains('footnote-ref')) {
      return;
    }

    event.preventDefault();

    // If the footnote drawer is open, close it.
    if (active) {
      close();
      return;
    }

    const link = event.target;
    const targetID = new URL(link.href).hash;

    // Remove any non-numeric characters and force to a number value.
    const number = +targetID.replace(/\D*/, '');
    const content = document.querySelector(targetID).innerHTML;

    // Handle the transition.
    setHidden(false);
    setTimeout(() => {
      setActive(true);
      setFootnote({ number, content });
    }, 10);
  };

  return [
    { active, hidden, footnote },
    { handleFootnoteClose, handleLinkClicks },
  ];
};

export default useFootnotes;
