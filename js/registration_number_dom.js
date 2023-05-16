// INPUT ELEMENTS
const input = document.querySelector('#reg-input');
const button = document.querySelector('#reg-button');
const clear = document.querySelector('#reg-clear');
const select = document.querySelector('#reg-filter');
let option = select.options[select.selectedIndex];

// OUTPUT ELEMENTS
const regNumList = document.querySelector('#reg-num-container');
const messageBox = document.querySelector('#message-container');
const messageText = document.querySelector('#reg-message');

// FUNTIONALITY
let messageTimeout = 0;

// INITIALISATION
const reg = RegistrationNumber();
showRegPlates(option.value);

function displayMessage(msgObj) {
	clearTimeout(messageTimeout);

	for (const message in msgObj) {
		const color = msgObj[message];

		messageBox.classList.remove('hidden', 'red', 'orange', 'green');
		regNumList.classList.add('display-height-offset');

		messageText.innerHTML = message;

		switch (color) {
			case 'red':
				messageBox.classList.add('red');
				break;
			case 'orange':
				messageBox.classList.add('orange');
				break;
			case 'green':
				messageBox.classList.add('green');
				break;
			default:
				break;
		}

		let duration = message.length * 100;

		if (message === 'Registration code is invalid') {
			messageTimeout = setTimeout(function () {
				messageText.innerHTML = 'Valid registration codes: ';
				messageText.innerHTML += '<b>CA</b>, <b>CF</b>, <b>CG</b>, <b>CJ</b>, <b>CK</b>, <b>CL</b>';

				messageBox.classList.remove('red', 'orange', 'green');
				messageBox.classList.add('transparent');
			}, duration);
		}

		else if (message === 'Registration number is invalid') {
			messageTimeout = setTimeout(function () {
				messageText.innerHTML = 'Valid format examples: ';
				messageText.innerHTML += '<b>CA123456</b>, <b>CF 456 789</b>, <b>CG 789-012</b>, <b>CJ 345</b>';

				messageBox.classList.remove('red', 'orange', 'green');
				messageBox.classList.add('transparent');
			}, duration);
		}

		else {
			messageTimeout = setTimeout(function () {
				messageBox.classList.add('hidden');
				regNumList.classList.remove('display-height-offset');
			}, duration);
		}
	}
}

function addRegPlate(regNumInput) {
	if (regNumInput) {

		const regNumItem = document.createElement('li');
		if (regNumItem) {

			const regNumPlate = document.createElement('div');
			if (regNumPlate) {
				regNumPlate.classList.add('plate');

				const regNum = document.createElement('span');
				if (regNum) {
					regNum.classList.add('reg-num');
					regNum.innerHTML = regNumInput.toUpperCase();

					regNumPlate.appendChild(regNum);
					regNumItem.appendChild(regNumPlate);
					regNumList.appendChild(regNumItem);
				}
			}
		}
	}
}

function addValidRegPlate() {
	reg.setReg(input.value.toUpperCase());
	displayMessage(reg.addExceptionMessage());
	input.value = "";

	showRegPlates(option.value);
}

function showRegPlates(filter) {
	clearRegPlates();

	for (const regNum of Object.keys(reg.getRegList())) {
		if (regNum.startsWith(filter) || filter === "") {
			addRegPlate(regNum);
		}
	}
}

function clearRegPlates() {
	const regPlates = document.querySelectorAll('li');

	regPlates.forEach(plate => {
		// TODO: remove only elements from filter location
		plate.remove();
	});
}

button.addEventListener('click', addValidRegPlate);

select.addEventListener('change', function () {
	option = select.options[select.selectedIndex];
	showRegPlates(option.value);
});

clear.addEventListener('click', function () {
	if (confirm("Are you sure you want to clear all registration numbers?") === true) {
		reg.clearRegList();
		clearRegPlates();
	}
	displayMessage(reg.clearExceptionMessage());
});

// TODO: snap registration display window
// function resize() {
// 	console.log(regNumList.clientWidth);

// 	if (regNumList.clientWidth < (330 + 660) / 2) {
// 		regNumList.style.width = '330px';
// 	} else if (regNumList.clientWidth < (660 + 990) / 2) {
// 		regNumList.style.width = '660px';
// 	} else {
// 		regNumList.style.width = '990px';
// 	}
// }
// window.addEventListener('resize', resize);