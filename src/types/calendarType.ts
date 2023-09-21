export type MatchType = {
  attributes: {
    matchDayFirstHalf: string;
    matchTimeFirstHalf?: string;
    myTeamScoreFirstHalf?: string;
    otherTeamScoreFirstHalf?: string;
    matchDaySecondHalf: string;
    matchTimeSecondHalf?: string;
    myTeamScoreSecondHalf?: string;
    otherTeamScoreSecondHalf?: string;
    isFirstHalfHome: boolean;
    other_team: { data: { attributes: { name: string } } };
    observation?: string;
    extra?: string;
    firstHalfPlayers?: string[];
  };
  id: number;
};

export type CalendarType = {
  attributes: {
    saison: string;
    matches: { data: MatchType[] };

    players: { data: PlayerType[] };
  };
  id: number;
};

export type PlayerType = {
  attributes: {
    lastName: string;
    firstName: string;
    adress: string;
    zipCode: string;
    village: string;
    phone: string;
    isNew: boolean;
    dateOfBirth: string;
  };
  id: number;
};
