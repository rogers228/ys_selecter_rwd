;(function(){ // main
    let g = window;
    g.addEventListener("DOMContentLoaded", after_load_handler);

    // g.fmat = function(args){
    //     // lile python format function
    //     // args 
    //     // foo = fmat('The lazy {0} {1} over the {2}', bar3, bar2, bar1); 
    //     // console.log('foo:' + foo);
    //     let num = arguments.length; 
    //     let oStr = arguments[0];   
    //     for (let i = 1; i < num; i++) { 
    //         let pattern = "\\{" + (i-1) + "\\}"; 
    //         let re = new RegExp(pattern, "g"); 
    //         oStr = oStr.replace(re, arguments[i]); 
    //     } 
    //     return oStr;
    // }

    function after_load_handler(){
        g.tls = new Tools();        // tool
        g.rtr = new FontendRouterEvent(); //前端路由
        g.cnn = new Connect();
        g.fly = new Flymenu();  //飛出菜單
        g.med = new MyMedia();  //媒體查詢
        g.mth = new MobileTouchEvent(); //手機滑動監控
    }

})();

function test3(){
    let myurl = 'https://yshr.asuscomm.com:8239/';
    let tester = document.getElementById('comp_tester');
    // console.log('myurl:'+myurl);

    let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            switch(xhr.readyState){
            case 1://OPENED
                console.log('state: OPENED');
                tester.innerHTML = 'state: OPENED';
                break;
            case 2://HEADERS_RECEIVED
                console.log('state: HEADERS_RECEIVED');
                tester.innerHTML = 'state: HEADERS_RECEIVED';
                break;
            case 3://LOADING
                console.log('state: LOADING');
                tester.innerHTML = 'state: LOADING';
                break;
            case 4://DONE
                console.log('state: DONE');
                tester.innerHTML = 'state: DONE';
                break;
            }
        }

        xhr.open(method='get', url=myurl, async=true);
        xhr.timeout = 5000; //毫秒
        xhr.send(null);
        xhr.onload = function(){
            tester.innerHTML = 'xhr.onload';
            if(xhr.status == 200){
                tester.innerHTML = '200';
                // return JSON.parse(xhr.responseText);
                let json_data = JSON.parse(xhr.responseText);
                console.log(json_data)
                // alert(json_data['message']);
                tester.innerHTML = json_data['message'];
            }
            else{
                console.log('error! myurl:'+ myurl);
            }
        }


    xhr.ontimeout = function(){
        console.log('XMLHttpRequest is timeout!');
        tester.innerHTML = json_data['message'];
    }

    tester.innerHTML = 'ok';
}

function test4(){
    let tester = document.getElementById('comp_tester');
    let xhr = new XMLHttpRequest();
    console.log(xhr)
    xhr.open(method='get', url='https://yshr.asuscomm.com:8239/', async=true);

    xhr.onreadystatechange = function(){
        if (xhr.readyState == 1){
            return}
        if (xhr.readyState == 4){
            if (xhr.status < 400) {
                // do your stuff here
                let json_data = JSON.parse(xhr.responseText);
                console.log(json_data)
                tester.innerHTML = json_data['message'];
            }
            else if (error != null){
                tester.innerHTML = 'error! myurl:'+ myurl;
            }
        }
    }
    xhr.send();
    tester.innerHTML = 'ok';
}

function addItem(str) {
    var request = new XMLHttpRequest();
    request.open('GET', "checkinout-actions/add-more-items-code.php?q="+str);

    request.onreadystatechange = function () {
        if (request.readyState == 1) { return }
        else if (request.readyState == 4) {
            if (request.status < 400) {
                // do your stuff here
                document.getElementById("txtHint").innerHTML=request.responseText;
            }
            else if (error != null)
                error(request);
        }
    };
    request.send();
}