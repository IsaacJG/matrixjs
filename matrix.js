var canvas;
var ctx;
window.onload = function () {init()};

function init () {
	canvas = document.getElementById('matrix');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx = canvas.getContext('2d');
	drawBackground();
	var letters = generateLetters();
	setInterval(function () {
		drawBackground();
		drawLetters(letters);
	}, 100);
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

function generateLetters() {
	var letters = [];
	var x = canvas.width/10;
	var y = canvas.height/20;
	for (var i=0; i < x; i++) {
		for (var j=0; j < y; j++) {
			letters.push(new Letter(getRandomChar(), getDelta(), i*10, j*20));
		}
	}
	return letters;
}

function drawLetters(letters) {
	letters.forEach(function (element, index, array) {
		if (index < array.length - 1) {
			element.content = array[index+1].content;
		} else {
			element.content = array[0].content;
		}
		element.draw(ctx);
		element.tick();
	});
}

var Letter = Class.create({
	initialize: function(content, delta, x, y) {
		this.content = content
		this.delta = delta
		this.x = x;
		this.y = y;
		this.dead = false;
		this.color = "#00FF00";
	},
	draw: function(ctx) {
		ctx.fillStyle = this.color;
		ctx.font = 'Plain 12px Arial';
		ctx.fillText(this.content, this.x, this.y);
	},
	tick: function() {
		var d = Math.random();
		if (d > .8) {
			this.content = getRandomChar();
		} else if (d < .1) {
			this.content = ' ';
		}
	}
});