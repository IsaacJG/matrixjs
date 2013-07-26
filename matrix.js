var canvas;
var ctx;
window.onload = function () {init()};

function init () {
	canvas = document.getElementById('matrix');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx = canvas.getContext('2d');
	drawBackground();
	var letters = generateLetters(500);
	setInterval(function () {
		drawBackground();
		drawLetters(letters);
	}, 40);
};

function drawBackground() {
	ctx.fillStyle = '#000000';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function getRandomChar() {
	var chars = ['a', 'b', 'c', 'd', 'e', 'f',
			'g', 'h', 'i', 'j', 'k', 'l', 'm',
			'n', 'o', 'p', 'q', 'r', 's', 't',
			'u', 'v', 'w', 'x', 'y', 'z', 'ƒ',
			'Æ', 'Œ', 'œ', '£', '¥', '§', 'µ',
			'Ç', 'Ð', '×', 'Ø', 'Ü', 'Þ', 'ß',
			'ä', 'ï', 'ð', 'þ', '¢', 'α', 'π',
			'Σ', 'σ', 'τ', 'Φ', 'Θ', 'Ω', 'δ',
			'∞', 'φ', 'ε', '∩', '√', '■', 'É',
			'Ÿ', 'Á', 'Ñ'];
	return chars[parseInt(Math.random()*chars.length)];
}

function getDelta() {
	return (Math.random()*10)+1;
}

function generateClist() {
	var i = Math.random()*10;
	var clist = [];
	if (i === 0) i = 1;
	while (i > 0) {
		clist.push(getRandomChar());
		i--;
	}
	return clist;
}

function generateLetters(n) {
	var letters = [];
	for (var i=0; i < n; i++) {
		var clist = generateClist();
		letters.push(new Letter(clist, getDelta(), (Math.random()*canvas.width)+1, 20));
	}
	return letters;
}

function drawLetters(letters) {
	letters.forEach(function (element, index, array) {
		element.draw(ctx);
		element.tick();
	});
}

var Letter = Class.create({
	initialize: function(clist, delta, x, y) {
		this.clist = clist;
		this.delta = delta
		this.x = x;
		this.y = y;
		this.dead = false;
		this.color = "#00FF00";
	},
	draw: function(ctx) {
		ctx.fillStyle = this.color;
		ctx.font = 'Bold 12px Arial';
		for (var i=0; i < this.clist.length; i++) {
			ctx.fillText(this.clist[i], this.x, this.y+(12*i));
		}
	},
	tick: function() {
		this.y += this.delta;
		if (this.y >= canvas.height)
			this.y = 0;
	}
});