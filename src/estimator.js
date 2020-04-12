const trimNum = (number) => parseInt(number, 10);
// eslint-disable-next-line max-len
const getInfectedOverTimeSpan = (currentlyInfected, factor) => trimNum(currentlyInfected * (2 ** factor));

const periodMap = {
  days: 1,
  weeks: 7,
  months: 30
};

// eslint-disable-next-line no-unused-vars
const getTotalNumberOfDays = (periodElapsed, periodType) => periodElapsed * periodMap[periodType];

/*
Data Structure
{
  region: {
    name: "Africa",
      avgAge: 19.7,
      avgDailyIncomeInUSD: 5,
      avgDailyIncomePopulation: 0.71
  },
  periodType: "days",
    timeToElapse: 58,
reportedCases: 674,
population: 66622705,
totalHospitalBeds: 1380614
} */
const covid19ImpactEstimator = (data) => {
  const { reportedCases } = data;

  const impact = {};
  impact.currentlyInfected = trimNum(reportedCases * 10);
  impact.infectionsByRequestedTime = getInfectedOverTimeSpan(impact.currentlyInfected, 9);

  const severeImpact = {};
  severeImpact.currentlyInfected = trimNum(reportedCases * 50);
  impact.infectionsByRequestedTime = getInfectedOverTimeSpan(severeImpact.currentlyInfected, 9);

  return ({
    data,
    impact,
    severeImpact
  });
};

export default covid19ImpactEstimator;
