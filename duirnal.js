var duirnal = function(){
    var date = new Date()
    var h = date.getHours() + date.getMinutes()/60;
    var centre = interpolate(centre_arr,h)
    var edge = interpolate(edge_arr, h)
    $('#d').css('backgroundImage', `radial-gradient(rgb(${centre}), rgb(${centre}), rgb(${centre}), rgb(${edge}))`)
}
$('#d').ready(duirnal)

setInterval(duirnal,1000);