
    function subTotal(){
        let sum = 0;
        var total = document.getElementsByClassName('total');
        var itemGiaBanDau = document.getElementsByClassName('item-giaBanDau');
        var itemGiaBan = document.getElementsByClassName('item-giaBan');
        var itemTotalGiaBanDau = document.getElementsByClassName('item-totalGiaBanDau');
        var itemTotalGiaBan = document.getElementsByClassName('item-totalGiaBan');
        var itemQuantity = document.getElementsByClassName('item-quantity'); 
        
        for(let i = 0 ; i < itemGiaBan.length ; i++){
            itemTotalGiaBanDau[i].innerText = '$' + Math.round(itemGiaBanDau[i].value * itemQuantity[i].value * 10)/10;
            itemTotalGiaBan[i].innerText = '$' + Math.round(itemGiaBan[i].value * itemQuantity[i].value * 10)/10;
            sum+= Math.round(itemGiaBan[i].value * itemQuantity[i].value * 10)/10;
        }   
        for(let i = 0 ; i < total.length ; i++){
            total[i].innerText = '$' + Math.round(sum * 10)/10;
        }
    }

function clearCartJs(){
    var total = document.getElementsByClassName('total');
        for(let i = 0 ; i < total.length ; i++){
            total[i].innerText = '$' + 0;
        }
}