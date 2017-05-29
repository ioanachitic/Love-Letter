import rezultat from 'script';

function rez(){
    if(rezultat=="castigat"){
        var c=document.getElementById("castigat");
        c.style.display="block";
    }
    else{
        var c=document.getElementById("pierdut");
        c.style.display="block";
    }
}

