// global
;(function(){
    let g = window;

    // fucntion
        g.fmat = function(args){
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

    // class
    g.tls = new Tools();        // tool
    g.fly = new Flymenu();  //飛出菜單
    g.med = new MyMedia();  //媒體查詢

})();

// main
;(function(){
    console.log('test run')
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
                break;
            case 2://HEADERS_RECEIVED
                console.log('state: HEADERS_RECEIVED');
                break;
            case 3://LOADING
                console.log('state: LOADING');
                break;
            case 4://DONE
                console.log('state: DONE');
                break;
            }
        }
        
        xhr.open('get',myurl, true);
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
