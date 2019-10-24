const generateSchedule = (timeArr) => {
	const feedingSchedule = generateFeedingSchedule(timeArr)
	const combinedSchedule = generateExerciseSchedule(timeArr, feedingSchedule)

	return combinedSchedule
}

const generateExerciseSchedule = (timeArr, feedingSchedule, buffer = 15, duration = 60) => {
	const freeTime = []
	const arrLen = timeArr.length
	for (let i = 0; i < arrLen - 1; i += 2) {
		let available = timeArr[i+1] - timeArr[i]
		let start = timeArr[i]
		while (available > duration + 2 * buffer) {
			freeTime.push(start + (i == 0 ? 0 : buffer))
			available -= 15
			start += 15
		}
	}

	const schedule = []
	for (let h = 0; h < freeTime.length; h++) {
		for (let i = 0; i < feedingSchedule.length; i++) {
			if ((freeTime[h] + buffer + duration) < feedingSchedule[i][0]) {
				schedule.push({[freeTime[h]]: feedingSchedule[i]})
			} else if ((freeTime[h] + buffer + duration) < feedingSchedule[i][1]) {
				if ((freeTime[h] - feedingSchedule[i][0]) > (freeTime[h] + buffer + duration)) {
					schedule.push({[freeTime[h]]: feedingSchedule[i]})
				}
			} else if ((freeTime[h] + buffer + duration) < feedingSchedule[i][2]) {
				if ((freeTime[h] - feedingSchedule[i][1]) > (freeTime[h] + buffer + duration)) {
					schedule.push({[freeTime[h]]: feedingSchedule[i]})
				}
			} else {
				if ((freeTime[h] - feedingSchedule[i][2]) > (freeTime[h] + buffer + duration)) {
					schedule.push({[freeTime[h]]: feedingSchedule[i]})
				}
			}
		}
	}

	return schedule
}

const generateFeedingSchedule = (timeArr, wakeTime = 390, sleepTime = 1320, buffer = 15, duration = 30) => {
	const freeTime = []
	timeArr.unshift(wakeTime)
	timeArr.push(sleepTime)
	const arrLen = timeArr.length
	const dontEatRightBeforeBed = 180
	for (let i = 0; i < arrLen - 1; i += 2) {
		let available = timeArr[i+1] - timeArr[i]
		let start = timeArr[i]
		while (available > duration + (i == (arrLen - 2) ? dontEatRightBeforeBed : (i == 0 ? 1 : 2) * buffer)) {
			freeTime.push(start + (i == 0 ? 0 : buffer))
			available -= 15
			start += 15
		}
	}

	// get feeding schedule based on amount of time passed after previous meal
	let timeBetweenMeals = 240
	let mealsBuffer = 120
	let totalSchedule = []
	let visited = []
	for (let i = 0; i < freeTime.length; i++)
	{
		visited.push(false)
	}

	do
	{
	calcSchedule(freeTime, mealsBuffer, timeBetweenMeals, visited, 0, freeTime.length, [], totalSchedule)
	timeBetweenMeals -= 15
	mealsBuffer += 30
	} while (totalSchedule.length == 0 && mealsBuffer <= 210)

	return totalSchedule
}

const calcSchedule = (freeTime, buffer, timeBetween, visited, currentIndex, size, feedTime, totalSchedule) => {
	if (feedTime.length == 3)
	{
		totalSchedule.push(feedTime.slice())
	}

	for (let i = currentIndex; i < size; i++)
	{
		if (visited[i]
			|| (feedTime.length > 0
				? (freeTime[i] > (feedTime[feedTime.length - 1] + timeBetween)
					&& freeTime[i] < (feedTime[feedTime.length - 1] + timeBetween + buffer)
					? false : true)
					: false))
		{
			continue;
		}

		visited[i] = true;
		feedTime.push(freeTime[i])

		calcSchedule(freeTime, buffer, timeBetween, visited, i, size, feedTime, totalSchedule)

		visited[i] = false;
		feedTime.pop()
	}
}

exports.handler = function(event, context, callback) {
	let body = JSON.parse(event.body);
	// input: array of start and end time in minutes ([400, 460, 700, 900])
	// output: array of objects where each object is a possible time schedule
	//         the key is the exercise time and the value is an array of meal times
	const retVal = generateSchedule(body)
	callback(null, {
		statusCode: 200,
		body: JSON.stringify({
			retVal,
		})
	})
}
