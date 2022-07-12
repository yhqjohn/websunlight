var nightEnd = 4;
var dawnStart = 5;
var dawnEnd = 6.5;
var duskStart  = 17.5;
var duskEnd = 19;
var night =20;

let shandy = [255, 227, 115];
let white = [255,250,245];
let brown = [252, 156, 84];
let sunsetred = [253, 94, 83];
let twilight = [75, 61, 96];
let space = [21, 40, 82];
let dark = [8, 24, 58];

let centre_arr = [
    [0, space], 
    [0.1, twilight], 
    [0.4, sunsetred], 
    [0.5, brown], 
    [0.6, shandy], 
    [1,white], 
];

let edge_arr = [
    [0, dark], 
    [0.1, space], 
    [0.4, twilight], 
    [0.5, sunsetred], 
    [0.6, brown], 
    [1,shandy], 
];

function duirnal () {
    var date = new Date()
    var h = date.getHours() + date.getMinutes()/60;
    // alert(h)
    var centre;
    var edge;
    [centre, edge] = getRGB(h)
    opacity = getOpacity(h)
    sky = `radial-gradient(rgb(${centre}), rgb(${centre}), rgb(${centre}), rgb(${edge}))`
    $('#d').css('background', sky)
    $('.bg').css('opacity', opacity)
}

$('#d').ready(geoInit)
$('#d').ready(duirnal)

function geoInit(){
    navigator.geolocation.getCurrentPosition(function(position) {
        var times = SunCalc.getTimes(new Date(), position.coords.latitude, position.coords.longitude);
        nightEnd = times.nightEnd.getHours() + times.nightEnd.getMinutes()/60;
        dawnStart = times.nauticalDawn.getHours() + times.nauticalDawn.getMinutes()/60;
        dawnEnd = times.sunriseEnd.getHours() + times.sunriseEnd.getMinutes()/60;
        duskStart = times.sunsetStart.getHours() + times.sunsetStart.getMinutes()/60;
        duskEnd = times.nauticalDusk.getHours() + times.nauticalDusk.getMinutes()/60;
        night = times.night.getHours() + times.night.getMinutes()/60;
      });
}

function getRGB (h) {
    var centre;
    var edge;
    if (h>=dawnEnd && h<duskStart) {
        centre = white;
        edge = shandy;
    }
    else if (h>=duskStart && h<duskEnd) {
        var sunriseProgress = (duskEnd-h)/(duskEnd-duskStart);
        centre = interpolate(centre_arr, sunriseProgress);
        edge = interpolate(edge_arr, sunriseProgress);
    }
    else if (h>=duskEnd || h<dawnStart) {
        var sunriseProgress = (duskEnd-h)/(duskEnd-duskStart);
        centre = space;
        edge = dark;
    }
    else if (h>=dawnStart && h<dawnEnd) {
        var sunriseProgress = (h-dawnStart)/(dawnEnd-dawnStart)
        centre = interpolate(centre_arr, sunriseProgress);
        edge = interpolate(edge_arr, sunriseProgress);
    }
    return [centre, edge]
}

function getOpacity (h) {
    var opacity
    if (h>=dawnStart && h<duskEnd) {
        opacity = 0;
    }
    else if (h>=duskEnd && h<night) {
        opacity = (h-duskEnd)/(night - duskEnd)
    }
    else if (h>=night || h<nightEnd) {
        opacity = 1;
    }
    else if (h>=nightEnd && h<dawnStart) {
        opacity = (dawnStart-h)/(dawnStart-nightEnd)
    }
    return opacity
}

setInterval(duirnal,1000);