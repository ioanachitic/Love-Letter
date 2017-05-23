function initializare(){
    var j=document.getElementById("j_m");
    var a=document.getElementById("a_m");
    var p=document.getElementById("pachet");
    
    var cj=document.createElement("img");
    var ca=document.createElement("img");
    
    j.appendChild(cj);
    a.appendChild(ca);
    
    cj.setAttribute("id", "j_m_img");
    ca.setAttribute("id", "a_m_img");
    
    var cp=p.firstElementChild;
    
    cj.src=cp.src;
    ca.src=cp.src;
}

function joaca_carte_m(){
    var m, t, j;
    m=document.getElementById("j_m_img");
    t=document.getElementById("j_t");
    j=document.getElementById("j_j");
    
    var cm=document.getElementById("j_m");
    var ct=t.firstElementChild;
    var cj=document.createElement("img");
    
    j.appendChild(cj);
    
    cj.src=m.src;
    m.src=ct.src;
    
    t.removeChild(ct);
    
      
}

function joaca_carte_t(){
    var t, j;
    t=document.getElementById("j_t_img");
    j=document.getElementById("j_j");
    
    var jp=document.createElement("img");
    j.appendChild(jp);
    
    jp.setAttribute("id", "j_j_img");
    
    jp.src=t.src;
    
    var x=document.getElementById("j_t");
    x.removeChild(t);
}

function ia_carte(){
    var p, t;
    t=document.getElementById("j_t");
    p=document.getElementById("pachet");
    
    var i=document.createElement("img");
    t.appendChild(i);
    i.setAttribute("id", "j_t_img");
    
    i.src=p.firstElementChild.src;
}
    
function start_joc(){
    var b=document.getElementById("start");
    b.style.display="none";
    initializare();
}

function arata_reguli(){
    document.getElementById("reguli_buton").style.display="block";
}

function ascunde_reguli(){
    document.getElementById("reguli_buton").style.display="none";
}

var rezultat="pierdut";

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
