function test1(){
    console.log('test1');
}

function media_handle() {
    if (myMedia.matches) { // If media query matches
        console.log(12); // <= 700
        layout_mobile();
    } else {
        console.log(45); // > 700
        layout_browser();
    }
}

function layout_browser(){
//     comp_userbar_browser
//     let e = document.getElementById("comp_userbar_browser");
//     console.log(window.screen.width);
//     console.log(e.offsetWidth);
//     console.log(`${window.screen.width - 2*e.offsetWidth}px`);
//     let s = e.style;
//     // s['left'] = "620px"
//     s['left'] = `${window.screen.width - 2*e.offsetWidth}px`;
//     // window.screen.width;
}

function layout_mobile(){
    return;
}


var myMedia = window.matchMedia("(max-width: 750px)")
media_handle() // Call listener function at run time
myMedia.addListener(media_handle) // Attach listener function on state changes