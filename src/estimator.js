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

  const impactCurrentlyInfected = trimNum(reportedCases * 10);

  const severeImpactCurrentlyInfected = trimNum(reportedCases * 50);

  return ({
    estimate: {
      impact: {
        currentlyInfected: impactCurrentlyInfected,
        infectionsByRequestedTime: getInfectedOverTimeSpan(impactCurrentlyInfected, data)
      },
      severeImpact: {
        currentlyInfected: severeImpactCurrentlyInfected
        // infectionsByRequestedTime: getInfectedOverTimeSpan(severeImpactCurrentlyInfected, data)
      }
    }
  });
};

export default covid19ImpactEstimator;
