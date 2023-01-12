version = '1.0.7';
document.querySelector('.version').innerText = `version: ${version}`;

if (localStorage.getItem('patch') == null || localStorage.getItem('patch') != version) {
	localStorage.setItem('patch', version);
	localStorage.removeItem('data');
	location.reload();
}

let data;

const loot = [
	document.querySelector('.loot__a'),
	document.querySelector('.loot__b'),
	document.querySelector('.loot__c'),
];
const info = {
	damage: document.querySelector('.info__damage'),
	critChance: document.querySelector('.info__crit-chance'),
	critMultiply: document.querySelector('.info__crit-multiply'),
	tier: document.querySelector('.info__tier'),
}

const save = () => localStorage.setItem('data', JSON.stringify(data));

const nullData = () => {
	data = {
		level: 0,
		enemy: enemies_data[levels[0]],

		damage: 1,
		critChance: 5,
		critMultiply: 2,

		purchases: [0, 0, 0],

		currentHp: enemies_data[levels[0]].hp,
		maxHp: enemies_data[levels[0]].hp,
		progressBar: 100,

		loot: [0, 0, 0],

		finished: false,

		tier: 1,
	}
}

if (localStorage.getItem('data') == null) {
	nullData();
	save();
} else {
	data = JSON.parse(localStorage.getItem('data'));
}

const setInfo = () => {
	info.damage.innerText = data.damage;
	info.critChance.innerText = `${data.critChance}%`;
	info.critMultiply.innerText = `x${data.critMultiply}`;
	info.tier.innerText = data.tier;
}

const setLoot = () => {
	for (let i = 0; i < loot.length; i++) {
		loot[i].innerText = data.loot[i];
	}
}