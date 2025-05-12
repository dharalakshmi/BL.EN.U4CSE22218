function updateWindow(win, nums, max) {
  if (!Array.isArray(nums)) return;

  nums.forEach(n => {
    if (!win.includes(n)) {
      if (win.length >= max) win.shift();
      win.push(n);
    }
  });
}

module.exports = { updateWindow };
