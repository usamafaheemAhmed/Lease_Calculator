



function setCookie(cname,cValue) {

let name = document.getElementById('name').value;
let email = document.getElementById('email').value;
if (name == '' || email == '') {
alert('Please fill in all the details');
return false;
}
else{
document.cookie = cname + "=" + cValue + ";path=/";
checkCookie();
}

}

function getCookie(cname) {
let name = cname + "=";
let decodedCookie = decodeURIComponent(document.cookie);
let ca = decodedCookie.split(';');
for(let i = 0; i < ca.length; i++) {
let c = ca[i];
while (c.charAt(0) == ' ') {
  c = c.substring(1);
}
if (c.indexOf(name) == 0) {
  return c.substring(name.length, c.length);
}
}
return "";
}

function checkCookie() {

let user = getCookie("existingUser");
if (user != "") {
 getResult();
} else {
$('#exampleModalCenter').modal('show');
 }
}








    function getResult() {
        //close modal
        $('#exampleModalCenter').modal('hide');
        document.getElementById("result").style.display = "block";
        var equipmentAmount = parseFloat(document.getElementById("equipmentAmount").value.replace(/,/g, ''));
        var months = parseFloat(document.getElementById("months").value);

        let interestRate = parseFloat(document.getElementById("interestRate").value);
        let result = PMT(interestRate / 100 / 12, months, -equipmentAmount, 1, 1);
        let taxWriteOff = result * 12;

        document.getElementById("result").style.display = "block";
        document.getElementById("monthlyPayment").innerHTML = toComma(result);
        document.getElementById("taxWriteOff").innerHTML = toComma(taxWriteOff);

        $.ajax({
    type: "POST",
    url: "./mail-withoutBrokerFee.php",
    data: {
        name: name,
        email: email,
        equipmentAmount: equipmentAmount,
        months: months,
    
        interestRate: interestRate,
        result: result,
        taxWriteOff: taxWriteOff
    },
    success: function (data) {
        console.log(data);
    }
});




    }


    function PMT(rate, nper, pv, fv, type) {
        if (!fv) fv = 0;
        if (!type) type = 0;

        if (rate == 0) return -(pv + fv) / nper;

        var pvif = Math.pow(1 + rate, nper);
        var pmt = rate / (pvif - 1) * -(pv * pvif + fv);

        if (type == 1) {
            pmt /= (1 + rate);
        }

        return pmt;
    }
    let toComma = (x) => "$ " + x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");


    function format(input) {
        var nStr = input.value + '';
        nStr = nStr.replace(/\,/g, "");
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        input.value = x1 + x2;
    }

