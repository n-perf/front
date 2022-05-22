const diffAction = {
	ADD: 1,
	DELETE: 2,
	SAME: 3,
};

export function prepareDiff(text) {
	let results = [];
	for (let i = 4; i < text.length; i++) {
		if (text[i].split('|')[1] !== undefined) {
			results.push(text[i][1] + text[i].split('|')[1]);
		}
	}

	return results;
}

function computeLcs(before, after) {
	let beforeLen = before.length;
	let afterLen = after.length;
	let i, j;

	let lcs = new Array(beforeLen + 1).fill(0);
	for (i = 0; i < beforeLen + 1; i++) {
		lcs[i] = new Array(afterLen + 1).fill(0);
	}

	for (i = 0; i < beforeLen + 1; i++) {
		for (j = 0; j < afterLen + 1; j++) {
			if (i === 0 || j === 0) {
				lcs[i][j] = 0;
			} else if (before[i - 1] === after[j - 1]) {
				lcs[i][j] = 1 + lcs[i - 1][j - 1];
			} else {
				lcs[i][j] = Math.max(lcs[i - 1][j], lcs[i][j - 1]);
			}
		}
	}

	return lcs;
}

function parseTime(timeString) {
	if (timeString !== undefined) {
		let time = timeString.replace(/(\s*)/g, '').split('|')[0].split(')')[1];
		if (time === undefined) {
			return '';
		} else {
			time = time.replace('us', '');
			return parseFloat(time);
		}
	}
}

export function diff(before, after, beforeFtrace, afterFtrace) {
	let lcs = computeLcs(before, after);
	let results = [];

	let i = before.length;
	let j = after.length;
	let time;

	while (i !== 0 || j !== 0) {
		if (i === 0) {
			time = parseTime(afterFtrace[j + 3]);

			if (time !== '') {
				results.push({
					action: diffAction.ADD,
					time: time,
					diff: time,
					data: after[j - 1].slice(1),
					cpu: after[j - 1][0],
				});
			}
			j -= 1;
		} else if (j === 0) {
			time = parseTime(beforeFtrace[i + 3]);
			if (time !== '') {
				results.push({
					action: diffAction.DELETE,
					time: time,
					diff: time,
					data: before[i - 1].slice(1),
					cpu: before[i - 1][0],
				});
			}
			i -= 1;
		} else if (before[i - 1] === after[j - 1]) {
			if (time !== '') {
				results.push({
					action: diffAction.SAME,
					time: parseTime(afterFtrace[j + 3]),
					diff: parseTime(afterFtrace[j + 3]) - parseTime(beforeFtrace[i + 3]),
					data: before[i - 1].slice(1),
					cpu: before[i - 1][0],
				});
			}
			i -= 1;
			j -= 1;
		} else if (lcs[i - 1][j] <= lcs[i][j - 1]) {
			time = parseTime(afterFtrace[j + 3]);
			if (time !== '') {
				results.push({
					action: diffAction.ADD,
					time: time,
					diff: time,
					data: after[j - 1].slice(1),
					cpu: after[j - 1][0],
				});
			}
			j -= 1;
		} else {
			time = parseTime(beforeFtrace[i + 3]);
			if (time !== '') {
				results.push({
					action: diffAction.DELETE,
					time: time,
					diff: time,
					data: before[i - 1].slice(1),
					cpu: before[i - 1][0],
				});
			}
			i -= 1;
		}
	}

	return results.reverse();
}

// 디버깅을 위한 diff 연산 출력 함수 추가
export function print_diff(results) {
	for (let i = 4; i < results.length; i++) {
		if (results[i - 4].action === diffAction.SAME) {
			if (isNaN(results[i].time)) console.log('\t\t' + results[i].data);
			else console.log(results[i].diff.toFixed(3) + 'us\t' + results[i].data);
		} else if (results[i - 4].action === diffAction.ADD) {
			console.log('\t' + results[i - 4].data);
		}
	}
}
