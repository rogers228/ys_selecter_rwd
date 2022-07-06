// function test1(){
//     console.log('test1');

//     let myurl = 'https://yshr.asuscomm.com:8239/';
//     console.log('myurl:'+myurl);

//     let xhr = new XMLHttpRequest();
//         xhr.open('get',myurl, true);
//         xhr.send(null);
//         xhr.onload = function(){
//             if(xhr.status == 200){
//                 // return JSON.parse(xhr.responseText);
//                 let json_data = JSON.parse(xhr.responseText);
//                 console.log(json_data)
//                 alert(json_data['message']);
//             }
//             else{
//                 console.log('error! myurl:'+ myurl);
//             }
//         }    
// }

// function media_handle() {
//     if (myMedia.matches) { // If media query matches
//         console.log(12); // <= 750
//         layout_mobile();
//     } else {
//         console.log(45); // > 750
//         layout_browser();
//     }
// }

// function layout_browser(){
//     return;
// }

// function layout_mobile(){
//     return;
// }


// var myMedia = window.matchMedia("(max-width: 750px)")
// media_handle() // Call listener function at run time
// myMedia.addListener(media_handle) // Attach listener function on state changes

// function toggle_flymenu(){
//     let fly = document.getElementById('comp_flymenu_mobile');
//     fly.classList.remove( "menu_flyin", "menu_flyout"); //清除動畫

//     if (fly.style.visibility == "hidden" || fly.style.visibility ==""){
//         // open menu
//         fly.style.left = "0px";
//         fly.style.visibility = "visible";
//         fly.classList.add("menu_flyin"); //動畫 flyin
//     }
//     else{
//         // close menu
//         fly.addEventListener("animationend", function(){
//             if (fly.classList.contains("menu_flyout")){
//                 fly.style.visibility = "hidden"; // 動畫完成後才隱藏
//             }
//         });
//         fly.classList.add("menu_flyout"); //動畫 flyout
//     }
// }