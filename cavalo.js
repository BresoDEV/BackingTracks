var c = setInterval(() => {
    if (document.body) {
        clearInterval(c)


        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.left = '0';
        overlay.style.top = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'black';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.setAttribute('id', 'overlay')


        const centered = document.createElement('font');
        centered.style.color = 'black';
        centered.style.textShadow = '0 0 10px rgba(0, 255, 76, 0.535),0 0 20px rgba(0, 255, 76, 0.535),0 0 40px rgba(0, 255, 76, 0.535),0 0 80px rgba(0, 255, 76, 0.535)';
        centered.style.fontSize = '360px';
        centered.setAttribute('id', 'centered')
        centered.innerHTML = '&#127928;'
        centered.style.animation = 'rotate 5s linear infinite';
        centered.style.transformOrigin = 'center';

        overlay.appendChild(centered)
        document.body.appendChild(overlay)


        document.head.innerHTML += '<style>@keyframes rotate{from{transform: rotateY(0deg);}to{ transform: rotateY(360deg);}}</style>';

    }
}, 1);

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        fadeout('overlay')
    }, 2000);
})

function fadeout(id) {
    var e = document.getElementById(id)
    var o = 1;

    var timer = setInterval(() => {
        if (o <= 0.0) {
            clearInterval(timer); 
           
            centered.remove()
            overlay.remove()
        }
       else{
        e.style.opacity = o
        e.style.filter = 'alpha(opacity=' + o * 100 + ")"
        o -=  0.01
        
       }
       
    }, 1);
}
