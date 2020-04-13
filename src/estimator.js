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

const covid19ImpactEstimator = (data) => {
  const { reportedCases } = data;

  const impactCurrentlyInfected = trimNum(reportedCases * 10);

  const severeImpactCurrentlyInfected = trimNum(reportedCases * 50);

  return ({
    data,
    impact: {
      currentlyInfected: impactCurrentlyInfected,
      infectionsByRequestedTime: getInfectedOverTimeSpan(impactCurrentlyInfected, data)
    },
    severeImpact: {
      currentlyInfected: severeImpactCurrentlyInfected,
      infectionsByRequestedTime: getInfectedOverTimeSpan(severeImpactCurrentlyInfected, data)
    }
  });
};

export default covid19ImpactEstimator;
