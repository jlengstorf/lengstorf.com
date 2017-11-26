const footnotes = require(`remark-numbered-footnotes`);

module.exports = ({ markdownAST }) =>
  new Promise(resolve => {
    footnotes()(markdownAST);

    return resolve(markdownAST);
  });
