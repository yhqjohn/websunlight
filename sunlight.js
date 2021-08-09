function multiInterpolate(arr, x){
    var y=0.;
    var i;
    for (i=0; i<=arr.length-2; i++){
        if (x>=arr[i][0]&&x<=arr[i+1][0]){
            return arr[i][1] + (arr[i+1][1]-arr[i][1])/(arr[i+1][0]-arr[i][0])*(x-arr[i][0]);
        }
    }
    return 0;
}

function colorTemperatureToRGB(kelvin){
    var temp = kelvin / 100;
    var red, green, blue;
    if( temp <= 66 ){ 
        red = 255;         
        green = temp;
        green = 99.4708025861 * Math.log(green) - 161.1195681661;      
        if( temp <= 19){
            blue = 0;
        } else {
            blue = temp-10;
            blue = 138.5177312231 * Math.log(blue) - 305.0447927307;
        }
    } else {
        red = temp - 60;
        red = 329.698727446 * Math.pow(red, -0.1332047592);        
        green = temp - 60;
        green = 288.1221695283 * Math.pow(green, -0.0755148492 );
        blue = 255;

    }
    return [clamp(red,   0, 255), clamp(green, 0, 255), clamp(blue,  0, 255)]
}

function clamp( x, min, max ) {
    if(x<min){ return min; }
    if(x>max){ return max; }
    return x;
}

function sunlight(kelvin, irr){
    return colorTemperatureToRGB(kelvin).map(function(x) { return x * irr; })
}

var sunTemperature = [[6, 3000], [8, 3800], [10, 4500], [12, 5400], [14, 4900], [16, 4100], [18, 3000]]

var sunIrradiance = [[6, 0.2], [8, 0.48], [10, 0.96], [12, 1], [14, 1], [16, 0.6], [18, 0.2]]

function hourSunlight(hour) {
    return sunlight(multiInterpolate(sunTemperature, hour), multiInterpolate(sunIrradiance, hour)) 
}

function componentToHex(c) {
    var hex = Math.round(c).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
function rgbToHex(r, g, b) {
return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

