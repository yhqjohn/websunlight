function clock(){
    let h = new Date().getHours();
    let m = new Date().getMinutes();
    let s = new Date().getSeconds();
    $("#hours").html(h)
    $("#minuts").html(m)
    $("#seconds").html(s)
}

$('.class').ready(clock)
var interval = setInterval(clock,1000);