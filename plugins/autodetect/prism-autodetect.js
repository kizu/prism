(function(){

if (!self.Prism) {
	return;
}

function detectLanguage(element) {
	var result = 'none';
	var resultScore = 0;

	for (key in Prism.languages) {
		var tokensCount = 0;
		var unparsedCount = 0;
		if (typeof Prism.languages[key] === 'object') {
			tokens = Prism.tokenize(element.textContent,Prism.languages[key]);
			for (var i=0, token; token = tokens[i++];) {
				if (typeof token === 'string') {
					unparsedCount++;
				} else{
					tokensCount++;
				}
			}
			if (tokensCount - unparsedCount > resultScore) {
				result = key;
				resultScore = tokensCount - unparsedCount;
			}
		}
	}
	return result;
}

var elements = document.querySelectorAll('code:not([class*="language-"])');

for (var i=0, element; element = elements[i++];) {
	language = detectLanguage(element);
	element.className = element.className + ' language-' + language;
	Prism.highlightElement(element, false);
}

})();
