function RegistrationNumber() {
	let regNum = '';
	let regList = JSON.parse(localStorage.getItem('regList')) || {};

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
		// TODO: fix regex to match:
		// CA 123456
		// CF 1
		// CK 0467 21
		// CL 4 2
		// CG 456 - 789
		// CJ 1 - 23
		// CA546
		// CJ99 - 0
		// CK8 0565
		return /^([C][A|F|G|J|K|L])( |)(\d{1,6}|\d{1,5}(-| )\d{1,5})$/.test(regNum);
	}

	function addToRegList() {
		if (regList[regNum] === undefined) {
			regList[regNum] = regNum.slice(0, 2);
		}
		localStorage.setItem('regList', JSON.stringify(regList));
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