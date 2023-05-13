function RegistrationNumber() {
	let regNum = '';
	let registrationNumbers = {};

	
	function setReg(regNumInput) {
		regNum = regNumInput;
	}

	function getReg() {
		return regNum;
	}

	function isValidReg() {
		// TODO: create proper regex
		return /^[a-zA-Z]+((-| )[a-zA-Z]+)?$/.test(regNum);
	}

	function addToRegList() {
		if (registrationNumbers[regNum] === undefined) {
			registrationNumbers[regNum] = 1;
		}
	}

	function setRegList(regListInput) {
		registrationNumbers = regListInput;
	}

	function getRegList() {
		return registrationNumbers;
	}

	return {
		setReg,
		getReg,
		isValidReg,
		addToRegList,
		setRegList,
		getRegList
	};
}