function interpolate (arr, x) {
    var y=0.;
    var i;
    for (i=0; i<=arr.length-2; i++){
        if (x>=arr[i][0]&&x<=arr[i+1][0]){
            return math.add(
                arr[i][1],
                math.multiply( 
                    math.divide(
                        math.subtract(arr[i+1][1],arr[i][1]),
                        math.subtract(arr[i+1][0],arr[i][0])
                    ),
                    (x-arr[i][0])
                )
            );
        }
    }
    return 0;
}