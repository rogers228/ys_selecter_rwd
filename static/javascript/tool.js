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

class MyMediaFunc{
    constructor() {
    }
    media_rule(){
        return `(max-width: ${getComputedStyle(document.documentElement)
                            .getPropertyValue('--data-mobile_width')})`
    }
}

class MyMediaEvent{
    constructor(){
        this.addevent();
    }
    addevent() {
        window.mmf = new MyMediaFunc();

        //reload event ?????????
        if (window.matchMedia(mmf.media_rule()).matches) {
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

    toggle(){ //??????
        // let z_index = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--data-zindex_mobile_bottombar'));

        let f = this.flymenu;
        let m = this.mask;
        f.classList.remove( "menu_flyin", "menu_flyout"); //????????????
        if (f.style.visibility == "hidden" || f.style.visibility ==""){
            // open menu
            f.style.left = "0px";
            f.style.visibility = "visible";
            f.classList.add("menu_flyin"); //?????? flyin
            m.style['display'] = 'block'; //??????
            m.style['animation-name'] = 'maskin'; //??????maskin

        }
        else{
            // close menu
            f.addEventListener("animationend", function(){
                if (f.classList.contains("menu_flyout")){
                    f.style['visibility'] = "hidden"; // ????????????????????????
                }
            });

            m.addEventListener("animationend", function(){
                m.style['display'] = 'none'; // ????????????????????????
            });

            f.classList.add("menu_flyout"); //?????? flyout
            m.style['animation-name'] = 'maskout'; //??????maskout
            
        }
    }
}

class MobileTouchFunc{  // window.mtf
    constructor(){
    }

    getAngle(angx, angy) { //????????????
        return Math.atan2(angy, angx) * 180 / Math.PI;
    }

    getDirection(startx, starty, endx, endy) {
        //?????????????????????????????? 1???????????? 2???????????? 3???????????? 4???????????? 0????????????
        let result = 0;
        let angx = endx - startx;
        let angy = endy - starty;
        //????????????????????????
        if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
            return result;
        }

        let angle = mtf.getAngle(angx, angy);
        if (angle >= -135 && angle <= -45) {
            result = 1; //??????
        } else if (angle > 45 && angle < 135) {
            result = 2; //??????
        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
            result = 3; //??????
        } else if (angle >= -45 && angle <= 45) {
            result = 4; //??????
        }
        return result;
    }
}

class MobileTouchEvent{  // ????????????
    constructor(){
        this.addevent();
    }
    addevent(){
        window.mtf = new MobileTouchFunc();

        let flymenu = document.getElementById('comp_flymenu_mobile');
        //??????????????????

        // flymenu.addEventListener("passive", function(e){
        flymenu.addEventListener("touchstart", function(e){
        // document.addEventListener("touchstart", function(e){
            this.startx = e.touches[0].pageX;
            this.starty = e.touches[0].pageY;
        }, {passive: true});

        //??????????????????
        flymenu.addEventListener("touchend", function(e) {
        // document.addEventListener("touchend", function(e) {
            // console.log(e);
            this.endx = e.changedTouches[0].pageX;
            this.endy = e.changedTouches[0].pageY;
            // console.log(startx, starty, endx, endy);
            // let direction = this.getDirection(startx, starty, endx, endy);
            let direction = mtf.getDirection(this.startx, this.starty, this.endx, this.endy);
            if (direction ==3){ //??????
                let flymenu = document.getElementById('comp_flymenu_mobile');
                if (flymenu.classList.contains("menu_flyin")){
                    fly.toggle(); //??????
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
        // z_index ??? sass ??????
        let z_index = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--data-zindex_layout1'));
        // console.log(z_index);

        //?????????????????? ???layout1???????????????
        let params = frr.get_param_obj();  
        // console.log(params);

        //page
        let walls = document.querySelectorAll('.layout1');
        walls.forEach((node)=>{
            let e = document.getElementById(node.id)
            let router = e.getAttribute('data-router');
            // console.log(router);
            e.style['z-index'] = `${z_index}`;
            if (router == params['page']){
                // console.log('301');
                e.style['z-index'] = `${z_index + 2}`;
            }
        });

        //stage
        let stages = document.querySelectorAll('.layout4');
        // console.log(stages);
        stages.forEach((node)=>{
            let e = document.getElementById(node.id)
            let router = e.getAttribute('data-router');
            e.style['z-index'] = 320;
            if (router == params['stage']){
                // console.log('322');
                e.style['z-index'] = 322;
            }
        });
    }

    goto_page(mypage){
        window.location.href = '#page='+mypage;
    }

    goto_model(mystage){
        window.location.href = '#page=model&stage='+mystage;
    }
}

class FontendRouterEvent{ // ????????????
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
        this.test_connect() //?????????????????? endpoint
    }
    endpoint(){
        return 'aHR0cHM6Ly95c2hyLmFzdXNjb21tLmNvbTo4MjM5';
    }

    test_connect(){ //?????????????????? endpoint
        // let tester = document.getElementById('comp_tester');

        let router = 'L2NoZWNrYXBp'
        let xhr = this.xhr;
        xhr.open('GET', atob(this.endpoint()+router), true);
        xhr.setRequestHeader('x-sid', 'test')
        xhr.timeout = 3000; //??????
        xhr.send(null);

        xhr.onload = function(){
            if(xhr.status == 200){
                // this.gst('conn_state') = 1
                let json_data = JSON.parse(xhr.responseText);
                console.log(json_data)
            }
            else{
                console.log('error');
                frr.goto_page('noconnect'); //???????????? ???????????? ????????????
            }
        }

        xhr.ontimeout = function(){
            console.log('XMLHttpRequest is timeout!');
            frr.goto_page('noconnect'); //???????????? ???????????? ????????????
        }
    }

    open_connect(){ // ?????? endpoint
        let url = fmat('{0}/connect?url={1}',
            atob(this.endpoint()),
            window.location.origin+window.location.pathname);
        console.log(url);
        window.location.href = url;
    }


    
}

class TestApi{
    constructor(){

    }
    endpoint(){
        // return 'aHR0cHM6Ly95c2hyLmFzdXNjb21tLmNvbTo4MjM5';
        return 'https://yshr.asuscomm.com:8239';
    }

    show_cookie(){
        console.log(document.cookie);
    }
    test_mynameis(){
        let myurl = this.endpoint()+'/mynameis?name=allen'
        console.log(myurl);

        let xhr = new XMLHttpRequest();
        xhr.open('POST', myurl, true);
        // xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost');
        // xhr.withCredentials = true;
        xhr.timeout = 3000; //??????
        xhr.send(null);

        xhr.onload = function(){
            if(xhr.status == 200){
                // this.gst('conn_state') = 1
                let json_data = JSON.parse(xhr.responseText);
                console.log(json_data)
            }
            else{
                console.log('api error');
            }
        }

        xhr.ontimeout = function(){
            console.log('XMLHttpRequest is timeout!');
        }
    }

    test_whoami(){
        let myurl = this.endpoint()+'/whoami'
        console.log(myurl);

        let xhr = new XMLHttpRequest();
        xhr.open('GET', myurl, true);
        // xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost');
        // xhr.withCredentials = true;
        xhr.timeout = 3000; //??????
        xhr.send(null);

        xhr.onload = function(){
            if(xhr.status == 200){
                // this.gst('conn_state') = 1
                let json_data = JSON.parse(xhr.responseText);
                console.log(json_data)
            }
            else{
                console.log('api error');
            }
        }

        xhr.ontimeout = function(){
            console.log('XMLHttpRequest is timeout!');
        }
    }
    test_set(){
        let myurl = this.endpoint()+'/set'
        console.log(myurl);

        let xhr = new XMLHttpRequest();
        xhr.open('GET', myurl, true);
        xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost');
        xhr.withCredentials = true;
        xhr.timeout = 3000; //??????
        xhr.send(null);

        xhr.onload = function(){
            if(xhr.status == 200){
                // this.gst('conn_state') = 1
                let json_data = JSON.parse(xhr.responseText);
                console.log(json_data)
            }
            else{
                console.log('api error');
            }
        }

        xhr.ontimeout = function(){
            console.log('XMLHttpRequest is timeout!');
        }
    }
    test_read(){
        let myurl = this.endpoint()+'/read'
        console.log(myurl);

        let xhr = new XMLHttpRequest();
        xhr.open('GET', myurl, true);
        xhr.timeout = 3000; //??????
        xhr.send(null);

        xhr.onload = function(){
            if(xhr.status == 200){
                // this.gst('conn_state') = 1
                let json_data = JSON.parse(xhr.responseText);
                console.log(json_data)
            }
            else{
                console.log('api error');
            }
        }

        xhr.ontimeout = function(){
            console.log('XMLHttpRequest is timeout!');
        }
    }    
}