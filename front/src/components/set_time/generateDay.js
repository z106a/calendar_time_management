export default (function renderAll() {
  var list = [];
  for (let i = 10; i < 20; i++) {
    list.push({ time: `${i}:00 - ${i + 1}:00` });
  }
  return list;
})();