/*美化标题*/
var chakhsu = function (r) {
    function t() {
        return b[Math.floor(Math.random() * b.length)]
    }
    function e() {
        return String.fromCharCode(94 * Math.random() + 33)
    }
    function n(r) {
        for (var n = document.createDocumentFragment(), i = 0; r > i; i++) {
            var l = document.createElement("span");
            l.textContent = e(), l.style.color = t(), n.appendChild(l)
        }
        return n
    }
    function i() {
        var t = o[c.skillI];
        c.step ? c.step-- : (c.step = g, c.prefixP < l.length ? (c.prefixP >= 0 && (c.text += l[c.prefixP]), c.prefixP++) : "forward" === c.direction ? c.skillP < t.length ? (c.text += t[c.skillP], c.skillP++) : c.delay ? c.delay-- : (c.direction = "backward", c.delay = a) : c.skillP > 0 ? (c.text = c.text.slice(0, -1), c.skillP--) : (c.skillI = (c.skillI + 1) % o.length, c.direction = "forward")), r.textContent = c.text, r.appendChild(n(c.prefixP < l.length ? Math.min(s, s + c.prefixP) : Math.min(s, t.length - c.skillP))), setTimeout(i, d)
    }
    var l = ""
        a = 2, g = 1, s = 5, d = 100,
        b = ["rgb(110,64,170)", "rgb(150,61,179)", "rgb(191,60,175)", "rgb(228,65,157)", "rgb(254,75,131)", "rgb(255,94,99)", "rgb(255,120,71)", "rgb(251,150,51)", "rgb(226,183,47)", "rgb(198,214,60)", "rgb(175,240,91)", "rgb(127,246,88)", "rgb(82,246,103)", "rgb(48,239,130)", "rgb(29,223,163)", "rgb(26,199,194)", "rgb(35,171,216)", "rgb(54,140,225)", "rgb(76,110,219)", "rgb(96,84,200)"],
        c = {text: "", prefixP: -s, skillI: 0, skillP: 0, direction: "forward", delay: a, step: g};
    i()
};
chakhsu(document.getElementById('chakhsu'));



/*崩溃标题*/
var OriginTitle = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        $('[rel="icon"]').attr('href', "https://cdn.jsdelivr.net/gh/AVooooo/imgbed/favicon.ico");
        document.title = '请记得将本站分享给好友一起观看';
        clearTimeout(titleTime);
    }
    else {
        $('[rel="icon"]').attr('href', "https://cdn.jsdelivr.net/gh/AVooooo/imgbed/favicon.ico");
        document.title = '你的在线福利网站';
        titleTime = setTimeout(function () {
            document.title = OriginTitle;
        }, 2000);
    }
});





function clickEffect() {
    let balls = [];
    let longPressed = false;
    let longPress;
    let multiplier = 0;
    let width, height;
    let origin;
    let normal;
    let ctx;
    const colours = ["#F73859", "#14FFEC", "#00E0FF", "#FF99FE", "#FAF15D"];
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.setAttribute("style", "width: 100%; height: 100%; top: 0; left: 0; z-index: 99999; position: fixed; pointer-events: none;");
    const pointer = document.createElement("span");
    pointer.classList.add("pointer");
    document.body.appendChild(pointer);
    if (canvas.getContext && window.addEventListener) {
        ctx = canvas.getContext("2d");
        updateSize();
        window.addEventListener('resize', updateSize, false);
        loop();
        window.addEventListener("mousedown", function(e) {
            pushBalls(randBetween(10, 20), e.clientX, e.clientY);
            document.body.classList.add("is-pressed");
            longPress = setTimeout(function() {
                document.body.classList.add("is-longpress");
                longPressed = true;
            }, 500);
        }, false);
        window.addEventListener("mouseup", function(e) {
            clearInterval(longPress);
            if (longPressed == true) {
                document.body.classList.remove("is-longpress");
                pushBalls(randBetween(50 + Math.ceil(multiplier), 100 + Math.ceil(multiplier)), e.clientX, e.clientY);
                longPressed = false;
            }
            document.body.classList.remove("is-pressed");
        }, false);
        window.addEventListener("mousemove", function(e) {
            let x = e.clientX;
            let y = e.clientY;
            pointer.style.top = y + "px";
            pointer.style.left = x + "px";
        }, false);
    } else {
        console.log("canvas or addEventListener is unsupported!");
    }
    function updateSize() {
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        ctx.scale(2, 2);
        width = (canvas.width = window.innerWidth);
        height = (canvas.height = window.innerHeight);
        origin = {
            x: width / 2,
            y: height / 2
        };
        normal = {
            x: width / 2,
            y: height / 2
        };
    }
    class Ball {
        constructor(x = origin.x, y = origin.y) {
            this.x = x;
            this.y = y;
            this.angle = Math.PI * 2 * Math.random();
            if (longPressed == true) {
                this.multiplier = randBetween(14 + multiplier, 15 + multiplier);
            } else {
                this.multiplier = randBetween(6, 12);
            }
            this.vx = (this.multiplier + Math.random() * 0.5) * Math.cos(this.angle);
            this.vy = (this.multiplier + Math.random() * 0.5) * Math.sin(this.angle);
            this.r = randBetween(8, 12) + 3 * Math.random();
            this.color = colours[Math.floor(Math.random() * colours.length)];
        }
        update() {
            this.x += this.vx - normal.x;
            this.y += this.vy - normal.y;
            normal.x = -2 / window.innerWidth * Math.sin(this.angle);
            normal.y = -2 / window.innerHeight * Math.cos(this.angle);
            this.r -= 0.3;
            this.vx *= 0.9;
            this.vy *= 0.9;
        }
    }
    function pushBalls(count = 1, x = origin.x, y = origin.y) {
        for (let i = 0; i < count; i++) {
            balls.push(new Ball(x, y));
        }
    }
    function randBetween(min, max) {
        return Math.floor(Math.random() * max) + min;
    }
    function loop() {
        ctx.fillStyle = "rgba(255, 255, 255, 0)";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < balls.length; i++) {
            let b = balls[i];
            if (b.r < 0) continue;
            ctx.fillStyle = b.color;
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2, false);
            ctx.fill();
            b.update();
        }
        if (longPressed == true) {
            multiplier += 0.2;
        } else if (!longPressed && multiplier >= 0) {
            multiplier -= 0.4;
        }
        removeBall();
        requestAnimationFrame(loop);
    }
    function removeBall() {
        for (let i = 0; i < balls.length; i++) {
            let b = balls[i];
            if (b.x + b.r < 0 || b.x - b.r > width || b.y + b.r < 0 || b.y - b.r > height || b.r < 0) {
                balls.splice(i, 1);
            }
        }
    }
}
clickEffect();