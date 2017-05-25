CarteManaJ=0;
CarteManaC=0;
CarteTrasaJ=0;
CarteTrasaC=0;
CarteJucata=0;
indexPachet=2;
MAN=0;
a2aRunda=0;
var ok=0;

function arata_reguli(){
    document.getElementById("reguli_buton").style.display="block";
}

function ascunde_reguli(){
    document.getElementById("reguli_buton").style.display="none";
    document.getElementById("gardian").style.display="none";
}

var rezultat="castigat";

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

function start_joc(){
	var b=document.getElementById("start");
	b.style.display="none";

	pachet=crearePachet();
	setTimeout(punePrimaCarteJos, 500);

	ok=1;

	document.getElementById("pachet").addEventListener("click", Joc);

	GardianJ();
}

function getRndInteger(min, max) {                         
    return Math.floor(Math.random() * (max - min)) + min;
}

function crearePachet(){
	
	pachet = [1,1,1,1,1,2,2,3,3,4,4,5,5,6,7,8];
	
	for(i=0;i<15;i++){
 		a=getRndInteger(0,15);
  		man=pachet[i];
  		pachet[i]=pachet[a];
  		pachet[a]=man;
	}
	return pachet;
}

function Joc(){
	if(indexPachet==16){
		pachet=crearePachet();
		indexPachet=0;
	}
		
	if(MAN==1){	
	//alert("a intrat in remove");
	MAN=0;
	a2aRunda=1;

	document.getElementById("j_t").removeEventListener("click", joacaCarteaT);
	document.getElementById("j_m").removeEventListener("click", joacaCarteaM);
	document.getElementById("j_m").removeEventListener("click",astepareTragereCarteCalculator);
	document.getElementById("j_t").removeEventListener("click",astepareTragereCarteCalculator);
	}
	else{
	MAN=1;
	//alert("a intrat in add")
	trageCarteJ();
	randJ();

	document.getElementById("j_m").addEventListener("click",astepareTragereCarteCalculator);//orice carte alege jucatorul calculatorul face ceva
	document.getElementById("j_t").addEventListener("click",astepareTragereCarteCalculator);
	}
}

function astepareTragereCarteCalculator(){
	setTimeout(trageCarteC,600);
	
}

function trageCarteJ(){
	var t;
	t=document.getElementById("j_t");
	var x =corelare_Carte_Vector(pachet[indexPachet]);
	CarteTrasaJ=pachet[indexPachet];
	indexPachet+=1;
	t.appendChild(x);
	x.setAttribute("id", "j_t_img");
}

function trageCarteC(){
	var t;
	t=document.getElementById("a_t");
	var x =corelare_Carte_Vector(pachet[indexPachet]);
	CarteTrasaC=pachet[indexPachet];
	indexPachet+=1;
	t.appendChild(x);
	x.setAttribute("id", "a_t_img");
	depunereCarteCalc();
	
}

function randJ(){
	document.getElementById("j_t").addEventListener("click", joacaCarteaT);
	document.getElementById("j_m").addEventListener("click", joacaCarteaM);
	
}

function joacaCarteaM(){
	CarteJucata=CarteManaJ;
	CarteManaJ=CarteTrasaJ;
	depunereCarteM(CarteJucata);
	
}

function joacaCarteaT(){
	CarteJucata=CarteTrasaJ;
	depunereCarteT(CarteJucata);
	document.getElementById("j_m").removeEventListener("click", joacaCarteaM);
}

function depunereCarteM(CarteJucata){
	
	var t=document.getElementById("j_j");
	var x =corelare_Carte_Vector(CarteJucata);

	if(a2aRunda==1){  
	    alert("a2.arunda");
		t.removeChild(document.getElementById("j_j_img"));			
	}

	t.appendChild(x);
	x.setAttribute("id", "j_j_img");
	
	document.getElementById("j_m").removeChild(document.getElementById("j_m_img"));
	
	t1=document.getElementById("j_m");
	var x1=corelare_Carte_Vector(CarteTrasaJ);
	t1.appendChild(x1);
   	x1.setAttribute("id", "j_m_img");	
	
	document.getElementById("j_t").removeChild(document.getElementById("j_t_img"));
}

function depunereCarteT(CarteJucata){
	var t=document.getElementById("j_j");
	var x =corelare_Carte_Vector(CarteJucata);

	if(a2aRunda==1){  
	    alert("a2.arunda");
		t.removeChild(document.getElementById("j_j_img"));
	}

	t.appendChild(x);
	x.setAttribute("id", "j_j_img");
	document.getElementById("j_t").removeChild(document.getElementById("j_t_img"));	
}

function depunereCarteCalc(){
	//alert("CM="+CarteManaC+"  CT="+CarteTrasaC);
	C=strategieCalculator(CarteManaC,CarteTrasaC);
	if(C==CarteManaC){
		CarteManaC=CarteTrasaC;
		CarteTrasaC=0;
	}
	if(C==CarteTrasaC){
		CarteTrasaC=0;
	}
	
	//
	setTimeout(function(){document.getElementById("a_m").removeChild(document.getElementById("a_m_img"));},500);
	var p;
	p=document.getElementById("a_m");
	var x1 =corelare_Carte_Vector(CarteManaC);
	x1.setAttribute("id", "a_m_img");
	setTimeout(function(){p.appendChild(x1);},500);
	//

	var t=document.getElementById("a_j");

	if(a2aRunda==1){  
	    alert("a2.arunda");
		setTimeout(function(){t.removeChild(document.getElementById("a_j_img"));},900);			
	}

	var x =corelare_Carte_Vector(C);
   	setTimeout(function(){t.appendChild(x);},1000);
	x.setAttribute("id", "a_j_img");
	setTimeout(function(){document.getElementById("a_t").removeChild(document.getElementById("a_t_img"));},500);
	MAN = 1;//am nevoie in functia joc pt a stii cand sa continui;
}

function strategieCalculator(carte1,carte2){
	c1=Math.min(carte1,carte2);
	c2=Math.max(carte1,carte2);

	if(c2==8)
		return c1;
    
	if((c2==7)&&((c1==5)||(c1==6)))
		return c2;
    
	if((c2==6)&&(c1==1))
		return c1;
    
	if(c1==4)
		return c1;

	if(c2==4)
		return c2;
    
	if((c1==3)&&(c2>=5))
		return c1;

	if((c1==3)&&(c2<5))
    		return c2;

	if((c2==3)&&(c1<3))
		return c1;
   
	return carte1
}

function printesa_8(){
	var x = document.createElement("img");
	x.setAttribute("src", "Poze/printesa.JPG");
	x.setAttribute("alt", "Printesa");
	return x;
}

function contesa_7(){
	var x = document.createElement("img");
	x.setAttribute("src", "Poze/contesa.JPG");
	x.setAttribute("alt", "Contesa");
	return x;
}

function rege_6(){
	var x = document.createElement("img");
	x.setAttribute("src", "Poze/rege.JPG");
	x.setAttribute("alt", "Rege");
	return x;
}

function print_5(){
	var x = document.createElement("img");
	x.setAttribute("src", "Poze/print.JPG");
	x.setAttribute("alt", "Print");
	return x;
}

function camerista_4(){
	var x = document.createElement("img");
	x.setAttribute("src", "Poze/camerista.JPG");
	x.setAttribute("alt", "Camerista");
	return x;
}

function baron_3(){
	var x = document.createElement("img");
	x.setAttribute("src", "Poze/baron.JPG");
	x.setAttribute("alt", "Baron");
	return x;
}

function preot_2(){
	var x = document.createElement("img");
    x.setAttribute("src", "Poze/preot.JPG");
    x.setAttribute("alt", "Preot");
	return x;
}

function gardiana_1(){
	var x = document.createElement("img");
	x.setAttribute("src", "Poze/gardiana.JPG");
	x.setAttribute("alt", "Gardian");
	return x;
}

function spate(){
	var x = document.createElement("img");
	x.setAttribute("src", "Poze/spate.JPG");
	x.setAttribute("alt", "Spate");
	return x;
}

function corelare_Carte_Vector(numarCarte){
	var x;
	switch (numarCarte) {

		case 1:
			x=gardiana_1();
			break;

		case 2:
			x=preot_2();
			break;

		case 3:
			x=baron_3();
			break;

		case 4:
			x=camerista_4();
			break;

		case 5:
			x=print_5();
			break;

		case 6:
			x=rege_6();
			break;

		case 7:
			x=contesa_7();
			break;

		case 8:
			x=printesa_8();
		
	}
	
	return x;
}

function punePrimaCarteJos(){
	var t=document.getElementById("j_m");
	var x=corelare_Carte_Vector(pachet[0]);
	t.appendChild(x);

	x.setAttribute("id", "j_m_img");
	CarteManaJ=pachet[0];
	
	t=document.getElementById("a_m");
	var x=corelare_Carte_Vector(pachet[1]);//=spate();
	t.appendChild(x);
	x.setAttribute("id", "a_m_img");
	CarteManaC=pachet[1];
	
	indexPachet=2;	
}

function GardianJ(){
	var g=document.getElementById("gardian");

    var x = document.createElement("INPUT");
    x.setAttribute("type", "radio");
    x.setAttribute("name", "carte");
    x.setAttribute("id","1");
    g.appendChild(x);
    g.innerHTML += " Gardian<br>";
    
    
    x = document.createElement("INPUT");
    x.setAttribute("type", "radio");
    x.setAttribute("name", "carte");
    x.setAttribute("id","2");
    g.appendChild(x);
    g.innerHTML +=" Preot<br>";
    
   
    x = document.createElement("INPUT");
    x.setAttribute("type", "radio");
    x.setAttribute("name", "carte");
    x.setAttribute("id","3");
    g.appendChild(x);
    g.innerHTML += " Baron<br>";
    
    
    x = document.createElement("INPUT");
    x.setAttribute("type", "radio");
    x.setAttribute("name", "carte");
    x.setAttribute("id","4");
    g.appendChild(x);
    g.innerHTML += " Camerista<br>";
    
    
    x = document.createElement("INPUT");
    x.setAttribute("type", "radio");
    x.setAttribute("name", "carte");
    x.setAttribute("id","5");
    g.appendChild(x);
    g.innerHTML += " Print<br>";
    
    
    x = document.createElement("INPUT");
    x.setAttribute("type", "radio");
    x.setAttribute("name", "carte");
    x.setAttribute("id","6");
    g.appendChild(x);
    g.innerHTML += " Rege<br>";
    
    
    x = document.createElement("INPUT");
    x.setAttribute("type", "radio");
    x.setAttribute("name", "carte");
    x.setAttribute("id","7");
    g.appendChild(x);
    g.innerHTML += " Contesa<br>";
    
    
    x = document.createElement("INPUT");
    x.setAttribute("type", "radio");
    x.setAttribute("name", "carte");
    x.setAttribute("id","8");
    g.appendChild(x);
    g.innerHTML += " Printesa<br>";

    g.style.display="block";
}

function alege(){ // functia returneaza ID-ul cartii alese
    var g=document.getElementById("gardian");

    var copii=g.childNodes;

    var sem=0;

    console.log(copii);

    for(var i=0; i<copii.length; i++)
    	if(copii[i].nodeName=="INPUT" && copii[i].checked==true){
            sem=1;
            break;
		}

	if(sem == 1)
	{
        g.style.display="none";
		return copii[i].id;
    }
	else
		alert("Nu ati ales carte");
}


