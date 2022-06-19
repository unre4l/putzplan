const getSchedules = require('./lib/cleaning').getSchedules;

const tasks = ['v', 'w', "x", "y", "z"];
const persons = ["a", "b", "c",];

let lastSeed = null;
for (let o = 0; o < 20; o++) {
    const schedule = getSchedules(persons, tasks, 1, 1337+o);
    const { data, seed, mutation } = schedule.current;
    let s = `${seed}/${mutation}`;
    const maxL = Math.max(...persons.map(p => p.length));
    const maxTL = Math.max(...tasks.map(p => p.length));

    Object.keys(data).forEach((k) => {
        const name = data[k];
        s += `       ${k.padStart(maxTL)}: ${name.padStart(maxL)}`;
    })
    
    if(lastSeed && lastSeed < seed) {
        console.log(`----- ${schedule.datetime.toLocaleString('de-DE', { timeZoneName:'short', })}`);
    }
    console.log(s);
    lastSeed = seed;
}

const buff = [];
const msecInWeek = 604_800_000;
const msecInHour = 3600000;
const msecCorrection = 3*24*msecInHour + Math.abs(new Date().getTimezoneOffset()*60*1000); // Thu -> Mon in 1970, plus two hours to correct for timezone
const d = new Date();
for (let i = 0; i < 200; i++) {
    const weeknum = Math.floor((d.getTime()+ msecCorrection) / msecInWeek);
    buff.push(`Weeknum for date: ${d}  ->  ${weeknum}`);
    d.setTime(d.getTime() + (msecInHour));
}
console.log(buff);