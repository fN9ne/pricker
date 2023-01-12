class Enemy {
	constructor(hp, loot, name, image, tier) {
		this.hp = hp;
		this.loot = loot;
		this.name = name;
		this.image = `img/${image}`;
		this.tier = tier;
	}
}
const levels = [
	/* Tier 1 */
	0, 1, 2, 3, 4, 2, 1, 0, 3, 4,
	0, 3, 2, 1, 3, 2, 4, 3, 2,
	/* Tier 1 Boss */
	20,
	/* Tier 2 */
	5, 6, 7, 8, 9, 5, 7, 6, 8, 9,
	5, 8, 9, 6, 7, 8, 6, 5, 7,
	/* Tier 2 Boss */
	21,
	/* Tier 3 */
	10, 11, 12, 13, 14, 10, 13, 14, 12, 11,
	13, 12, 14, 10, 13, 10, 12, 11, 14,
	/* Tier 3 Boss */
	22,
	/* Tier 4 */
	15, 16, 17, 18, 19, 16, 15, 19, 18, 17,
	15, 19, 16, 17, 15, 17, 19, 18, 16,
	/* Tier 4 Boss */
	23,
];
const enemies_data = [
	new Enemy(18, [1, 0, 0], 'Greg', 'greg.jpg', 1),
	new Enemy(23, [2, 0, 0], 'Denny', 'denny.jpg', 1),
	new Enemy(20, [1, 0, 0], 'Kirik', 'kirik.jpg', 1),
	new Enemy(25, [0, 1, 0], 'Dima', 'dima.jpg', 1),
	new Enemy(15, [1, 0, 0], 'Sero', 'sero.jpg', 1),

	new Enemy(50, [3, 1, 0], 'Bond', 'bond.jpg', 2),
	new Enemy(56, [4, 1, 0], 'Light Mihev', 'light_mihev.jpg', 2),
	new Enemy(45, [0, 3, 0], 'Nigey', 'nikola.jpg', 2),
	new Enemy(72, [3, 2, 0], 'Pixel', 'pixel.jpg', 2),
	new Enemy(83, [3, 2, 0], 'Mark I', 'mark1.jpg', 2),

	new Enemy(123, [3, 1, 0], 'Smilak', 'smilak.jpg', 3),
	new Enemy(142, [4, 3, 0], 'Mark II', 'mark2.jpg', 3),
	new Enemy(112, [5, 1, 0], 'Serj', 'serj.jpg', 3),
	new Enemy(192, [3, 5, 0], 'Mihael', 'mihael.jpg', 3),
	new Enemy(165, [2, 2, 0], 'Nik', 'nik.jpg', 3),

	new Enemy(283, [2, 8, 1], 'Dark Mihev', 'dark_mihev.jpg', 4),
	new Enemy(210, [3, 4, 1], 'Gregor', 'gregor.jpg', 4),
	new Enemy(313, [2, 4, 0], 'Mary', 'mary.jpg', 4),
	new Enemy(256, [1, 3, 0], 'Kliomo', 'kliomo.jpg', 4),
	new Enemy(231, [2, 4, 0], 'Zah', 'zah.jpg', 4),

	new Enemy(212, [16, 4, 0], 'Alexory', 'alexory.jpg', 1),
	new Enemy(613, [21, 9, 0], 'Faceless', 'faceless.jpg', 2),
	new Enemy(1800, [10, 19, 1], 'Kuni-master', 'murder.jpg', 3),
	new Enemy(19992, [0, 0, 0], 'Julia', 'julia.jpg', 4),
];

/* function a() {
	res = [0, 0, 0];
	for (let i = 0; i < levels.length; i++) {
		res[0] += enemies_data[levels[i]].loot[0];
		res[1] += enemies_data[levels[i]].loot[1];
		res[2] += enemies_data[levels[i]].loot[2];
	}
	console.log(res);
}
a(); */