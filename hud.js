function updateHUD(position) {
    const coords = document.getElementById("coords");
    coords.textContent = `X: ${position.x.toFixed(1)} | Z: ${position.z.toFixed(1)}`;
}
