function GR () {

}
module.exports = GR;
GR.findItem = function findItem(list, key, value) {
  for(var i=0;i<list.length;i++) {
    if(list[i][key] == value) {
      return list[i];
    }
  }
  return undefined;
}
