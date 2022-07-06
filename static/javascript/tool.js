class Tools{
    constructor() {
    }
    // -----cookie tool function-----
    cookie_set(key, myvalue){
        document.cookie = `${key}=${myvalue}`;
    }



    cookie_get(name) {
        const myvalue = `; ${document.cookie}`;
        const parts = myvalue.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    cookies_clear() {
        let arr_cookies = document.cookie.split(";");
        for (let i = 0; i < arr_cookies.length; i++) {
            let mycookie = arr_cookies[i];
            let eqPos = mycookie.indexOf("=");
            let name = eqPos > -1 ? mycookie.substr(0, eqPos) : mycookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }

    cookies_delete(name) {
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    };

    // -----Element tool function-----
    isExistsByID(myid){
        let element =  document.getElementById(myid);
        if (typeof(element) !== 'undefined' && element!== null){
            return (typeof(element) != 'undefined' && element != null);
        }
    }
    isExistsByID2(myid){
        let myEle = document.getElementById(myid);
        if(myEle){
            return true;
        }
        else{
            return false;
        }
    }

    isChildInParent(parentid, childid) {
        let parent =  document.getElementById(parentid);
        let child =   document.getElementById(childid);
        return (parent.contains(child));
    }
}

class MyMedia{
    constructor() {
        //"(max-width: 750px)"
        this.mda = `(max-width: ${getComputedStyle(document.documentElement)
                            .getPropertyValue('--data-mobile_width')})`
        this.media_handle(); // Call listener function at run time
    }

    media_handle() {
        if (window.matchMedia(this.mda).matches) { // If media query matches
            console.log('mobile');
        } else {
            console.log('browser');
        }
    }

}

class Flymenu{
    constructor() {
        this.flymenu = document.getElementById('comp_flymenu_mobile');
    }

    toggle(){ //開關
        let f = this.flymenu;
        f.classList.remove( "menu_flyin", "menu_flyout"); //清除動畫
        if (f.style.visibility == "hidden" || f.style.visibility ==""){
            // open menu
            f.style.left = "0px";
            f.style.visibility = "visible";
            f.classList.add("menu_flyin"); //動畫 flyin
        }
        else{
            // close menu
            f.addEventListener("animationend", function(){
                if (f.classList.contains("menu_flyout")){
                    f.style.visibility = "hidden"; // 動畫完成後才隱藏
                }
            });
            f.classList.add("menu_flyout"); //動畫 flyout
        }
    }
}

function Mobile_touch(){  //Class
    let startx = 0;
    let starty = 0;
    let endx = 0;
    let endy = 0;

    function getAngle(angx, angy) { //獲得角度
        return Math.atan2(angy, angx) * 180 / Math.PI;
    }

    function getDirection(startx, starty, endx, endy) {
        //根據起點終點返回方向 1向上滑動 2向下滑動 3向左滑動 4向右滑動 0點選事件
        let result = 0;
        let angx = endx - startx;
        let angy = endy - starty;
        //如果滑動距離太短
        if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
            return result;
        }

        let angle = getAngle(angx, angy);
        if (angle >= -135 && angle <= -45) {
            result = 1; //向上
        } else if (angle > 45 && angle < 135) {
            result = 2; //向下
        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
            result = 3; //向左
        } else if (angle >= -45 && angle <= 45) {
            result = 4; //向右
        }
        return result;
    }

    ;(function addevent(){

        let flymenu = document.getElementById('comp_flymenu_mobile');
        //手指接觸螢幕
        // flymenu.addEventListener("touchstart", function(e){
        document.addEventListener("touchstart", function(e){
            startx = e.touches[0].pageX;
            starty = e.touches[0].pageY;
        }, false);

        //手指離開螢幕
        // flymenu.addEventListener("touchend", function(e) {
        document.addEventListener("touchend", function(e) {
            endx = e.changedTouches[0].pageX;
            endy = e.changedTouches[0].pageY;
            // console.log(startx, starty, endx, endy);
            let direction = getDirection(startx, starty, endx, endy);
            if (direction ==3){ //向左
                let flymenu = document.getElementById('comp_flymenu_mobile');
                if (flymenu.classList.contains("menu_flyin")){
                    fly.toggle(); //開關
                }
            }
        }, false);

    })();
}