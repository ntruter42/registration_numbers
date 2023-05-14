function RegistrationNumber() {
	let regNum = '';
	let regList = {};
	
	// Sample regList for testing
	// let regList = {
	// 	"CJ 21024": "CJ",
	// 	"CK 42 505": "CK",
	// 	"CA 543-012": "CA"
	// };

	function setReg(regNumValue) {
		regNum = regNumValue;
	}

	function getReg() {
		return regNum;
	}

	function isValidReg() {
		// TODO: create proper regex
		return /^[a-zA-Z]+((-| )[a-zA-Z]+)?$/.test(regNum);
	}

	function addToRegList() {
		if (regList[regNum] === undefined) {
			regList[regNum] = regNum.slice(0, 2);
		}
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