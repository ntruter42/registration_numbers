function RegistrationNumber() {
	let regNum = '';
	let regList = JSON.parse(localStorage.getItem('regList')) || {};

	function setReg(regNumValue) {
		regNum = regNumValue;
	}

	function getReg() {
		return regNum;
	}

	function isValidReg() {
		return /^C[AFGJKL](?! ?\d{7}) ?\d+(?:[ -]\d+)?$/.test(regNum);
	}

	function isValidCode() {
		return /C[AFGJKL]/.test(regNum.slice(0,2));
	}

	function addToRegList() {
		if (regList[regNum] === undefined) {
			regList[regNum] = regNum.slice(0, 2);
			localStorage.setItem('regList', JSON.stringify(regList));
			return true;
		}
		return false;
	}

	function removeFromRegList(regNumValue) {
		if (regList[regNumValue] !== undefined) {
			delete regList[regNumValue];
		}
	}

	function setRegList(regListValue) {
		regList = regListValue;
	}

	function getRegList() {
		return regList;
	}

	function clearRegList() {
		regList = {};
		localStorage.removeItem("regList");
	}

	// TODO: add exceptions within individual functions
	function addExceptionMessage() {
		if (regNum === '') {
			return { 'Enter a registration number': 'red' };
		} else if (!isValidReg()) {
			if (!isValidCode()) {
				return { 'Registration code is invalid': 'red' };
			} else {
				return { 'Registration number format is invalid': 'red' };
			}
		} else if (!addToRegList()) {
			return { 'Registration number already exists': 'orange' };
		} else {
			return { 'Registration number added succesfully': 'green' };
		}
	}

	function clearExceptionMessage() {
		if (regNumList !== {}) {
			return { 'Registration numbers NOT cleared': 'orange' };
		} else {
			return { 'Registration numbers cleared succesfully': 'green' };
		}
	}

	return {
		setReg,
		getReg,
		isValidReg,
		isValidCode,
		addToRegList,
		removeFromRegList,
		setRegList,
		getRegList,
		clearRegList,
		addExceptionMessage,
		clearExceptionMessage
	};
}