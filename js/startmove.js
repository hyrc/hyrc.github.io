   function getStyle(obj,name)//取非行间样式
    {
        if(obj.currentStyle)//兼容IE
        {
            return obj.currentStyle[name];
        }
        else//兼容火狐等浏览器
        {
            return getComputedStyle(obj,false)[name];
        }
    }

    function startMove(obj,json,fn)
    {
        clearInterval(obj.timer);
        obj.timer=setInterval(function()
        {
           var bStop=true;//假设所有的值都已经到了


/*用for in 循环一下json,这里之所以没有用i而是用了attr是因为后面的代码用的
都是attr省的改的麻烦并不是这里只能用attr，用i是可以的，不过要改后面所有的
代码*/
            for(var attr in json)
            {

                var cur=0;
                if(attr=="opacity")
                {
                cur=Math.round(parseFloat(getStyle(obj,attr))*100);//有没有Math.round(四舍五入取整) 实际是不会影响页面的效果，因为计算机实际是不能存储小数的，它存的是一个近似值，可能小数点后面有无数个数字，所以最好是给所的值四舍五入取整
                }
                else
                {
                cur=parseInt(getStyle(obj,attr));
                }
            
                var speed=(json[attr]-cur)/4;
                speed=speed>0?Math.ceil(speed):Math.floor(speed);
                // if(cur==json[attr])
                // {
                // clearInterval(obj.timer);
                // if(fn)fn();
                // }
                // else
                // {
                    if(cur!=json[attr])//发现有一个值不等于目标点，那么上面的假设就是错的，就将bStop设为false
                        bStop=false;
                    if(attr=="opacity")
                {
                    obj.style.filter="alpha(opacity:'+(cur+speed)+')";
                    obj.style.opacity=(cur+speed)/100;
                }
                else
                {
                    obj.style[attr]=cur+speed+"px";
                }
                
                //}  
            }
            if(bStop)//如果所有的值都到了，就运行下面的代码。
            {
               clearInterval(obj.timer);
               if(fn)fn(); 
            }
        },30)
    }