function  game(){
    this.clientw=document.documentElement.clientWidth;
    this.clienth=document.documentElement.clientHeight;
    this.letterArr=["A","B","C","D","E","F","G","H","I","G","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    this.letterLen=5;
    this.speed=5;
    this.spans=[];
    this.currArr=[];
    this.currPosarr=[];
    this.die=10;
    this.score=0;
    this.currScore=0;
    this.num=10;
    this.scoreEle=document.getElementsByClassName("score")[0].getElementsByTagName("span")[1];
    this.dieEle=document.getElementsByClassName("die")[0].getElementsByTagName("span")[1];
    this.aa=1;
    this.flag=1;
    this.kaiguan=false;

}

game.prototype={
    play:function(){
        //将字母显示到body里面
        this.getLetter(this.letterLen);
        //字母运动
        this.move();
        this.key();
    },
    key:function (){
        var that=this;

        document.onkeydown=function(e){
            if(that.kaiguan){
                return;
            }
                var ev=e||window.event;
                var code=String.fromCharCode(ev.keyCode);
                var num=document.getElementsByClassName("num")[0];
                for(var i=0;i<that.spans.length;i++){
                    if(that.spans[i].getAttribute("value")==code){
                        document.body.removeChild(that.spans[i]);
                        that.spans.splice(i, 1);
                        that.currArr.splice(i,1);
                        that.currPosarr.splice(i,1);
                        that.getLetter(1);
                        that.score++;
                        that.currScore++;
                        that.scoreEle.innerHTML = that.score;
                        if (that.currScore % that.num == 0) {
                            clearInterval(that.t);
                            that.aa++;
                            that.kaiguan=true;
                            var win=document.createElement("div");
                            var next=document.createElement("div");
                            var exit=document.createElement("div");
                            win.setAttribute("class","win");
                            exit.setAttribute("class","exit");
                            next.setAttribute("class","next");
                            document.body.appendChild(win);
                            document.body.appendChild(next);
                            document.body.appendChild(exit);
                            next.onclick=function(){
                                that.next();
                                num.innerHTML++;
                                that.kaiguan=false;
                                document.body.removeChild(win);
                                document.body.removeChild(next);
                                document.body.removeChild(exit);
                            }
                            exit.onclick=function(){
                                window.close();
                            }
                        }
                        break;
                    }

                }
        }

    },
    move:function(){
        var that=this;
        var stop=document.getElementsByClassName("stop")[0];
        stop.onclick= function () {
            if(that.flag){
                clearInterval(that.t);
                stop.style.background="url(img/continue.png)";
                that.flag=0;
            }else{
                that.t=setInterval(down,60);
                stop.style.background="url(img/stop.png)";
                that.flag=1;
            }

        }
        var down= function(){
            for(var i=0;i<that.spans.length;i++){
                var top=that.spans[i].offsetTop+that.speed;
                that.spans[i].style.top=top+"px";
                if(top>that.clienth){
                    document.body.removeChild(that.spans[i]);
                    that.spans.splice(i,1);
                    that.currArr.splice(i,1);
                    that.currPosarr.splice(i,1);
                    that.getLetter(1);
                    that.die--;
                    that.dieEle.innerHTML=that.die;
                    if(that.die==0){
                        clearInterval(that.t);
                        that.kaiguan=true;
                        fail=document.createElement("div");
                        again=document.createElement("div");
                        exit=document.createElement("div");
                        fail.setAttribute("class","fail");
                        exit.setAttribute("class","exit");
                        again.setAttribute("class","again");
                        document.body.appendChild(fail);
                        document.body.appendChild(exit);
                        document.body.appendChild(again);
                        again.onclick= function () {
                            document.body.removeChild(fail);
                            document.body.removeChild(again);
                            document.body.removeChild(exit);
                            that.restart();

                        }
                        exit.onclick=function(){
                            window.close();
                        }
                    }

                }
            }
        }
        this.t=setInterval(down,60);
    },
    restart:function(){
        clearInterval(this.t);
        var num=document.getElementsByClassName("num")[0];
        this.kaiguan=false;
        num.innerHTML=1;
        for(var i=0;i<this.spans.length;i++){
            document.body.removeChild(this.spans[i]);
        }
        this.spans=[];
        this.currArr=[];
        this.score=0;
        this.currScore=0;
        this.num=10;
        this.currPosarr=[];
        this.speed=5;
        this.die=10;
        this.letterLen=5;
        this.play();
    },
    next:function(){
      clearInterval(this.t);
        for(var i=0;i<this.spans.length;i++){
            document.body.removeChild(this.spans[i]);
        }
        this.spans=[];
        this.currArr=[];
        this.currScore=0;
        this.num+=10;
        this.currPosarr=[];
        this.speed++;
        this.letterLen++;
        this.play();
    },
    getLetter:function(num){
    //    先获取到指定的字母
        var arr=this.getRand(num);
        var posArr=[];
        //var eleArr=[];
        for(var i=0;i<arr.length;i++){
            var span=document.createElement("span");
            span.setAttribute("value",arr[i]);
            var x=(100+(this.clientw-200)*Math.random());
            var y=(100*Math.random());
            var width=100;
            var height=100;
            //while(this.check1(this.currPosarr,x,width)){
            //     x=(100+(this.clientw-200)*Math.random());
            //}
            posArr.push({minx:x,maxx:x+width});
            this.currPosarr.push({minx:x,maxx:x+width});
            span.style.cssText="width:"+width+"px;height:"+height+"px;display:block;position:absolute;left:"+x+"px;top:"+y+"px;color:#fff;font-size:30px;background:url(img/"+arr[i]+".png);background-size:cover";
            document.body.appendChild(span);
            this.spans.push(span);

        }
    },
    check1:function(arr,x,width){
        for(var i=0;i<arr.length;i++){
            if(!(x+width<arr[i].minx||arr[i].maxx+width<x)){
                return true;
            }
        }
        return false;
    },
    getRand: function (num) {
        var arr=[];
        for(var i=0;i<num;i++){

            var rand=Math.floor(this.letterArr.length*Math.random());
            while(this.check(this.currArr,this.letterArr[rand])){
                var rand=Math.floor(this.letterArr.length*Math.random());
            }
            arr.push(this.letterArr[rand]);
            this.currArr.push(this.letterArr[rand]);
        }
        return arr;

    },
    check: function (arr,val) {
        for(var i=0;i<arr.length;i++){
            if(arr[i]==val){
                return true;
            }
        }
        return false;

    }

};