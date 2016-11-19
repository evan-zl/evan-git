/*2016年11月16日 16:35:05*/

window.Transmit = (function() {

    var carousel = function() {
        this.trigger;
        this.control;
        this.sign;
        this.dx = 0;
        this.l = 0;
        this.s = 0;
    }
    carousel.prototype = {

        init: function(params) {
            this.params = params;
            this.trigger = document.querySelector(params.trigger);
            if (params.control) {
                this.control = params.control;
                this.next = document.querySelector(params.control.next);
                this.prev = document.querySelector(params.control.prev);
            }
            if (params.sign) {
            	this.sign = document.querySelector(params.sign.target);
                this.siChilds = this.sign.children;
            	this.signColorS = params.sign.signColor.s;
            	this.signColorE = params.sign.signColor.e;
            }
            this.t = params.t;
            this.run();
        },

        /*执行*/
        run: function() {
            var self = this;
            self.tirChilds = self.trigger.children;
            self.w = self.tirChilds[0].offsetWidth;
            self.n = self.w / 10;
            var left = self.trigger.offsetLeft;

            var act = task();

            function task() {
            	var act = setInterval(function(){
                    self.indexAdd(self.tirChilds);                  
                    self.increase(left);
                }, self.t);
            	return act;
            }

            function stop() {
            	clearInterval(act);
            }
            function start() {
            	stop();
            	act = task();
            }            

            self.trigger.onmousemove = function() {
            	stop();
            }
            self.trigger.onmouseout = function() {
            	start();
            }
            if (self.control) {
                self.next.onclick = function() {
                    stop();                     
                    self.indexAdd(self.tirChilds);
                    self.increase(left);
                    setTimeout(start, self.t);
                }
                self.prev.onclick = function() {
                    stop(); 
                    self.indexSub(self.tirChilds); 
                    self.decrease(left); 
                    setTimeout(start, self.t);
                }
            }

            if (self.sign) {
                for (var i = 0; i < self.siChilds.length; i++) {
                    self.siChilds[i].onclick = function(e) {
                        for (var i = 0; i < self.siChilds.length; i++) {
                            if (self.siChilds[i] == this) {
                                self.dx = i;
                            }
                        }
                        stop();
                        self.l = -self.dx * self.w;
                        self.signBackground(self.dx);
                        self.tirChilds[self.tirChilds.length-1].style = '';
                        self.tirChilds[0].style = '';
                        // self.trigger.style.left = left + self.l + 'px';   
                        self.animate(self.trigger, 300, left + self.l);
                        setTimeout(start, self.t);
                    }
                }
            }

        },

        /*改变标记背景颜色*/
        signBackground: function(n) {
            this.siChilds[n].style.background = this.signColorE;
                for (var i = 0; i < this.siChilds.length; i++) {
                    if (i != n) {
                        this.siChilds[i].style.background = this.signColorS;
                    }
                }
        },

        /*索引递增*/
        indexAdd: function(objs) {
            this.dx++;
            if (this.dx > objs.length-1) {
                this.dx = 0;
            }
            if (this.sign) {
                this.signBackground(this.dx);                
            }
        },

        /*索引递减*/
        indexSub: function(objs) {
            this.dx--;
            if (this.dx < 0) {
                this.dx = objs.length-1;
            }
            if (this.sign) {
                this.signBackground(this.dx);                
            }
        },

        /*索引增加动画*/
        increase: function(pos) {
            var self = this;
            (function as() {
                var len = self.tirChilds.length;
                self.s += 1;
                self.trigger.style.left = pos + self.l + 'px';
                if (self.s > 10) {
                    return self.s = 0;
                }
                if (self.l < -self.w * (len - 1) && self.l > -self.w * len) {
                    self.tirChilds[0].style.position = 'relative';
                    self.tirChilds[0].style.left = self.w * len + 'px';
                } else if (self.l == 0) {
                    self.tirChilds[len-1].style = '';                  
                    self.trigger.style.left = pos + 'px';               
                }
                self.l -= self.n;
                if (self.l == -self.w * len) {
                    self.l = 0;
                    self.tirChilds[0].style = '';
                    self.trigger.style.left = pos + 'px';

                } 

                setTimeout(as, 20);
            }())
        },

        /*索引减少动画*/
        decrease: function(pos) {
            var self = this;
            (function as() {
                var len = self.tirChilds.length;
                self.s += 1;
                self.trigger.style.left = pos + self.l + 'px';
                if (self.s > 10) {
                    return self.s = 0;
                }
                if (self.l > 0 && self.l < self.w) {
                    self.tirChilds[len-1].style.position = 'relative';
                    self.tirChilds[len-1].style.left = -self.w * len + 'px';
                } else if (self.l == -len * self.w) {
                    self.tirChilds[0].style = '';
                    self.trigger.style.left = pos + 'px';
                }
                self.l += self.n;
                if (self.l == self.w) {   
                    self.l = -self.w * (len-1);                 
                    self.tirChilds[len-1].style = '';
                    self.trigger.style.left = pos + -self.w * (len-1) + 'px';
                }

                setTimeout(as, 20);
            }())
        },

        /* 动画 */
        animate: function(obj, t, w) {
            var s = 0;
            var ts = t / 10;
            var l = obj.offsetLeft;
            var w = w - l;
            var ws = w / 10;
            (function add() {
                s++;
                if (s > 10) {
                    return s = 0;
                }
                l += ws;
                obj.style.left = l + 'px';
                setTimeout(add, ts);
            }())

        }

    }

    return carousel;

})()
