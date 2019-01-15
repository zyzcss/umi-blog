exports.getUrlString = function (name) {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    const r = window.location.href.substr(window.location.href.indexOf('?') + 1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};
exports.getDateString = function (date) {
    if(date){
        const _date = new Date(date)     
        return _date.getFullYear() + '-' + fullStr(_date.getMonth() + 1) + '-' + fullStr(_date.getDate()) + ' ' + fullStr(_date.getHours()) + ':' + fullStr(_date.getMinutes()) + ':' + fullStr(_date.getSeconds())
    }
    return '未知时间'
};
function fullStr(num){
    if(num < 10){
        return '0' + num
    }
    return num;
}
let animate = null;
exports.scollToTop = function(target){
    let _top = document.documentElement.scrollTop || document.body.scrollTop;
    let top = target ? getElementTop(target) : 0;
    let step = 1;
    let scrllAnimate= function(){
        console.log(top,_top);
        if(top > _top){
            _top += step;
            if(top <= _top && animate){
                window.scrollTo(0,top);
                window.cancelAnimationFrame(animate);
                animate = null;
            }else{
                window.scrollTo(0,_top);
                animate = requestAnimationFrame(scrllAnimate);
            }
        }else{
            _top -= step;
            if(top >= _top && animate){
                window.scrollTo(0,top);
                window.cancelAnimationFrame(animate);
                animate = null;
            }else{
                window.scrollTo(0,_top);
                animate = requestAnimationFrame(scrllAnimate);
            }
        }
        step += 1;
    }
    animate = requestAnimationFrame(scrllAnimate);
}
function getElementTop(elem){
    let elemTop=elem.offsetTop;//获得elem元素距相对定位的父元素的top
    elem=elem.offsetParent;//将elem换成起相对定位的父元素
    while(elem!=null){//只要还有相对定位的父元素 
        elemTop+=elem.offsetTop;
        elem=elem.offsetParent;
    }
    console.log('元素高度',elemTop);
    
    return elemTop;
}

exports.isPc = function () {
    const sUserAgent = navigator.userAgent.toLowerCase();
    const bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    const bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    const bIsMidp = sUserAgent.match(/midp/i) == "midp";
    const bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    const bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    const bIsAndroid = sUserAgent.match(/android/i) == "android";
    const bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    const bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        return false;
    } else {
        return true;
    }
}

exports.deepArrayFind = function(array, ifNameDeep, checkFn){
    const result = deepArray(array, ifNameDeep, checkFn);
    return result;
}

function deepArray(array, ifNameDeep, checkFn){
    for (const obj of array) {
        if(checkFn(obj)){
            return obj;
        }
        if(obj[ifNameDeep]){
            const result = deepArray(obj[ifNameDeep], ifNameDeep, checkFn);
            if(result){
                return result;
            }
        }
    }
    return false
}

exports.getLimit = function(){
    return 5;
}

exports.getUrlExceptMessage = function(){
    let url = window.location.href,
        index1 = url.indexOf('#'),
        index2 = url.lastIndexOf('#');
    let result = '';
    if(index1 != index2){
        result = url.slice(index1 - 1, index2)
    }else{
        result = url.slice(index1 - 1)
    }
    return result;
}