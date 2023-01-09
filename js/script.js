class Enemy {
	constructor(name, image, tier, hp, loot, isBoss = false) {
		this.name = name;
		this.image = `img/${image}`;
		this.tier = tier;
		this.hp = hp;
		this.loot = loot;
		this.isBoss = isBoss;
	}
}
const levels = [
	/* Tier 1 */
	0, 1, 3, 2, 1, 0, 3, 2, 1, 3,
	2, 0, 1, 0, 3, 2, 3, 0, 1, 0,
	3, 1, 2, 3,
	4,
	/* Tier 2 */
	5, 7, 6, 8, 5, 7, 6, 5, 7, 8,
	5, 8, 7, 5, 6, 7, 6, 7, 8, 5,
	6, 7, 6, 8,
	9,
];
const enemies_data = [
	new Enemy('Denny', 'denny.jpg', 1, 30, [2, 1, 0, 0]),
	new Enemy('Smilak', 'smilak.jpg', 1, 25, [2, 0, 0, 0]),
	new Enemy('Kirik', 'kirik.jpg', 1, 20, [0, 1, 0, 0]),
	new Enemy('Mihael', 'mihael.jpg', 1, 25, [0, 1, 0, 0]),
	new Enemy('Nikola', 'nikola.jpg', 1, 220, [9, 10, 1, 0], true),
	new Enemy('Dark Mihev', 'dark_mihev.jpg', 2, 190, [0, 0, 0, 0]),
	new Enemy('Gregor', 'gregor.jpg', 2, 175, [0, 0, 0, 0]),
	new Enemy('Kliomo', 'kliomo.jpg', 2, 200, [0, 0, 0, 0]),
	new Enemy('Sero', 'sero.jpg', 2, 190, [0, 0, 0, 0]),
	new Enemy('Alexory', 'alexory.jpg', 2, 1510, [0, 0, 0, 0], true),
];


/* =============================================================== */

isSetValueVisible = false;

const $ = {
	level: document.querySelector('.enemy__level'),
	main: document.querySelector('.enemy'),
	enemy: document.querySelector('.enemy button'),
	name: document.querySelector('.enemy__name'),
	currentHp: document.querySelector('.health__current'),
	maxHp: document.querySelector('.health__max'),
	progressBar: document.querySelector('.health__bar span'),
	loot: [
		document.querySelector('.loot__a'),
		document.querySelector('.loot__b'),
		document.querySelector('.loot__c'),
		document.querySelector('.loot__d'),
	],
};



let data;
const save = () => localStorage.setItem('data', JSON.stringify(data));

if (localStorage.getItem('data') == null) {
	data = {
		level: 0,
		enemy: enemies_data[levels[0]],
		damage: 1,
		currentHp: enemies_data[levels[0]].hp,
		maxHp: enemies_data[levels[0]].hp,
		loot: [0, 0, 0, 0],
		progressBar: 100,
	}
	save();
} else {
	data = JSON.parse(localStorage.getItem('data'));
}

if (isSetValueVisible) {
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

	document.querySelector('.wrapper').append($sl.parent)

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
	}

	$sl.submit.addEventListener('click', () => setLevel(parseInt($sl.input.value - 1)));
	$sl.prev.addEventListener('click', () => setLevel(parseInt(data.level - 1)));
	$sl.next.addEventListener('click', () => setLevel(parseInt(data.level + 1)));
}

const setEnemy = () => {
	$.name.innerText = data.enemy.name;
	$.currentHp.innerText = data.currentHp;
	$.maxHp.innerText = data.maxHp;
	$.level.innerHTML = `Level: <span>${data.level + 1}</span>`;
	$.progressBar.style.width = `${data.progressBar}%`;
}

const renderImage = () => {
	if ($.enemy.childElementCount != 0) $.enemy.children[0].remove();

	let image = document.createElement('img');

	image.classList.add('enemy__image');
	image.setAttribute('src', data.enemy.image);
	$.enemy.append(image);
}

const setLoot = () => {
	for (let i = 0; i < $.loot.length; i++) {
		$.loot[i].innerText = data.loot[i];
	}
}

const init = () => {
	setEnemy();
	renderImage();
	setLoot();
}

init();

const getRewards = () => {
	for (let i = 0; i < data.loot.length; i++) {
		data.loot[i] += data.enemy.loot[i];
	}
}
const resetData = () => {
	data.level++;
	data.enemy = enemies_data[levels[data.level]];
	data.currentHp = data.maxHp = enemies_data[levels[data.level]].hp;
	data.progressBar = 100;
}

const damageNumber = (event) => {
	const item = document.createElement('div');

	item.classList.add('enemy__damage');
	item.innerText = data.damage;
	item.style.top = `${event.clientY - $.main.getBoundingClientRect().top}px`;
	item.style.left = `${event.clientX - $.main.getBoundingClientRect().left}px`;

	$.main.append(item);

	setTimeout(() => {
		item.remove();
	}, 500);
}

const punch = () => {
	if (data.currentHp > 0) {
		data.currentHp -= data.damage;
		data.progressBar -= data.damage / (data.maxHp / 100);
		damageNumber(event);
	}
	if (data.currentHp <= 0) {
		getRewards();
		resetData();
		save();
		init();
	}
	$.currentHp.innerText = data.currentHp;
	$.progressBar.style.width = `${data.progressBar}%`;
}

$.enemy.addEventListener('click', punch);



// window.onunload = () => save();