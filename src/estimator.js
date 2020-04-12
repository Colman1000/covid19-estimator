const trimNum = (number) => parseInt(number, 10);
const periodMap = {
  days: 1,
  weeks: 7,
  months: 30
};
const getTotalNumberOfDays = (periodElapsed, periodType) => periodElapsed * periodMap[periodType];

const getInfectedOverTimeSpan = (currentlyInfected, { timeToElapse, periodType }) => {
  const factor = trimNum(getTotalNumberOfDays(timeToElapse, periodType) / 3);
  return trimNum(currentlyInfected * (2 ** factor));
};

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
  impact.infectionsByRequestedTime = getInfectedOverTimeSpan(impact.currentlyInfected, data);

  const severeImpact = {};
  severeImpact.currentlyInfected = trimNum(reportedCases * 50);
  impact.infectionsByRequestedTime = getInfectedOverTimeSpan(severeImpact.currentlyInfected, data);

  return ({
    data,
    estimate: {
      impact,
      severeImpact
    }
  });
};

export default covid19ImpactEstimator;
