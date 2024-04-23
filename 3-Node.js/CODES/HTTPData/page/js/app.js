const tds = [...document.querySelectorAll('td')];

document.onclick = function (event) {
    if (tds.includes(event.target)) {
        event.target.style.backgroundColor = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
    }
}