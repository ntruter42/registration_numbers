// INPUT ELEMENTS
const input = document.querySelector('#reg-input');
const button = document.querySelector('#reg-button');

// OUTPUT ELEMENTS
const regNumList = document.querySelector('#reg-num-container');

function addRegNumPlate(regNumInput) {
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

button.addEventListener('click', function () {
	if (input.value) {
		addRegNumPlate(input.value);
	}
});