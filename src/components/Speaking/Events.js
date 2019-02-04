import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import List from './List';
import { Button } from 'gatsby-theme-jason-blog/components';

export default () => (
  <StaticQuery
    query={graphql`
      {
        allAirtable(filter: { table: { eq: "Events" } }) {
          totalCount
          edges {
            node {
              data {
                Name
                Start_Date
                End_Date
                Location
                Website
                Accepted_Talk_s_ {
                  data {
                    Type
                    Name
                    Video
                    Slides
                    Presentation_Details
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={result => {
      const events = result.allAirtable.edges.map(({ node: { data } }) => data);
      const today = new Date();

      // Get a list of future and in-progress events.
      const upcoming = events.filter(
        event => new Date(event.End_Date) >= today,
      );

      // Filter for past events and put them in reverse chronological order.
      const past = events
        .filter(event => new Date(event.End_Date) < today)
        .reverse();

      return (
        <>
          <List heading="Upcoming Speaking Engagements" events={upcoming} />
          <Button
            style={{ marginTop: '2rem' }}
            href="mailto:speaking@lengstorf.com?subject=Speaking+Inquiry"
            small
          >
            Book me to speak at your event »
          </Button>
          <List heading="Past Speaking Engagements" events={past} />
        </>
      );
    }}
  />
);
