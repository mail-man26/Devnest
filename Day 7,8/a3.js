const volume = {
    pi:Math.PI,
    r:10,
    h:10,
    myVal: function ()
    {
        return (volume.pi*(volume.r**2)*volume.h).toFixed(4)
    }
};


console.log(volume.myVal());