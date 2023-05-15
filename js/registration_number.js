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

	return {
		setReg,
		getReg,
		isValidReg,
		addToRegList,
		removeFromRegList,
		setRegList,
		getRegList,
		clearRegList
	};
}