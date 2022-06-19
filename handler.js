'use strict';

const getSchedules = require('./lib/cleaning').getSchedules;

const deSort = (a, b) => ('' + a).localeCompare(b, 'de-DE');

const ymlFormat = (schedules) => Object
.entries(schedules)
.reduce((a, [label, plan]) => a + (a ? '\n' : '') + `${label}:\n${Object
  .entries(plan)
  .reduce((aa, [task, name]) => aa +`  ${task}: ${name}\n`,'')}`,'');

module.exports.hello = async (event) => {
  try {
    const { queryStringParameters: query } = event;
    const tasks = query.tasks.split(',').sort(deSort);
    const names = query.names.split(',').sort(deSort);
    return {
      statusCode: 200,
      body: ymlFormat(getSchedules(names, tasks))
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: `Invalid paramters. Query format has to be: '?names=Bernie,Ert&tasks=Dirty,Things'. Happy cleaning.`,
    };
  }
};
