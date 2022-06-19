const aleaFromSeed = require('./arbit').aleaFromSeed;

const msecInWeek = 604_800_000;
const msecInHour = 3600000;
// Thu -> Mon in 1970, plus two hours to correct for timezone
const msecCorrection = 3*24*msecInHour + Math.abs(new Date().getTimezoneOffset()*60*1000); 

function getSchedule(persons, tasks, weeksForTask, weekNum) {
  const mutation = Math.floor(weekNum / weeksForTask) % persons.length;
  const seed = Math.floor(weekNum / (persons.length * weeksForTask));
  const generator = new aleaFromSeed(seed);
  const personsCpy = [...persons];
  let j, x, i;
  const h = [];
  for (i = personsCpy.length - 1; i > 0; i--) {
    j = Math.floor(generator() * (i + 1));
    x = personsCpy[i];
    h.push(j);
    personsCpy[i] = personsCpy[j];
    personsCpy[j] = x;
  }
  const data = {};
  tasks.forEach((task, i) => {
    let index = (mutation + i) % personsCpy.length;
    data[task] = personsCpy[index];
  });

  return data;
}

function getSchedules(persons, tasks, weeksForTask = 1, weeknum = null) {
  weeknum ??= Math.floor((new Date().getTime() + msecCorrection) / msecInWeek);
  const current = getSchedule(persons, tasks, weeksForTask, weeknum);
  const previous = getSchedule(persons, tasks, weeksForTask, weeknum - 1);
  return { 'jetzt': current, 'letzte Woche': previous };
}

module.exports.getSchedules = getSchedules