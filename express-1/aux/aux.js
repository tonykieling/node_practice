function searchItem(listArray, id) {
  // console.log('id: ', id, 'list: ', listArray);
  const result = listArray.findIndex(item => parseInt(item.id) === parseInt(id));

  if (result > -1) return result;
  
  return false;
}

module.exports.searchItem = searchItem;