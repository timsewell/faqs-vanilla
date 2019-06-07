window.addEventListener('DOMContentLoaded', function () {
var containerEl = document.getElementById('container'),
    listEl = document.getElementsByTagName('ul')[0];

    function renderList (aResponse) {
        var faqs = aResponse.faqs;
        if (faqs.length) {
            faqs.forEach(function (aFaq, aIndex) {
                var li = document.createElement('li'),
                    qSpan = document.createElement('span'),
                    aSpan = document.createElement('span'),
                    switchSpan = document.createElement('span');

                qSpan.classList.add('question');
                aSpan.classList.add('answer');
                switchSpan.classList.add('switch');
                qSpan.textContent = 'Q: ' + aFaq.question;
                aSpan.textContent = aFaq.answer;
                switchSpan.textContent = '[ + ]';
                qSpan.appendChild(switchSpan);

                li.appendChild(qSpan);
                li.appendChild(aSpan);
                listEl.appendChild(li);
            });

            document.addEventListener('click', function (aEvent) {
                if (aEvent.target && aEvent.target.classList.contains('question')) {
                    var answerEl = aEvent.target.closest('li').getElementsByClassName('answer')[0],
                        active = answerEl.classList.contains('active'),
                        answerEls = document.getElementsByClassName('answer');

                    for (var i = 0; i < answerEls.length; i++) {
                        answerEls.item(i).classList.remove('active');
                    }
                    answerEl.classList.toggle('active', !active);
                }
            });
        }
    }

    function handleError () {
        var p = document.createElement('p');

        p.classList.add('error');
        p.textContent = 'Sorry, the call to the server failed';
        containerEl.appendChild(p);
    }

    fetch('https://api.myjson.com/bins/jw3rg')
        .then(function (aResponse) {
        if (aResponse.ok) {
            return aResponse.json();
        }
        else {
            throw new Error();
        }
        }).then(function (aResponseJson) {
            renderList(aResponseJson)
        }).catch(function (aError) {
            handleError();
        });
});