import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { MatchType } from '../../types/calendarType';
import { DisplayMatch } from '../DisplayMatch/DisplayMatch';

const API_URL = import.meta.env.VITE_API_URL;
const SEASON = import.meta.env.VITE_CURRENT_SEASON;
export const Home = () => {
  const [matches, setMatches] = useState<MatchType[]>();

  useEffect(() => {
    axios
      .get(`${API_URL}matches?filter[saison][$eq]=${SEASON}&populate=*`)
      .then(({ data: res }) => {
        setMatches(res.data);
      });
  }, []);

  const now = moment();

  const nextMatch = matches?.find(
    ({ attributes: match }) =>
      moment(match.matchDayFirstHalf).isSameOrAfter(now) ||
      moment(match.matchDaySecondHalf).isBetween(now, moment().add(7, 'days')),
  );

  const previousMatch = matches?.find(
    ({ attributes: match }) =>
      moment(match.matchDayFirstHalf).isBetween(moment().subtract(7, 'days'), now) ||
      moment(match.matchDaySecondHalf).isBetween(moment().subtract(7, 'days'), now),
  );

  return (
    <main className="flex flex-col items-center">
      <h2>Bienvenue</h2>
      <div className="flex flex-col items-center w-full mt-4">
        <h3>Prochain Match: </h3>
        {nextMatch && (
          <DisplayMatch
            match={nextMatch}
            isFirstHalfHome={nextMatch.attributes.isFirstHalfHome}
            dayMatch={nextMatch.attributes.matchDayFirstHalf}
          />
        )}
      </div>
      <div className="flex flex-col items-center w-full mt-4">
        <h3>Dernier Match: </h3>
        {previousMatch && (
          <DisplayMatch
            match={previousMatch}
            isFirstHalfHome={previousMatch.attributes.isFirstHalfHome}
            dayMatch={previousMatch.attributes.matchDayFirstHalf}
          />
        )}
      </div>
    </main>
  );
};
