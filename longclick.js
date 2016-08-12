//调用方式 两个形参分别传人两个callback
// $('a').longclick(function(){ alert(1)},function(){ });


;(function($,win){
    $.fn.longclick = function(loneClick,oneClick){
        var preventCode = [13, 32, 37, 38, 39, 40]; // 要只执行一次事件的按键的键值，此处屏蔽的按键依次是：enter、空格、左、上、右、下
        var isRunning   = [];  
        var time ;
        $(this).keydown(function(event){ //click方法小插件，两个形参分别传人两个callback
                event = event || window.event;
                var keycode = event.which || event.keyCode;
                if(preventCode.in_array(keycode)>=0){
                    if(typeof isRunning[keycode] == "undefined" || isRunning[keycode]==false){
                        isRunning[keycode] = true;
                        // 只执行一次的事件
                        time = Date.now();
                    }
                }else{
                    // 连续执行的事件
                    
                }
            }).keyup(
             function(event){
                event = event || window.event;
                var keycode = event.which || event.keyCode;
                if(preventCode.in_array(keycode)>=0){
                    isRunning[keycode] = false;
                    this.timeup=Date.now();
                    (this.timeup-500)>=time?loneClick(): oneClick();
                };
                
            });
                              
            // 检测数组中是否有某值
            Array.prototype.in_array = function(c){
                for(i=0;i<this.length && this[i]!=c;i++);
                return (i==this.length) ? -1 : i;
            };

    };
})(jQuery,window);