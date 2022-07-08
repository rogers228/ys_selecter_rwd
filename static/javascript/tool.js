class Tools{
    constructor() {
        this.set_global_func(); // global function
    }

    // global function
    set_global_func(){
        window.fmat = function(args){
            // lile python format function
            // args 
            // foo = fmat('The lazy {0} {1} over the {2}', bar3, bar2, bar1); 
            // console.log('foo:' + foo);
            let num = arguments.length; 
            let oStr = arguments[0];   
            for (let i = 1; i < num; i++) { 
                let pattern = "\\{" + (i-1) + "\\}"; 
                let re = new RegExp(pattern, "g"); 
                oStr = oStr.replace(re, arguments[i]); 
            } 
            return oStr;
        }
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
        this.mask = document.getElementById('comp_flymenu_mask');
    }

    toggle(){ //開關
        // let z_index = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--data-zindex_mobile_bottombar'));

        let f = this.flymenu;
        let m = this.mask;
        f.classList.remove( "menu_flyin", "menu_flyout"); //清除動畫
        if (f.style.visibility == "hidden" || f.style.visibility ==""){
            // open menu
            f.style.left = "0px";
            f.style.visibility = "visible";
            f.classList.add("menu_flyin"); //動畫 flyin
            m.style['display'] = 'block'; //遮罩


        }
        else{
            // close menu
            f.addEventListener("animationend", function(){
                if (f.classList.contains("menu_flyout")){
                    f.style.visibility = "hidden"; // 動畫完成後才隱藏
                    m.style['display'] = 'none'; //遮罩
                }
            });
            f.classList.add("menu_flyout"); //動畫 flyout
            
        }
    }
}

class MobileTouchFunc{  // window.mtf
    constructor(){
    }

    getAngle(angx, angy) { //獲得角度
        return Math.atan2(angy, angx) * 180 / Math.PI;
    }

    getDirection(startx, starty, endx, endy) {
        //根據起點終點返回方向 1向上滑動 2向下滑動 3向左滑動 4向右滑動 0點選事件
        let result = 0;
        let angx = endx - startx;
        let angy = endy - starty;
        //如果滑動距離太短
        if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
            return result;
        }

        let angle = mtf.getAngle(angx, angy);
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
}

class MobileTouchEvent{  // 手機滑動
    constructor(){
        this.addevent();
    }
    addevent(){
        window.mtf = new MobileTouchFunc();

        let flymenu = document.getElementById('comp_flymenu_mobile');
        //手指接觸螢幕

        // flymenu.addEventListener("passive", function(e){
        flymenu.addEventListener("touchstart", function(e){
        // document.addEventListener("touchstart", function(e){
            this.startx = e.touches[0].pageX;
            this.starty = e.touches[0].pageY;
        }, {passive: true});

        //手指離開螢幕
        flymenu.addEventListener("touchend", function(e) {
        // document.addEventListener("touchend", function(e) {
            // console.log(e);
            this.endx = e.changedTouches[0].pageX;
            this.endy = e.changedTouches[0].pageY;
            // console.log(startx, starty, endx, endy);
            // let direction = this.getDirection(startx, starty, endx, endy);
            let direction = mtf.getDirection(this.startx, this.starty, this.endx, this.endy);
            if (direction ==3){ //向左
                let flymenu = document.getElementById('comp_flymenu_mobile');
                if (flymenu.classList.contains("menu_flyin")){
                    fly.toggle(); //開關
                }
            }
        }, false);
    }
}

class FontendRouter{ // window.frr
    constructor(){
    }
    get_param_obj(){
        let obj = {};
        let urlString = window.location.href;
        if (urlString.indexOf('#') == -1){
            return
        }
        let paramString = urlString.split('#')[1];
        // console.log('paramString:', paramString);
        let params_arr = paramString.split('&');
        
        for (let i = 0; i < params_arr.length; i++) {
           let pair = params_arr[i].split('=');
           obj[pair[0]] = pair[1];
        }
        return obj;
    }

    router(){
        // z_index 由 sass 控制
        let z_index = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--data-zindex_layout1'));
        // console.log(z_index);

        //依照網址參數 將layout1排至最前方
        let params = frr.get_param_obj();  
        // console.log(params);
        // console.log('123');
        let walls = document.querySelectorAll('.layout1');
        walls.forEach((node)=>{
            let e = document.getElementById(node.id)
            // console.log(e);
            let router = e.getAttribute('data-router');
            // console.log(router);
            e.style['z-index'] = `${z_index}`;
            if (router == params['page']){
                // console.log('301');
                e.style['z-index'] = `${z_index + 2}`;
            }
        });
    }

    gotoHome(){
        console.log("123")
        window.location.href = '#page=home';
    }

    goto_page(mypage){
        window.location.href = '#page='+mypage;
    }
}

class FontendRouterEvent{ // 前端路由
    constructor(){
        this.addevent();
    }
    addevent(){
        window.frr = new FontendRouter();
        window.addEventListener('hashchange', frr.router);
        window.addEventListener("DOMContentLoaded", frr.router);
    }
}

class Connect{
    constructor(){
        this.xhr = new XMLHttpRequest();
        // this.gst = {
        //     'conn_state' : 0
        // };
        this.test_connect() //測試能否連線 endpoint
    }
    endpoint(){
        return 'aHR0cHM6Ly95c2hyLmFzdXNjb21tLmNvbTo4MjM5';
    }

    test_connect(){ //測試能否連線 endpoint
        // let tester = document.getElementById('comp_tester');

        let router = 'L2NoZWNrYXBp'
        let xhr = this.xhr;
        xhr.open('GET', atob(this.endpoint()+router), true);
        xhr.timeout = 3000; //毫秒
        xhr.send(null);

        xhr.onload = function(){
            if(xhr.status == 200){
                // this.gst('conn_state') = 1
                let json_data = JSON.parse(xhr.responseText);
                console.log(json_data)
            }
            else{
                console.log('error');
                frr.goto_page('noconnect'); //無法連線 先引導到 連接頁面
            }
        }

        xhr.ontimeout = function(){
            console.log('XMLHttpRequest is timeout!');
            frr.goto_page('noconnect'); //無法連線 先引導到 連接頁面
        }
    }

    open_connect(){ // 連接 endpoint
        let url = fmat('{0}/connect?url={1}',
            atob(this.endpoint()),
            window.location.origin+window.location.pathname);
        // console.log(url);
        window.location.href = url;
    }
    
}
