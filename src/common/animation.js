import ScrollReveal from 'scrollreveal';
let store;

exports.showScrollAnimation = function(){
    store = window.g_app._store;
    const flag = store.getState().global.setting.animationSwitch;
    store.subscribe(handleChange);
    if(flag){
        ScrollReveal().reveal('.index-article', { scale: 0.1 ,interval: 50});
    }
}

function select(state) {
    return state.global.setting.animationSwitch;
}
  
let currentValue;
function handleChange() {
    let previousValue = currentValue;
    currentValue = select(store.getState());
    if (previousValue !== currentValue) {
        if(currentValue === false){
            ScrollReveal().clean('.index-article')
        }else{
            ScrollReveal().reveal('.index-article', { scale: 0.1 ,interval: 50});
        }
    }
}