(function () {
	//Add active class to check-button
	$('#excl-stop-w').on('change', function () {
		$('.check-button').toggleClass('check-button_active');
	});

	function countCharacters(text) {
		return text.replace(/[\r\n]+/g, '').length;
	}

	function countWords(text) {
		return text.split(/\s+/g).filter(function (n) {
			return n !== '';
		}).length;
	}

	function getText() {
		return document.getElementsByClassName('js-cc-input-text')[0].value;
	}

	function getCountSentences(text) {
		let sentences = text.split(/[.!?]+/g).filter(function (n) {
			return n.replace(/\s+/g, '') !== '';
		});
		return sentences.length;
	}

	function getCountParagraphs(text) {
		let paragraphs = text.split(/\n+/g).filter(function (n) {
			return n.replace(/\s+/g, '') !== '';
		});
		return paragraphs.length;
	}

	function getStopWords() {
		const stopWordsNode = document.getElementById('js-wc-stop-words-input');
		const stopWordsFromInput = stopWordsNode.value.split(',').map((word) => {
			return word.trim().toLowerCase();
		});
		return ['–', '-'].concat(stopWordsFromInput);
	}

	function getWords(text, includeStopWords) {
		let excludedWords = [''];

		if (!includeStopWords) {
			excludedWords = excludedWords.concat(getStopWords());
		}

		return text
			.replace(/[.,!?]+/g, '')
			.split(/\s+/g)
			.filter(function (word) {
				word = word.toLowerCase();
				return !excludedWords.includes(word);
			});
	}

	function getCountWords(text, includeStopWords) {
		return getWords(text, includeStopWords).length;
	}

	function getCountLettersAndNumbers(text) {
		return text.replace(/[^a-z\u0400-\u04FF0-9]+/gi, '').length;
	}

	function includeStopWords() {
		return !document.getElementById('excl-stop-w').checked;
	}

	function getTopWords(words) {
		let topWords = [];

		words.forEach(function (word) {
			word = word.toLowerCase();
			let found = false;
			topWords.forEach(function (el, index) {
				if (el.word === word) {
					found = true;
					topWords[index].count++;
				}
			});
			if (!found) {
				topWords.push({ word: word, count: 1 });
			}
		});
		topWords = topWords.filter((item) => item.count >= 2);
		topWords.sort((a, b) => {
			return b.count - a.count;
		});

		return topWords.slice(0, 20).map((word) => {
			const density = word.count / words.length;
			return { ...word, densityPercent: (density * 100).toFixed(1) };
		});
	}

	function getBigrams(text) {
		let words = getWords(text.toLowerCase(), includeStopWords());
		let bigrams = [];

		for (let i = 1; i < words.length; i += 2) {
			let firstBigram = words[i - 1] + ' ' + words[i];
			bigrams.push(firstBigram);

			if (words[i + 1] !== undefined) {
				let secondBigram = words[i] + ' ' + words[i + 1];
				bigrams.push(secondBigram);
			}
		}

		const stopWordsNode = document.getElementById('js-wc-stop-words-input');
		const stopWordsFromInput = stopWordsNode.value.split(',').map((word) => {
			return word.trim().toLowerCase();
		});
		bigrams = bigrams.filter((word) => {
			return !stopWordsFromInput.includes(word);
		});

		return bigrams;
	}

	function getTrigrams(text) {
		let words = getWords(text.toLowerCase(), includeStopWords());
		let trigrams = [];

		for (let i = 1; i < words.length; i += 3) {
			if (words[i + 1] !== undefined) {
				let trigram1 = words[i - 1] + ' ' + words[i] + ' ' + words[i + 1];
				trigrams.push(trigram1);

				if (words[i + 2] !== undefined) {
					let trigram2 = words[i] + ' ' + words[i + 1] + ' ' + words[i + 2];
					trigrams.push(trigram2);

					if (words[i + 3] !== undefined) {
						let trigram3 = words[i + 1] + ' ' + words[i + 2] + ' ' + words[i + 3];
						trigrams.push(trigram3);
					}
				}
			}
		}

		const stopWordsNode = document.getElementById('js-wc-stop-words-input');
		const stopWordsFromInput = stopWordsNode.value.split(',').map((word) => {
			return word.trim().toLowerCase();
		});
		trigrams = trigrams.filter((word) => {
			word = word.toLowerCase();
			return !stopWordsFromInput.includes(word);
		});

		return trigrams;
	}

	function getTopBigrams(text) {
		let bigrams = getBigrams(text);
		return getTopWords(bigrams);
	}

	function getTopTrigrams(text) {
		let trigrams = getTrigrams(text);
		return getTopWords(trigrams);
	}

	function convertSeconds(seconds) {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const remainingSeconds = seconds % 60;

		const hourString = hours > 0 ? `${hours}h ` : '';
		const minuteString = minutes > 0 ? `${minutes}m ` : '';
		const secondString = remainingSeconds > 0 ? `${remainingSeconds}s` : '';

		if (hours > 0) {
			return `${hourString}${minuteString || '0m'}${secondString && `${secondString}`}`;
		} else if (!hours && minutes > 0) {
			return `${minuteString}${secondString && `${secondString}`}`;
		}

		return secondString;
	}

	function getReadingTime(text) {
		const wordsPerMinute = 200;
		const wordsPerSecond = wordsPerMinute / 60;
		const countWords = getCountWords(text, true);
		const seconds = Math.ceil(countWords / wordsPerSecond);
		return convertSeconds(seconds) || 0;
	}

	function getReadabilityAri(text) {
		const words = getCountWords(text, true);

		if (words === 0) {
			return 0;
		}

		const characters = getCountLettersAndNumbers(text);
		const sentences = getCountSentences(text);
		const readability = Math.round(4.71 * (characters / words) + 0.5 * (words / sentences) - 21.43);
		const levelReadabilityMap = {
			4: 'Very easy',
			6: 'Easy',
			9: 'Average',
			19: 'Quite Hard',
		};
		const key = Object.keys(levelReadabilityMap).find((key) => readability <= key);
		return levelReadabilityMap[key] || 'Hard';
	}

	function updateCounterNode(elementName, newText, isActive) {
		const counterNode = document.getElementById(elementName);
		counterNode.innerText = newText;
		counterNode.setAttribute('title', newText);
		if (isActive) {
			counterNode.classList.add('number_active');
		} else {
			counterNode.classList.remove('number_active');
		}
	}

	function updateCounters() {
		const text = getText();

		const chars = countCharacters(text);
		updateCounterNode('js-wc-count-chars', chars, chars > 0);

		const charsWithoutSpaces = countCharacters(text.replace(/\s/g, ''));
		updateCounterNode(
			'js-wc-count-chars-non-spaces',
			'(' + charsWithoutSpaces + ' without spaces)',
			charsWithoutSpaces > 0,
		);

		const words = countWords(text);
		updateCounterNode('js-wc-count-words', words, words > 0);

		const countSentences = getCountSentences(text);
		updateCounterNode('js-wc-count-sentences', countSentences, countSentences > 0);

		const countParagraphs = getCountParagraphs(text);
		updateCounterNode('js-wc-paragraphs-count', countParagraphs, countParagraphs > 0);

		const readingTime = getReadingTime(text);
		updateCounterNode('js-wc-reading-time', readingTime, !!readingTime);

		const readability = getReadabilityAri(text);
		updateCounterNode('js-wc-readability', readability, !!readability);
	}

	function buildTable(tableId, data) {
		const tableNode = document.getElementById(tableId);
		tableNode.innerText = '';

		for (let i = 0; i < data.length; i++) {
			const tr = document.createElement('tr');
			const tdWord = document.createElement('td');
			tdWord.innerText = data[i].word;
			const tdCount = document.createElement('td');
			tdCount.innerText = data[i].count;
			const tdDensity = document.createElement('td');
			tdDensity.innerText = data[i].densityPercent + '%';
			tr.appendChild(tdWord);
			tr.appendChild(tdCount);
			tr.appendChild(tdDensity);
			tableNode.appendChild(tr);
		}

		if (data.length > 0) {
			document.getElementById(`${tableId}__desc`).classList.add('descr-hide');
			document.getElementById(`${tableId}__container`).classList.add('table-visibly');
		} else {
			document.getElementById(`${tableId}__desc`).classList.remove('descr-hide');
			document.getElementById(`${tableId}__container`).classList.remove('table-visibly');
		}
	}

	function updateTables() {
		const text = getText();
		const includedStopWords = includeStopWords();
		const words = getWords(text, includedStopWords);
		// top words;
		const topWords = getTopWords(words);
		buildTable('top_counter-table', topWords);
		//bigrams
		const topBigrams = getTopBigrams(text);
		buildTable('bigrams_counter-table', topBigrams);

		//trigrams
		const topTrigrams = getTopTrigrams(text);
		buildTable('trigrams_counter-table', topTrigrams);
	}

	function updateButtonsState() {
		const chars = countCharacters(getText());
		let clearButton = document.getElementsByClassName('js-cc-btn-clear')[0];
		let copyButton = document.getElementsByClassName('js-cc-btn-copy')[0];
		let excludeButton = document.getElementsByClassName('js-cc-btn-exclude')[0];

		if (chars > 0) {
			clearButton.removeAttribute('disabled');
			copyButton.removeAttribute('disabled');
			excludeButton.classList.remove('check-button_disabled');
		} else {
			clearButton.setAttribute('disabled', '');
			copyButton.setAttribute('disabled', '');
			excludeButton.classList.add('check-button_disabled');
		}
	}

	function setText(text) {
		document.getElementsByClassName('js-cc-input-text')[0].value = text;
	}

	function clearText() {
		setText('');
		updateCounters();
		const checkboxNode = document.getElementById('excl-stop-w');
		checkboxNode.checked = false;
		showAddStopWordsInput();
	}

	function copyText(text, callback) {
		navigator.clipboard.writeText(text).then(callback, function (err) {
			alert('Something went wrong');
		});
	}

	function showAddStopWordsInput() {
		//Тут нужны фиксы
		const checkboxNode = document.getElementById('excl-stop-w');
		if (checkboxNode.checked) {
			document.getElementsByClassName('add-stop-words')[0].classList.add('add-stop-words_visible');
		} else {
			document.getElementsByClassName('add-stop-words')[0].classList.remove('add-stop-words_visible');
		}
	}

	function updateStopWordsInputState(event) {
		const stopWordsInputNode = document.getElementById('js-wc-stop-words-input');
		if (stopWordsInputNode.value) {
			document.getElementsByClassName('add-stop-words__close')[0].classList.add('add-stop-words__close_visible');
			stopWordsInputNode.classList.add('add-stop-words__input_active');
		} else {
			document.getElementsByClassName('add-stop-words__close')[0].classList.remove('add-stop-words__close_visible');
			stopWordsInputNode.classList.remove('add-stop-words__input_active');
		}
	}

	function bindEvents() {
		let tmText = 0, tmStopWords = 0;
		
		document.getElementsByClassName('js-cc-input-text')[0].addEventListener('input', function () {
			window.clearTimeout(tmText);
			tmText = window.setTimeout(function() {
				updateCounters();
				updateTables();
				updateButtonsState();
            }, 500);
		});

		document.getElementById('js-wc-stop-words-input').addEventListener('input', function (event) {
			window.clearTimeout(tmStopWords);
			tmStopWords = window.setTimeout(function() {
				updateStopWordsInputState(event);
				updateTables();
            }, 500);
		});

		document.getElementById('js-wc-stop-words-close').onclick = function () {
			const stopWordsInputNode = document.getElementById('js-wc-stop-words-input');
			stopWordsInputNode.value = '';
			document.getElementById('js-wc-stop-words-close').classList.remove('add-stop-words__close_visible');
			updateTables();
		};

		document.getElementsByClassName('js-cc-btn-clear')[0].onclick = function () {
			clearText();
			updateButtonsState();
			updateTables();
		};

		document.getElementsByClassName('js-cc-btn-exclude')[0].onclick = function (event) {
			showAddStopWordsInput();
			updateTables();
		};

		document.getElementsByClassName('js-cc-btn-copy')[0].onclick = function (event) {
			let btn = event.currentTarget;

			copyText(getText(), function () {
				btn.classList.add('button-copied');
				btn.getElementsByClassName('js-cc-btn-copy-text')[0].innerText = 'Copied';
				window.setTimeout(function () {
					btn.classList.remove('button-copied');
					btn.getElementsByClassName('js-cc-btn-copy-text')[0].innerText = 'Copy';
				}, 2000);
			});
		};
	}

	document.addEventListener('DOMContentLoaded', function (event) {
		bindEvents();
	});
})();
