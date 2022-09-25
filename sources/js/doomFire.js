(function () {

	var debug = !1;

	var WIDTH, HEIGHT;

	var timerUpdate = 50;

	var rows = 60, cols = 60;

	var canvas, ctx, tileSize, matrix;

	function getCanvas (selector) {
		let el = document.querySelector(selector);

		return [el, el.getContext('2d')];
	}

	function random (min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	function clearCanvas (backgroundColor = '#fff') {
		let coordinates = [0, 0, WIDTH, HEIGHT];

		ctx.clearRect(...coordinates);
		drawRect(...coordinates, backgroundColor);
	}

	function drawRect (x, y, w, h, color) {
		ctx.fillStyle = color;
		ctx.fillRect(x, y, w, h);
	}

	function draw () {
		clearCanvas('#000');

		matrix.forEach((row, y) => {
			row.forEach((item, x) => {
				let color = fireColorPallete[item];

				drawRect(x * tileSize, y * tileSize, tileSize, tileSize, color);
			});
		});
	}

	function update () {
		firePropagation();

		draw();
	}

	function setCells () {
		matrix = Array.from({ length: cols }, (a, y) => Array.from({ length: rows }, (b, x) => 0));
	}

	function createFire () {
		matrix[matrix.length - 1].fill(fireColorPallete.length - 1);
	}

	function firePropagation () {
		let i = 0;

		while (i++ < matrix.length - 2) {
			let row = matrix[i], nextRow = matrix[i + 1], newRow = [];

			for (let x = 0, len = row.length; x < len; x++) {
				let decay = random(0, 2);

				row[x] = nextRow[x] - decay < 0 ? 0 : nextRow[x] - decay;
			}
		}
	}

	document.addEventListener('DOMContentLoaded', function (e) {
		[canvas, ctx] = getCanvas('#canvasElement');

		[WIDTH, HEIGHT] = [canvas.width, canvas.height];

		tileSize = WIDTH / rows;

		setCells();

		createFire();

		setInterval(update, timerUpdate);
	}, false);
} ());