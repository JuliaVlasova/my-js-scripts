(function() {
    function countCharacters(text) {
        return text.replace(/[\r\n]+/g, '').length;
    }

    function countWords(text) {
        return text.split(/\s+/g).filter(function(n) {return n !== '';}).length;
    }

    function updateCounters() {
        const text = getText();
        const chars = countCharacters(text);
        const words = countWords(text);
        let charsNode = document.getElementsByClassName('js-cc-count-chars')[0];
        let wordsNode = document.getElementsByClassName('js-cc-count-words')[0];

        charsNode.innerText = chars;
        charsNode.setAttribute('title', chars);
        wordsNode.innerText = words;
        wordsNode.setAttribute('title', words);
    }

    function updateButtonsState() {
        const chars = countCharacters(getText());
        let clearButton = document.getElementsByClassName('js-cc-btn-clear')[0];
        let copyButton = document.getElementsByClassName('js-cc-btn-copy')[0];

        if (chars > 0) {
            clearButton.removeAttribute('disabled');
            copyButton.removeAttribute('disabled');
        } else {
            clearButton.setAttribute('disabled', '');
            copyButton.setAttribute('disabled', '');
        }
    }

    function getText() {
        return document.getElementsByClassName('js-cc-input-text')[0].value;
    }

    function setText(text) {
        document.getElementsByClassName('js-cc-input-text')[0].value = text;
    }

    function clearText() {
        setText('');
    }

    function copyText(text, callback) {
        navigator.clipboard.writeText(text).then(callback, function(err) {
            alert('Something went wrong');
        });
    }

    function convertToTitleCase(text) {
        const titleCaseExcluded = [
            'a', 'an', 'and', 'but', 'for', 'is', 'nor', 'of', 'or', 'the', 'to',
            'в', 'к', 'до', 'по', 'из-за', 'за', 'на', 'над', 'под', 'перед', 'у', 'для', 'или', 'с', 'и', 'то',
        ];

        text = text.toLowerCase();

        text = text.split(/(\s+)/g).map(word => {
            if (titleCaseExcluded.includes(word)) {
                return word;
            }

            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join('');

        // replace "Rank Tracker: the Aleida" to "Rank Tracker: The Aleida"
        text = text.replace(/\:\s*[a-zÀ-žа-я]{1}/g, function(colonAndLetter) {
            return colonAndLetter.toUpperCase();
        });

        // replace "Self-report" to "Self-Report"
        text = text.replace(/\-[a-zÀ-žа-я]{1}/g, function(hyphenAndLetter) {
            return hyphenAndLetter.toUpperCase();
        });

        return text;
    }

    function convertToSentenceCase(text) {
        let sentences = text.match(/[^\.!\?]+[\.!\?]?\s*/g);

        if (sentences === null) {
            sentences = [text];
        }

        return sentences.map(function(sentence) {
            return sentence[0].toUpperCase() + sentence.substring(1).toLowerCase();
        }).join('');
    }

    function convertToUpperCase(text) {
        return text.toUpperCase();
    }

    function convertToLowerCase(text) {
        return text.toLowerCase();
    }

    function convertCapitalizeFirstLetter(text) {
        text = text.toLowerCase();

        return text.replace(/(^|\s)([a-zÀ-žа-я])/g, function(m, p1, p2) {
            return p1 + p2.toUpperCase();
        });
    }

    function convertToAlternate(text) {
        let i = 0;
        return text.replace(/([a-zÀ-žа-я])/gi, function(m, p1) {
            return (++i % 2 === 0) ? p1.toUpperCase() : p1.toLowerCase();
        });
    }

    function convertToggle(text) {
        let excludedToLower = [];

        return text.replace(/([a-zÀ-žа-я])/g, function(m, p1, offset) {
            excludedToLower.push(offset);
            return p1.toUpperCase();
        }).replace(/([A-ZÀ-žА-Я])/g, function(m, p1, offset) {
            return excludedToLower.includes(offset) ? p1 : p1.toLowerCase();
        });
    }

    function bindEvents() {
        let tm = 0;
        
        document.getElementsByClassName('js-cc-input-text')[0].addEventListener('input', function() {
            window.clearTimeout(tm);
            tm = window.setTimeout(function() {
                updateCounters();
                updateButtonsState();
            }, 500);
        });

        document.getElementsByClassName('js-cc-btn-title-case')[0].onclick = function() {
            setText(convertToTitleCase(getText()));
        };

        document.getElementsByClassName('js-cc-btn-sentence-case')[0].onclick = function() {
            setText(convertToSentenceCase(getText()));
        };

        document.getElementsByClassName('js-cc-btn-upper-case')[0].onclick = function() {
            setText(convertToUpperCase(getText()));
        };

        document.getElementsByClassName('js-cc-btn-lower-case')[0].onclick = function() {
            setText(convertToLowerCase(getText()));
        };

        document.getElementsByClassName('js-cc-btn-first-letter')[0].onclick = function() {
            setText(convertCapitalizeFirstLetter(getText()));
        };

        document.getElementsByClassName('js-cc-btn-alternate')[0].onclick = function() {
            setText(convertToAlternate(getText()));
        };

        document.getElementsByClassName('js-cc-btn-toggle')[0].onclick = function() {
            setText(convertToggle(getText()));
        };

        document.getElementsByClassName('js-cc-btn-clear')[0].onclick = function() {
            clearText();
            updateCounters();
            updateButtonsState();
        };

        document.getElementsByClassName('js-cc-btn-copy')[0].onclick = function(event) {
            let btn = event.currentTarget;

            copyText(getText(), function() {
                btn.classList.add('button-copied');
                btn.getElementsByClassName('js-cc-btn-copy-text')[0].innerText = 'Copied';
                window.setTimeout(function() {
                    btn.classList.remove('button-copied');
                    btn.getElementsByClassName('js-cc-btn-copy-text')[0].innerText = 'Copy';
                }, 2000);
            });
        };
    }

    document.addEventListener('DOMContentLoaded', function(event) {
        bindEvents();
    });
})();
