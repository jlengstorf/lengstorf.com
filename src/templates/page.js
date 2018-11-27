import React from 'react';
import Layout from '../components/Layout';
import ContentWithFootnotes from '../components/ContentWithFootnotes';
import ContentArea from '../components/ContentArea';

export default ({ children, pageContext }) => (
  <Layout title="Test">
    <h1>{pageContext.frontmatter.title}</h1>
    <ContentWithFootnotes
      render={() => <ContentArea>{children}</ContentArea>}
    />
  </Layout>
);
