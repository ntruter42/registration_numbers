// INPUT ELEMENTS
const input = document.querySelector('#reg-input');
const button = document.querySelector('#reg-button');
const clear = document.querySelector('#reg-clear');
const select = document.querySelector('#reg-filter');
let option = select.options[select.selectedIndex];

// OUTPUT ELEMENTS
const regNumList = document.querySelector('#reg-num-container');

// INITIALISATION
const reg = RegistrationNumber();
showRegPlates(option.value);

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
	if (input.value) {
		reg.setReg(input.value.toUpperCase());
		if (reg.isValidReg()) {
			if (reg.addToRegList()) {
				showRegPlates(option.value);
			} else {
				alert("Registration number was already added");
			}
		} else {
			alert("Registration number is invalid");
		}
	} else {
		alert("Enter a registration number");
	}
}

function showRegPlates(filter) {
	clearRegPlates();
	let count = 0;

	for (const regNum of Object.keys(reg.getRegList())) {
		if (regNum.startsWith(filter) || filter === "") {
			addRegPlate(regNum);
			count++;
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