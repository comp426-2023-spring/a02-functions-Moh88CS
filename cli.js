#!/usr/bin/env node


const fetch = require('fetch');
const moment = require('moment-timezone');
const minimist = require('minimist');
const args = minimist(process.argv.slice(2));

const timezone = moment.tz.guess();

// Replace with the appropriate URL and variables
const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + args.latitude + '&longitude=' + args.longitude + '&daily=precipitation_hours';

async function getWeather() {
  const response = await fetch(url);
  const data = await response.json();

  const days = args.d;

  if (days == 0) {
    console.log("today.");
  } else if (days > 1) {
    console.log("in " + days + " days.");
  } else {
    console.log("tomorrow.");
  }

  const precipitationHours = data.daily.precipitation_hours[days];

  if (precipitationHours === 0) {
    console.log("There will be no rain on the selected day.");
  } else {
    console.log("There will be " + precipitationHours + " hours of rain on the selected day.");
  }
}

getWeather();