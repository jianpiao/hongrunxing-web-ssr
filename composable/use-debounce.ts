export const debounce = (fn,delay = 500) => {
  let timer
  return function(){
    const args = arguments
    const context = this
    if(timer){
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
        timer = null
        fn.apply(context,args)
    }, delay);
  }
}

