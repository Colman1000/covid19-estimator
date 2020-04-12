const getInfectedOverTimeSpan = (currentlyInfected, factor) => currentlyInfected * (2 ** factor);

const covid19ImpactEstimator = (data) => {
  const { reportedCases } = data;

  const impact = {};
  impact.currentlyInfected = reportedCases * 10;
  impact.infectionsByRequestedTime = getInfectedOverTimeSpan(impact.currentlyInfected, 10);

  const severeImpact = {};
  severeImpact.currentlyInfected = reportedCases * 50;
  impact.infectionsByRequestedTime = getInfectedOverTimeSpan(severeImpact.currentlyInfected, 10);

  return ({
    data,
    impact,
    severeImpact
  });
};

export default covid19ImpactEstimator;
