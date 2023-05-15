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

function displayMessage(message, color) {
	clearTimeout(messageTimeout);
	messageBox.classList.remove('hidden', 'red', 'orange', 'green');

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
	messageBox.classList.add('scale-forward');

	let duration = message.length * 100 - (Math.floor(message.length / 10) * 100);
	messageTimeout = setTimeout(function () {
		messageBox.classList.add('hidden');
	}, duration);
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

	if (input.value === '') {
		displayMessage('Enter a registration number', 'red');
	} else if (!reg.isValidReg()) {
		displayMessage('Registration number is invalid', 'red');
	} else if (!reg.addToRegList()) {
		displayMessage('Registration number already exists', 'red');
	} else {
		displayMessage('Registration number added succesfully', 'green');
	}
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
	reg.clearRegList();
	clearRegPlates();
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