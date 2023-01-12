let isAdminPanelActive = false;

const $ = {
	level: document.querySelector('.enemy__level'),
	boss: document.querySelector('.enemy__boss'),
	main: document.querySelector('.enemy'),
	enemy: document.querySelector('.enemy button'),
	name: document.querySelector('.enemy__name'),
	currentHp: document.querySelector('.health__current'),
	maxHp: document.querySelector('.health__max'),
	progressBar: document.querySelector('.health__bar span'),
};


if (isAdminPanelActive) {
	const panel = document.createElement('div');
	panel.classList.add('admin-panel');
	document.querySelector('.wrapper').append(panel);

	const setLevel = () => {
		const $sl = {
			parent: document.createElement('div'),
			main: document.createElement('div'),
			input: document.createElement('input'),
			submit: document.createElement('button'),
			buttons: document.createElement('div'),
			prev: document.createElement('button'),
			next: document.createElement('button'),
		}

		const classes = ['setlevel', 'setlevel__main', 'setlevel__buttons', 'setlevel__prev', 'setlevel__next'];
		const classedElements = [$sl.parent, $sl.main, $sl.buttons, $sl.prev, $sl.next];

		for (let i = 0; i < classes.length; i++) {
			classedElements[i].classList.add(classes[i]);
		}

		$sl.input.setAttribute('type', 'text');
		$sl.submit.innerText = 'submit';
		$sl.prev.innerText = 'prev';
		$sl.next.innerText = 'next';

		$sl.parent.append($sl.main);
		$sl.main.append($sl.input);
		$sl.main.append($sl.submit);

		$sl.parent.append($sl.buttons);
		$sl.buttons.append($sl.prev);
		$sl.buttons.append($sl.next);

		panel.append($sl.parent);

		$sl.input.value = data.level + 1;

		const setLevel = (level) => {
			min = 0;
			max = levels.length - 1;

			if (min <= level && level <= max) {
				$sl.input.value = level + 1;
				data.level = level;
				data.enemy = enemies_data[levels[level]];
				data.currentHp = data.maxHp = enemies_data[levels[level]].hp;
				data.progressBar = 100;
				setEnemy();
				renderImage();
				save();
			}

			data.finished = false;
		}

		$sl.submit.addEventListener('click', () => setLevel(parseInt($sl.input.value - 1)));
		$sl.prev.addEventListener('click', () => setLevel(parseInt(data.level - 1)));
		$sl.next.addEventListener('click', () => setLevel(parseInt(data.level + 1)));
	}
	const clearData = () => {
		const $clear = {
			button: document.createElement('button'),
		}

		$clear.button.classList.add('clear-data');
		$clear.button.innerText = 'Clear';

		panel.append($clear.button);

		$clear.button.addEventListener('click', () => {
			nullData();
			localStorage.removeItem('data');
			init();
		});
	}
	setLevel();
	clearData();
}

const isCrit = (chance) => {
	array = Array(100);

	for (let i = 0; i < chance; i++) {
		array[i] = 1;
	}

	return array[Math.floor(Math.random() * 100)] == 1 ? true : false;
}

const setEnemy = () => {
	$.name.innerText = data.enemy.name;
	$.currentHp.innerText = data.currentHp;
	$.maxHp.innerText = data.maxHp;
	$.level.innerHTML = `Level: <span>${data.level + 1}</span>`;
	if (data.level == 19 || data.level == 39 || data.level == 59 || data.level == 79) {
		$.boss.classList.add('enemy__boss_active');
	} else {
		$.boss.classList.remove('enemy__boss_active');
	}
	$.progressBar.style.width = `${data.progressBar}%`;
}

const renderImage = () => {
	if ($.enemy.childElementCount != 0) $.enemy.children[0].remove();

	let image = document.createElement('img');

	image.classList.add('enemy__image');
	image.setAttribute('src', data.enemy.image);
	$.enemy.append(image);
}


const init = () => {
	if (!data.finished) {
		setEnemy();
		renderImage();
	} else {
		document.querySelector('.enemy').remove();

		const endGameTitle = document.createElement('div');
		endGameTitle.innerText = 'The End';

		document.body.append(endGameTitle);

		endGameTitle.style.position = 'absolute';
		endGameTitle.style.left = '50%';
		endGameTitle.style.top = '50%';
		endGameTitle.style.fontSize = '24px';
		endGameTitle.style.fontWeight = '700';
		endGameTitle.style.transform = 'translate(-50%, -50%)';
	}
	setLoot();
	setInfo();
}

init();

const getRewards = () => {
	for (let i = 0; i < data.loot.length; i++) {
		data.loot[i] += data.enemy.loot[i];
	}
}
const loadNextData = () => {
	if (data.level == 19 || data.level == 39 || data.level == 59 || data.level == 79) {
		data.tier++;
	}

	data.level++;

	if (data.level > levels.length - 1) {
		data.finished = true;
	} else {
		data.enemy = enemies_data[levels[data.level]];
		data.currentHp = data.maxHp = enemies_data[levels[data.level]].hp;
		data.progressBar = 100;

		if (isAdminPanelActive) {
			document.querySelector('.setlevel input').value = data.level + 1;
		}
	}
}

const damageNumber = (damage, event) => {
	const item = document.createElement('div');

	item.classList.add('enemy__damage');
	if (data.damage != damage) {
		item.style.animationDuration = '1000ms';
		item.style.fontSize = `64px`;
		item.innerText = `☇${damage}`
		setTimeout(() => {
			item.remove();
		}, 1000);
	} else {
		item.innerText = damage;
		setTimeout(() => {
			item.remove();
		}, 500);
	}
	item.style.top = `${event.clientY - $.main.getBoundingClientRect().top}px`;
	item.style.left = `${event.clientX - $.main.getBoundingClientRect().left}px`;

	$.main.append(item);
}

const punch = () => {
	if (data.currentHp > 0) {
		damage = isCrit(data.critChance) ? data.damage * data.critMultiply : data.damage;
		data.currentHp -= damage;
		data.progressBar -= damage / (data.maxHp / 100);
		damageNumber(damage, event);
	}
	if (data.currentHp <= 0) {
		getRewards();
		loadNextData();
		save();
		init();
		location.reload();
	}
	$.currentHp.innerText = data.currentHp;
	$.progressBar.style.width = `${data.progressBar}%`;
}

$.enemy.addEventListener('click', punch);

const regeneration = () => {
	let hpRegen;
	if (data.level == 19 || data.level == 39 || data.level == 59 || data.level == 79) {
		hpRegen = data.tier * data.tier * 5;
	} else {
		hpRegen = data.tier * data.tier;
	}
	const regenNum = document.createElement('div');
	regenNum.classList.add('enemy__regen');
	regenNum.innerText = hpRegen;
	setInterval(() => {
		if (data.currentHp < data.maxHp) {
			data.currentHp += hpRegen;
			data.progressBar += hpRegen / (data.maxHp / 100);
			setEnemy();
			$.main.append(regenNum);
		}
		if (data.currentHp > data.maxHp) {
			data.currentHp = data.maxHp;
			data.progressBar = 100;
			setEnemy();
		}
	}, 4000 / data.tier);
};
regeneration();


// window.onunload = () => save();