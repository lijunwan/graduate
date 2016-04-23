var GR = {
	getKeyValueList: function getKeyValueList (list, key) {
		const result = [];
		list.map(function(item){
			result.push(item[key]);
		});
		return result;
	
	},
	findItem: function findItem(list, key, value) {
		for(var i=0;i<list.length;i++) {
			if(list[i][key] == value) {
			  return list[i];
			}
		}
  		return undefined;
	}
}
module.exports = GR; 