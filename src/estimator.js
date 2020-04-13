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
const getNumOfAvailBeds = ({ totalHospitalBeds }) => Math.ceil(totalHospitalBeds * 0.35);
const getDollarsInFlight = (infectionsByRequestedTime, { timeToElapse, periodType, region }) => {
  const timeSpan = getTotalNumberOfDays(timeToElapse, periodType);
  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = region;
  const t = infectionsByRequestedTime * avgDailyIncomeInUSD * avgDailyIncomePopulation * timeSpan;
  return trimNum(t);
};

const covid19ImpactEstimator = (data) => {
  const { reportedCases } = data;

  const availableBeds = getNumOfAvailBeds(data);


  const impactCurrentlyInfected = trimNum(reportedCases * 10);
  const iInfectionsByRequestedTime = getInfectedOverTimeSpan(impactCurrentlyInfected, data);
  const iSevereCasesByRequestedTime = trimNum(iInfectionsByRequestedTime * 0.15);
  const iHospitalBedsByRequestedTime = availableBeds - iSevereCasesByRequestedTime;


  const severeImpactCurrentlyInfected = trimNum(reportedCases * 50);
  const sInfectionsByRequestedTime = getInfectedOverTimeSpan(severeImpactCurrentlyInfected, data);
  const sSevereCasesByRequestedTime = trimNum(sInfectionsByRequestedTime * 0.15);
  const sHospitalBedsByRequestedTime = availableBeds - sSevereCasesByRequestedTime;

  return ({
    data,
    impact: {
      currentlyInfected: impactCurrentlyInfected,
      infectionsByRequestedTime: iInfectionsByRequestedTime,
      severeCasesByRequestedTime: iSevereCasesByRequestedTime,
      hospitalBedsByRequestedTime: iHospitalBedsByRequestedTime,
      casesForICUByRequestedTime: trimNum(iInfectionsByRequestedTime * 0.05),
      casesForVentilatorsByRequestedTime: trimNum(iInfectionsByRequestedTime * 0.02),
      dollarsInFlight: getDollarsInFlight(iInfectionsByRequestedTime, data)
    },
    severeImpact: {
      currentlyInfected: severeImpactCurrentlyInfected,
      infectionsByRequestedTime: sInfectionsByRequestedTime,
      severeCasesByRequestedTime: sSevereCasesByRequestedTime,
      hospitalBedsByRequestedTime: sHospitalBedsByRequestedTime,
      casesForICUByRequestedTime: trimNum(sInfectionsByRequestedTime * 0.05),
      casesForVentilatorsByRequestedTime: trimNum(sInfectionsByRequestedTime * 0.02),
      dollarsInFlight: getDollarsInFlight(sSevereCasesByRequestedTime, data)
    }
  });
};

export default covid19ImpactEstimator;
