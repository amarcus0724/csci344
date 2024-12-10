
const changeBg = (sel, color) => {
    // your code here...
    
    document.querySelector(sel).style.backgroundColor = color;
};

const clearBgs = () => {

    const divs = document.querySelectorAll('.my-section');
    console.log(divs);

    for (const div of divs) {
        div.style.backgroundColor = 'transparent';
    }
    // document.querySelectorAll('my-selection').style.backgroundColor = 'transparent';
}
