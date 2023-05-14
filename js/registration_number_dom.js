// INPUT ELEMENTS
const input = document.querySelector('#reg-input');
const button = document.querySelector('#reg-button');
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
		reg.setReg(input.value);
		if (reg.isValidReg()) {
			reg.addToRegList();
			showRegPlates(option.value);
		} else {
			alert("Registration number is invalid");
		}
	} else {
		alert("Enter a registration number");
	}
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