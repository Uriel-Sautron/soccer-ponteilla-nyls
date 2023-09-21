import React from 'react';
import moment from 'moment';
import { MatchType } from '../../types/calendarType';

type DisplayMatchProps = {
  match: MatchType;
  isFirstHalfHome: boolean;
  dayMatch: string;
  matchTime?: string;
};

export const DisplayMatch = ({
  match,
  isFirstHalfHome,
  dayMatch,
  matchTime,
}: DisplayMatchProps) => {
  const [toggle, setToggle] = React.useState(false);
  const { attributes: displayedMatch } = match;
  const dateFrenchFormat = moment(dayMatch).format('DD/MM/YYYY');
  const teams = isFirstHalfHome
    ? { homeTeam: 'Ponteilla', awayTeam: displayedMatch.other_team.data?.attributes.name }
    : { homeTeam: displayedMatch.other_team.data?.attributes.name, awayTeam: 'Ponteilla' };
  return (
    <>
      <button
        type="button"
        className="calendar_match flex flex-col items-center mt-2 p-2 bg-zinc-800 w-full"
        onClick={() => setToggle(!toggle)}
        key={displayedMatch.matchDayFirstHalf}
      >
        <div className="calendar_match_day">{dateFrenchFormat}</div>
        <div className="flex justify-between w-full">
          <div className="calendar_match_team">{teams.homeTeam}</div>
          <div className="calendar_match_team">{teams.awayTeam}</div>
        </div>
        <div className="calendar_match_time">{matchTime || 'Non définie'}</div>
      </button>
      {toggle && (
        <div>
          <h3>Présents</h3>
          {!!displayedMatch.firstHalfPlayers &&
            displayedMatch.firstHalfPlayers?.map((player) => <div>{player}</div>)}
        </div>
      )}
    </>
  );
};
