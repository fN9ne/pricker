setLoot();
setInfo();

class Buff {
	constructor(buffLabel, buffNum, buffStat) {
		this.buffLabel = buffLabel;
		this.buffNum = buffNum;
		this.buffStat = buffStat;
	}
}
class ShopItem {
	constructor(buff, cost, valute) {
		this.buff = buff;
		this.cost = cost;
		this.valute = valute;
	}
}

const loadAlert = () => {
	const item = document.createElement('div');
	const itemContainer = document.createElement('div');
	itemContainer.innerHTML = 'Ваш <span>Tier</span> не соответстует уровню товара. Победите следующего <span>босса</span> для разблокировки.';
	itemContainer.classList.add('alert__content');
	item.append(itemContainer);
	item.classList.add('alert');
	document.body.append(item);
	item.classList.add('hidden');
	item.addEventListener('click', () => item.classList.add('hidden'));
}
const showAlert = () => {
	document.querySelector('.alert').classList.remove('hidden');
	setTimeout(() => {
		document.querySelector('.alert').classList.add('hidden');
	}, 3000);
}
loadAlert();

const loadShop = () => {
	const $shop = {
		parent: document.createElement('ul'),
	};

	$shop.parent.classList.add('shop');

	document.querySelector('.wrapper').append($shop.parent);

	const createShopItem = (obj) => {
		const valuteImage = document.createElement('img');
		let source = 'img/loot/';

		const item = document.createElement('li');
		const buff = document.createElement('div');
		const costContainer = document.createElement('div');
		const cost = document.createElement('div');
		const valute = document.createElement('div');

		const classes = ['shop__item', 'shop__buff', 'shop__cost', 'shop__cost-num', 'shop__cost-valute'];
		const classedElements = [item, buff, costContainer, cost, valute];

		for (let i = 0; i < classes.length; i++) {
			classedElements[i].classList.add(classes[i]);
		}

		item.append(buff);
		buff.innerText = obj.buff.buffLabel;

		item.append(costContainer);

		costContainer.append(cost);

		cost.innerText = obj.cost[data.purchases[obj.valute]];

		costContainer.append(valute);
		switch (obj.valute) {
			case 0:
				source += 'cable.svg';
				break;
			case 1:
				source += 'battery.svg';
				break;
			case 2:
				source += 'chip.svg';
				break;
		}
		valute.append(valuteImage);
		valuteImage.setAttribute('src', source);

		document.querySelector('.shop').append(item);

		item.addEventListener('click', () => {
			if (data.loot[obj.valute] >= obj.cost[data.purchases[obj.valute]]) {
				switch (obj.buff.buffStat) {
					case 'damage':
						if (data.purchases[0] < 1 && data.tier == 1
							|| data.purchases[0] < 3 && data.tier == 2
							|| data.purchases[0] < 6 && data.tier == 3
							|| data.purchases[0] < 99999 && data.tier == 4) {
							data.damage += obj.buff.buffNum;
							if (data.damage >= 15) {
								item.remove();
							}
						} else {
							showAlert();
							return false;
						}
						break;
					case 'critChance':
						if (data.purchases[1] < 1 && data.tier == 1
							|| data.purchases[1] < 3 && data.tier == 2
							|| data.purchases[1] < 7 && data.tier == 3
							|| data.purchases[1] < 99999 && data.tier == 4) {
							data.critChance += obj.buff.buffNum;
							if (data.critChance >= 20) {
								item.remove();
							}
						} else {
							showAlert();
							return false;
						}
						break;
					case 'critMultiply':
						if (data.tier == 4) {
							data.critMultiply += obj.buff.buffNum;
							if (data.critMultiply >= 5) {
								item.remove();
							}
						} else {
							showAlert();
							return false;
						}
						break;
				}

				data.loot[obj.valute] -= obj.cost[data.purchases[obj.valute]];
				data.purchases[obj.valute]++;
				cost.innerText = obj.cost[data.purchases[obj.valute]];

				save();
				setInfo();
				setLoot();

				item.classList.add('shop__item_valid');
				setTimeout(() => {
					item.classList.remove('shop__item_valid');
				}, 500);
			} else {
				item.classList.add('shop__item_invalid');
				setTimeout(() => {
					item.classList.remove('shop__item_invalid');
				}, 500);
			}
		});
	}
	if (data.damage < 15) {
		createShopItem(new ShopItem(new Buff('Damage + 1', 1, 'damage'), [5, 6, 7, 8, 9, /**/ 11, 13, 15, 17, 19, /**/ 22, 25, 28, 31], 0));
	}
	if (data.critChance < 20) {
		createShopItem(new ShopItem(new Buff('Crit chance + 1%', 1, 'critChance'), [2, 3, 4, 5, 6, /**/ 8, 10, 12, 14, 16, /**/ 19, 22, 25, 28, 31], 1));
	}
	if (data.critMultiply < 5) {
		createShopItem(new ShopItem(new Buff('Crit multiply + 100%', 1, 'critMultiply'), [1, 2, 6], 2));
	}
}

loadShop();

/* function a(a) {
	res = 0;
	for (let i = 0; i < a.length; i++) {
		res += a[i];
	}
	console.log(res);
} */