function test1(){
    console.log('test1');
}

function media_handle() {
    if (myMedia.matches) { // If media query matches
        console.log(12); // <= 750
        layout_mobile();
    } else {
        console.log(45); // > 750
        layout_browser();
    }
}

function layout_browser(){
    return;
}

function layout_mobile(){
    return;
}


var myMedia = window.matchMedia("(max-width: 750px)")
media_handle() // Call listener function at run time
myMedia.addListener(media_handle) // Attach listener function on state changes

function toggle_flymenu(){
    let fly = document.getElementById('comp_flymenu_mobile');
    fly.classList.remove( "menu_flyin", "menu_flyout"); //清除動畫

    if (fly.style.visibility == "hidden" || fly.style.visibility ==""){
        // open menu
        fly.style.left = "0px";
        fly.style.visibility = "visible";
        fly.classList.add("menu_flyin"); //動畫 flyin
    }
    else{
        // close menu
        fly.addEventListener("animationend", function(){
            if (fly.classList.contains("menu_flyout")){
                fly.style.visibility = "hidden"; // 動畫完成後才隱藏
            }
        });
        fly.classList.add("menu_flyout"); //動畫 flyout
    }
}