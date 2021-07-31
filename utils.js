require("colors")
var e = {};

e.print = (_pre, _post) => console.log(`${_pre} ${_post.yellow}`);

e.error = (_pre, _post) => console.log(`${_pre}: ${_post.red}`);

e.header = _s => {
	let totalWidth = 32;
	let fitLength = _s.length;
	if (_s.length % 2 != 0) {
		fitLength += 1;
		_s += " ";
	}
	let sideWidth = (totalWidth - fitLength) / 2;
	var middle = "";
	i = 0;
	while (i < fitLength) {
		middle += "─"
		i++;
	};
	let liner = "";
	let spacer = "";
	i = 0;
	while (i < sideWidth) {
		liner += "─";
		spacer += " ";
		i++;
	}
	var top = "┌" + liner + middle + liner + "┐";
	var bottom = "└" + liner + middle + liner + "┘";
	var center = "│" + spacer + _s + spacer + "│";
	console.log(top.yellow)
	console.log(center.yellow)
	console.log(bottom.yellow)
};

module.exports = e;