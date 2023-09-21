import React, { useEffect, useState } from 'react';
import './Calendar.scss';
import axios from 'axios';
import { CalendarType, MatchType } from '../../types/calendarType';
import { DisplayMatch } from '../DisplayMatch/DisplayMatch';

const API_URL = import.meta.env.VITE_API_URL;
export const Calendar: React.FC = () => {
  const [calendarSaisons, setCalendarSaisons] = useState<CalendarType[]>([]);
  const [currentSaison, setCurrentSaison] = useState<string>();

  const [currentCalendar, setCurrentCalendar] = useState<MatchType[]>([]);

  useEffect(() => {
    axios.get(`${API_URL}saison-calendars?populate=*`).then(({ data: res }) => {
      setCalendarSaisons(res.data);
    });
  }, []);

  useEffect(() => {
    if (currentSaison) {
      axios
        .get(`${API_URL}matches?filter[saison][$eq]=${currentSaison}&populate=*`)
        .then(({ data: res }) => {
          setCurrentCalendar(res.data);
        });
    }
  }, [currentSaison]);

  const handleSelectSeason = (saison: string) => {
    setCurrentSaison(saison);
  };

  return (
    <div className="calendar mt-2 mx-auto">
      <h2>Calendrier</h2>
      <div className="calendar_years">
        {calendarSaisons.map(({ attributes }) => (
          <div className="calendar_year" key={attributes.saison}>
            <button
              type="button"
              className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
              onClick={() => handleSelectSeason(attributes.saison)}
            >
              {attributes.saison}
            </button>
          </div>
        ))}
      </div>
      {!!currentCalendar.length && (
        <div className="calendar_season">
          <h3> Match Aller </h3>
          {currentCalendar?.map((match) => (
            <DisplayMatch
              match={match}
              key={match.id}
              isFirstHalfHome={match.attributes.isFirstHalfHome}
              dayMatch={match.attributes.matchDayFirstHalf}
              matchTime={match.attributes.matchTimeFirstHalf}
            />
          ))}
          <h3> Match Retour </h3>
          {currentCalendar?.map((match) => (
            <DisplayMatch
              match={match}
              key={match.id}
              isFirstHalfHome={!match.attributes.isFirstHalfHome}
              dayMatch={match.attributes.matchDaySecondHalf}
              matchTime={match.attributes.matchTimeSecondHalf}
            />
          ))}
        </div>
      )}
    </div>
  );
};
