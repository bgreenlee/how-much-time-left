"use strict";

(function () {
    let targets = [
        {
            'keyword': 'trump',
            'title': 'Until Trump is Out of Office',
            'date': '2029-01-20T12:00:00-05:00',
            'done': 'Trump is out of office!'
        },
        {
            'keyword': 'midterms',
            'title': 'Until the Midterm Elections',
            'link': 'https://en.wikipedia.org/wiki/United_States_midterm_election',
            'date': '2026-11-03T05:00:00-05:00', // Polls open at 5am in Maine
            'done': 'The midterms are here/over!'
        },
        {
            'keyword': 'y2k38',
            'title': 'Until the Epochalypse',
            'link': 'https://en.wikipedia.org/wiki/Year_2038_problem',
            'date': '2038-01-19T03:14:07Z',
            'done': 'The Epochalypse has passed!'
        }
    ];
    let countdownTimer = null;

    // Populate the menu with the targets
    function populateMenu() {
        let menu = document.getElementById('menu');
        menu.innerHTML = '';
        // sort targets by date
        targets.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });
        targets.forEach(target => {
            // skip targets that have already passed
            if (new Date(target.date) < new Date()) {
                return;
            }
            let item = document.createElement('li');
            let link = document.createElement('a');
            link.href = `#${target.keyword}`;
            link.textContent = `...${target.title}?`;
            item.appendChild(link);
            if (target.link) {
                let moreInfo = document.createElement('a');
                moreInfo.href = target.link;
                moreInfo.textContent = "ⓘ";
                moreInfo.classList.add("info");
                item.appendChild(moreInfo);
            }
            menu.appendChild(item);
        });
        menu.style.display = 'block';
    }

    function hideMenu() {
        let menu = document.getElementById('menu');
        menu.style.display = 'none';
    }

    function updateTitle(target) {
        const titleElement = document.getElementById('title');
        titleElement.innerHTML = `<br>${target.title}?`;
    }

    function resetTitle() {
        const titleElement = document.getElementById('title');
        titleElement.textContent = '...';
    }

    function updateTargetDate(target) {
        const targetDate = document.getElementById('target-date');
        targetDate.textContent = new Date(target.date).toString();
    }

    function hideTargetDate() {
        const targetDate = document.getElementById('target-date');
        targetDate.textContent = '';
    }

    function pluralize(units, amount) {
        let unitStr = amount === 1 ? units : `${units}s`;
        return `${amount} ${unitStr}`;
    }

    function updateTimeLeft(target) {
        const timeElement = document.getElementById('time-left');
        const targetDate = new Date(target.date);
        const now = new Date();
        let diff = targetDate - now;

        if (diff < 0) {
            element.textContent = target.done;
            return;
        }

        const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
        diff -= weeks * (1000 * 60 * 60 * 24 * 7);

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        diff -= days * (1000 * 60 * 60 * 24);

        const hours = Math.floor(diff / (1000 * 60 * 60));
        diff -= hours * (1000 * 60 * 60);

        const minutes = Math.floor(diff / (1000 * 60));
        diff -= minutes * (1000 * 60);

        const seconds = Math.floor(diff / 1000);

        timeElement.innerHTML = `
            ${pluralize('week', weeks)}<br>
            ${pluralize('day', days)}<br>
            ${pluralize('hour', hours)}<br>
            ${pluralize('minute', minutes)}<br>
            ${pluralize('second', seconds)}`;
    }

    function hideTimeLeft() {
        const timeElement = document.getElementById('time-left');
        timeElement.textContent = '';
    }

    function updatePage() {
        let target = null;
        const hash = window.location.hash;
        if (hash) {
            target = targets.find(target => `#${target.keyword}` === hash);
        }

        if (target !== null) {
            hideMenu();
            updateTitle(target);
            updateTargetDate(target);
            updateTimeLeft(target);
            clearInterval(countdownTimer);
            countdownTimer = setInterval(updateTimeLeft, 1000, target);
        } else {
            clearInterval(countdownTimer);
            resetTitle();
            hideTargetDate();
            hideTimeLeft();
            populateMenu();
        }
    }

    updatePage();
    // call updatePage whenever a menu link is clicked
    addEventListener("hashchange", () => {
        updatePage();
    });
    // document.getElementById('menu').addEventListener('click', updatePage);
})();