import React from 'react';
import styled from '@emotion/styled';
import {
  MdDateRange,
  MdLocationOn,
  MdVideocam,
  MdSlideshow,
} from 'react-icons/md';
import { media, colors } from 'gatsby-theme-jason-blog';

const Heading = styled('h2')`
  margin-top: 3rem;
`;

const List = styled('ul')`
  list-style: none;
  padding: 0;
`;

const Item = styled('li')`
  margin-top: 1.5rem;

  @media ${media.large} {
    @supports (display: grid) {
      display: grid;
      grid-auto-flow: column;
      grid-column-gap: 1rem;
      grid-template: repeat(3, auto) / 150px 230px repeat(2, auto);
    }
  }
`;

const Event = styled('strong')`
  @supports (display: grid) {
    grid-column: 1 / span 4;
  }
`;

const Talk = styled('p')`
  margin-top: 0.25rem;

  @supports (display: grid) {
    grid-column: 1 / span 4;
  }
`;

const Detail = styled('span')`
  color: ${colors.textLight};
  display: inline-block;
  font-size: 0.875rem;
  margin-top: 0;
  min-width: 30%;
  padding: 0.25rem 1rem 0.25rem 0;

  a {
    color: ${colors.textLight};
    padding-bottom: 0.125rem;
    padding-right: 0.5rem;
    text-decoration: none;

    :active,
    :hover {
      color: ${colors.lightest};
    }
  }

  @media ${media.large} {
    display: inline-block;
    min-width: 0;
  }
`;

const Icon = styled('svg')`
  display: inline-block;
  border-radius: 50%;
  font-size: 1.125rem;
  margin-right: 0.25rem;
  position: relative;
  top: 0.2rem;
`;

const RangeIcon = Icon.withComponent(MdDateRange);
const LocationIcon = Icon.withComponent(MdLocationOn);
const SlideshowIcon = Icon.withComponent(MdSlideshow);
const VideoIcon = Icon.withComponent(MdVideocam);

const getFormattedDate = (
  date,
  options = { month: 'short', day: 'numeric' },
  locale = 'en-US',
) => date.toLocaleDateString(locale, options);

const getDateRange = (startDateString, endDateString) => {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  // Is this a multi-day event?
  const hasDateRange = startDateString !== endDateString;

  // Does this event span a month change (e.g. Jan 30 – Feb 1)?
  const sameMonth = startDate.getMonth() === endDate.getMonth();

  // We always use the same start date format.
  const start = getFormattedDate(startDate);
  if (!hasDateRange) {
    // A one-day event, e.g. "Feb 1"
    return start;
  }

  if (hasDateRange && sameMonth) {
    // A multi-day event in the same month, e.g. "Feb 1–3"
    return `${start}–${getFormattedDate(endDate, { day: 'numeric' })}`;
  }

  // A multi-day event across a month change, e.g. "Jan 30 – Feb 2"
  return `${start} – ${getFormattedDate(endDate)}`;
};

export default ({ heading, events }) => (
  <>
    <Heading>{heading}</Heading>
    <List>
      {events.map(
        ({
          Start_Date: start,
          End_Date: end,
          Name: name,
          Website: website,
          Location: location,
          Accepted_Talk_s_: talks,
        }) => {
          const date = getDateRange(start, end);
          const talk = talks
            .map(({ data }) => ({
              type: data.Type,
              name: data.Name,
              video: data.Video,
              slides: data.Slides,
              details: data.Presentation_Details,
            }))
            .find(Boolean); // Get the first item.

          return (
            <Item key={`${name}-${start}`}>
              <Event>
                <a href={website}>{name}</a>
              </Event>
              <Talk>
                {talk.type}: <a href={talk.details}>{talk.name}</a>
              </Talk>
              <Detail>
                <RangeIcon />
                {date}
              </Detail>
              <Detail>
                <LocationIcon />
                {location}
              </Detail>
              {talk.slides && (
                <Detail>
                  <a href={talk.slides}>
                    <SlideshowIcon />
                    slides
                  </a>
                </Detail>
              )}
              {talk.video && (
                <Detail>
                  <a href={talk.video}>
                    <VideoIcon />
                    watch
                  </a>
                </Detail>
              )}
            </Item>
          );
        },
      )}
    </List>
  </>
);
