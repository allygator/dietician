const generateSchedule = (
  busyTimesArray,
  wakeTime = 390,
  sleepTime = 1320,
  mealBuffer = 15,
  exerciseBuffer = 15,
  mealDuration = 30,
  exerciseDuration = 60
) => {
  const possibleSchedule = [];
  busyTimesArray.forEach(busyTimes => {
    const feedingSchedule = generateFeedingSchedule(
      busyTimes,
      wakeTime,
      sleepTime,
      mealBuffer,
      mealDuration
    );
    const combinedSchedule = generateExerciseSchedule(
      busyTimes,
      feedingSchedule,
      exerciseBuffer,
      exerciseDuration,
      mealBuffer,
      mealDuration
    );
    if (combinedSchedule.length > 2) {
      possibleSchedule.push([
        combinedSchedule[0],
        combinedSchedule[combinedSchedule.length - 1],
      ]);
    } else {
      possibleSchedule.push(combinedSchedule);
    }
  });

  return {
    wake: wakeTime,
    sleep: sleepTime,
    mealDuration: mealDuration,
    mealBuffer: mealBuffer,
    exerciseDuration: exerciseDuration,
    exerciseBuffer: exerciseBuffer,
    possibleSchedule: possibleSchedule,
  };
};

const generateExerciseSchedule = (
  busyTimes,
  feedingSchedule,
  exerciseBuffer,
  exerciseDuration,
  mealBuffer,
  mealDuration
) => {
  const freeTime = [];
  const arrLen = busyTimes.length;
  for (let i = 0; i < arrLen - 1; i += 2) {
    let available = busyTimes[i + 1] - busyTimes[i];
    let start = busyTimes[i];
    while (available > exerciseDuration + 2 * exerciseBuffer) {
      freeTime.push(start + (i === 0 ? 0 : exerciseBuffer));
      available -= 15;
      start += 15;
    }
  }

  const restAfterEating = Math.min(60, 60 - exerciseBuffer);
  const originalBusyTimes = busyTimes.slice(1, busyTimes.length - 1);
  const schedule = [];
  for (let h = 0; h < freeTime.length; h++) {
    for (let i = 0; i < feedingSchedule.length; i++) {
      if (freeTime[h] + exerciseBuffer + exerciseDuration < feedingSchedule[i][0]) {
        schedule.push({
          busy: originalBusyTimes,
          meals: [feedingSchedule[i][0], feedingSchedule[i][1], feedingSchedule[i][2]],
          exercise: [freeTime[h]],
        });
      } else if (
        freeTime[h] + exerciseBuffer + exerciseDuration <
        feedingSchedule[i][1]
      ) {
        if (
          freeTime[h] - feedingSchedule[i][0] >
          mealBuffer + mealDuration + restAfterEating
        ) {
          schedule.push({
            busy: originalBusyTimes,
            meals: [feedingSchedule[i][0], feedingSchedule[i][1], feedingSchedule[i][2]],
            exercise: [freeTime[h]],
          });
        }
      } else if (
        freeTime[h] + exerciseBuffer + exerciseDuration <
        feedingSchedule[i][2]
      ) {
        if (
          freeTime[h] - feedingSchedule[i][1] >
          mealBuffer + mealDuration + restAfterEating
        ) {
          schedule.push({
            busy: originalBusyTimes,
            meals: [feedingSchedule[i][0], feedingSchedule[i][1], feedingSchedule[i][2]],
            exercise: [freeTime[h]],
          });
        }
      } else {
        if (
          freeTime[h] - feedingSchedule[i][2] >
          mealBuffer + mealDuration + restAfterEating
        ) {
          schedule.push({
            busy: originalBusyTimes,
            meals: [feedingSchedule[i][0], feedingSchedule[i][1], feedingSchedule[i][2]],
            exercise: [freeTime[h]],
          });
        }
      }
    }
  }

  return schedule;
};

const generateFeedingSchedule = (
  busyTimes,
  wakeTime = 390,
  sleepTime = 1320,
  buffer = 15,
  duration = 30
) => {
  const freeTime = [];
  busyTimes.unshift(wakeTime);
  busyTimes.push(sleepTime);
  const arrLen = busyTimes.length;
  const dontEatRightBeforeBed = 180;
  for (let i = 0; i < arrLen - 1; i += 2) {
    let available = busyTimes[i + 1] - busyTimes[i];
    let start = busyTimes[i];
    while (
      available >
      duration + (i === arrLen - 2 ? dontEatRightBeforeBed : (i === 0 ? 1 : 2) * buffer)
    ) {
      freeTime.push(start + (i === 0 ? 0 : buffer));
      available -= 15;
      start += 15;
    }
  }

  // get feeding schedule based on amount of time passed after previous meal
  let timeBetweenMeals = 240;
  let mealsBuffer = 120;
  const totalSchedule = [];
  const visited = [];
  for (let i = 0; i < freeTime.length; i++) {
    visited.push(false);
  }

  do {
    calcSchedule(
      freeTime,
      mealsBuffer,
      timeBetweenMeals,
      visited,
      0,
      freeTime.length,
      [],
      totalSchedule
    );
    timeBetweenMeals -= 15;
    mealsBuffer += 30;
  } while (totalSchedule.length === 0 && mealsBuffer <= 210);

  return totalSchedule;
};

const calcSchedule = (
  freeTime,
  buffer,
  timeBetween,
  visited,
  currentIndex,
  size,
  feedTime,
  totalSchedule
) => {
  if (feedTime.length === 3) {
    totalSchedule.push(feedTime.slice());
  }

  for (let i = currentIndex; i < size; i++) {
    if (
      visited[i] ||
      (feedTime.length > 0
        ? freeTime[i] > feedTime[feedTime.length - 1] + timeBetween &&
          freeTime[i] < feedTime[feedTime.length - 1] + timeBetween + buffer
          ? false
          : true
        : false)
    ) {
      continue;
    }

    visited[i] = true;
    feedTime.push(freeTime[i]);

    calcSchedule(
      freeTime,
      buffer,
      timeBetween,
      visited,
      i,
      size,
      feedTime,
      totalSchedule
    );

    visited[i] = false;
    feedTime.pop();
  }
};

exports.handler = function(event, context, callback) {
  const body = JSON.parse(event.body);
  // input:  array of start and end time in minutes,
  //         ex.   [500, 660, 740, 920, 1100, 1220]
  // output: Object containing relevant information and possible schedules
  //         in the form of an array of objects
  const retVal = generateSchedule(body);
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      retVal,
    }),
  });
};
