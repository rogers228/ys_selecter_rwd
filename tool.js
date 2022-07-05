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