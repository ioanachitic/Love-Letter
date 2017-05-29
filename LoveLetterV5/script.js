CarteManaJ=0;
CarteManaC=0;
CarteTrasaJ=0;
CarteTrasaC=0;
CarteJucataJ=0;
CarteJucataC=0;
indexPachet=2;
Actiune=false;
MAN=0;
a2aRunda=0;
var ok=0;


cameristaJ=false;
cameristaC=false;
CarteAflata=0;


function arata_reguli(){
    document.getElementById("reguli_buton").style.display="block";
}

function ascunde_reguli(){
    document.getElementById("reguli_buton").style.display="none";
    document.getElementById("gardian").style.display="none";
}


function start_joc(){
	var b=document.getElementById("start");
	b.style.display="none";

	pachet=crearePachet();
	setTimeout(punePrimaCarteJos, 500);

	ok=1;
	document.getElementById("pachet").addEventListener("click", Joc);
}

function getRndInteger(min, max) {                         
    return Math.floor(Math.random() * (max - min)) + min;
}

function crearePachet(){
	 pachet = [1,1,1,1,1,2,2,3,3,4,4,5,5,6,7,8];		
     for( i=0;i<=15;i++){
		a=getRndInteger(0,15);
		man=pachet[i];
		pachet[i]=pachet[a];
		pachet[a]=man;
	}
	gasitC=true;
	gasitJ=true;
	for(i=0;i<=13;i++){
		if((CarteManaC==pachet[i])&&(gasitC)){
			gasitC=false;
			man=pachet[15];
			pachet[15]=pachet[i];
			pachet[i]=man;
		}
        if((CarteManaJ==pachet[i])&&(gasitJ)){
			gasitJ=false;
			man=pachet[14];
			pachet[14]=pachet[i];
			pachet[i]=man;
		}
    }
	pachet = [8,2,3,8,3,4,1,1,1,2,7,5,7,8];
	return pachet;
}

function Joc(){
	if(indexPachet==12){
		pachet=crearePachet();
		indexPachet=0;
	}
		
	if(MAN==1){	
	MAN=0;
	a2aRunda=1;
	document.getElementById("j_t").removeEventListener("click", joacaCarteaT);
	document.getElementById("j_m").removeEventListener("click", joacaCarteaM);
	document.getElementById("j_m").removeEventListener("click",astepareTragereCarteCalculator);
	document.getElementById("j_t").removeEventListener("click",astepareTragereCarteCalculator); 
    trageCarteJ();
	randJ();
	}
	else{
	MAN=1;
	trageCarteJ();
	randJ();
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
	document.getElementById("pachet").removeEventListener("click", Joc);
}

function trageCarteC(){
	var t;
	t=document.getElementById("a_t");
	var x =spate();
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
	CarteJucataJ=CarteManaJ;
	CarteManaJ=CarteTrasaJ;
	depunereCarteM(CarteJucataJ);
	if(cameristaC){cameristaC=false;
		actiuneSingurJ(CarteJucataJ);
	}
	else actiuneJ(CarteJucataJ);
	
}

function joacaCarteaT(){
	CarteJucataJ=CarteTrasaJ;
	depunereCarteT(CarteJucataJ);
	if(cameristaC){cameristaC=false;
		actiuneSingurJ(CarteJucataJ);
	}
	else actiuneJ(CarteJucataJ);
	document.getElementById("j_m").removeEventListener("click", joacaCarteaM);
}

function depunereCarteM(CarteJucata){
	
	var t=document.getElementById("j_j");
	var x =corelare_Carte_Vector(CarteJucata);

	if(a2aRunda==1){  
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
		t.removeChild(document.getElementById("j_j_img"));
	}

	t.appendChild(x);
	x.setAttribute("id", "j_j_img");
	document.getElementById("j_t").removeChild(document.getElementById("j_t_img"));	
}

function depunereCarteCalc(){
	C=strategieCalculator(CarteManaC,CarteTrasaC);
	CarteJucataC=C;
	setTimeout(function(){if(cameristaJ){cameristaJ=false;
							actiuneSingurC(CarteJucataC);}
							else actiuneC(CarteJucataC);},1000);
	if(C==CarteManaC){
		CarteManaC=CarteTrasaC;
		CarteTrasaC=0;
	}
	if(C==CarteTrasaC){
		CarteTrasaC=0;
	}
	
	
	setTimeout(function(){document.getElementById("a_m").removeChild(document.getElementById("a_m_img"));},500);
	var p;
	p=document.getElementById("a_m");
	var x1 =spate();
	x1.setAttribute("id", "a_m_img");
	setTimeout(function(){p.appendChild(x1);},500);
	

	var t=document.getElementById("a_j");

	if(a2aRunda==1){
		setTimeout(function(){t.removeChild(document.getElementById("a_j_img"));},900);			
	}

	var x =corelare_Carte_Vector(C);
   	setTimeout(function(){t.appendChild(x);},1000);
	x.setAttribute("id", "a_j_img");
	setTimeout(function(){document.getElementById("a_t").removeChild(document.getElementById("a_t_img"));},500);
	MAN = 1;//am nevoie in functia joc pt a stii cand sa continui;
	document.getElementById("pachet").addEventListener("click", Joc);
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
	var x=spate();
	t.appendChild(x);
	x.setAttribute("id", "a_m_img");
	CarteManaC=pachet[1];
	
	indexPachet=2;	
}

GardianaNuAMaiJucat=true;

function GardianaJ(){
	var g=document.getElementById("gardian");
    
    if(GardianaNuAMaiJucat){
		GardianaNuAMaiJucat=false;
		var x = document.createElement("INPUT");
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
	}
    g.style.display="block";
	
}

function alege(){
	 // functia returneaza ID-ul cartii alese
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
		if(CarteManaC== i/3+1){
			rezultat="castigat";
            window.open("./sfarsit.html", "_self");
		}

	   else astepareTragereCarteCalculator();
        g.style.display="none";
		return copii[i].id;
		
    }
	else
		alert("Nu ati ales carte");
}

function PreotJ(){
	
	setTimeout(function(){
		document.getElementById("a_m").removeChild(document.getElementById("a_m_img"));
	var t1=document.getElementById("a_m");	
    x1 =corelare_Carte_Vector(CarteManaC);
	t1.appendChild(x1);
	x1.setAttribute("id", "a_m_img");
	},200);
   	/*document.getElementById("a_m").removeChild(document.getElementById("a_m_img"));
	var t1=document.getElementById("a_m");	
    x1 =corelare_Carte_Vector(CarteManaC);
	t1.appendChild(x1);
	x1.setAttribute("id", "a_m_img");
	*/
	setTimeout(function(){document.getElementById("a_m").removeChild(document.getElementById("a_m_img"));
						var t2=document.getElementById("a_m");	
						var x2 =spate();
						t2.appendChild(x2);
						x2.setAttribute("id", "a_m_img");
							
						},800);
	setTimeout(function(){astepareTragereCarteCalculator();},1000);
}

function BaronJ(){
	document.getElementById("a_m").removeChild(document.getElementById("a_m_img"));
	var t1=document.getElementById("a_m");	
    x1 =corelare_Carte_Vector(CarteManaC);
	t1.appendChild(x1);
	x1.setAttribute("id", "a_m_img");
	
	setTimeout(function(){document.getElementById("a_m").removeChild(document.getElementById("a_m_img"));
						var t2=document.getElementById("a_m");	
						var x2 =corelare_Carte_Vector(CarteManaC);
						t2.appendChild(x2);
						x2.setAttribute("id", "a_m_img");
							
						},800);
	if(CarteManaC < CarteManaJ)
		setTimeout(function(){
            window.open("sfarsitCastigat.html", "_self");
        },1000);
	if(CarteManaC > CarteManaJ)
		setTimeout(function(){
            window.open("sfarsitPierdut.html", "_self");
        },1000);
	if(CarteManaC == CarteManaJ){
		CarteAflata=CarteManaC;
		astepareTragereCarteCalculator();
	}
	
}

function CameristaJ(){
    cameristaJ=true;
	setTimeout(function(){astepareTragereCarteCalculator();},200);
}

function PrintJ(){
	if(CarteManaC==8){
        window.open("sfarsitCastigat.html", "_self");
    }
	else{
		var t=document.getElementById("a_j");
		if(a2aRunda==1){
			setTimeout(function(){t.removeChild(document.getElementById("a_j_img"));},200);			
		}
		var x =corelare_Carte_Vector(CarteManaC);
		setTimeout(function(){t.appendChild(x);},300);
		x.setAttribute("id", "a_j_img");		

		document.getElementById("a_m").removeChild(document.getElementById("a_m_img"));
		setTimeout(function(){
							t1=document.getElementById("a_m");	
							x1 =spate();
							CarteManaC=pachet[indexPachet];
							indexPachet+=1;
							t1.appendChild(x1);
							x1.setAttribute("id", "a_m_img");
							setTimeout(function(){astepareTragereCarteCalculator();},400);							
							},600);
		a2aRunda=1;
	}
}

function RegeJ(){
	
	var m=CarteManaC;
	CarteManaC=CarteManaJ;
	CarteManaJ=m;
	CarteAflata=m;
	document.getElementById("a_m").removeChild(document.getElementById("a_m_img"));
	var t1=document.getElementById("a_m");	
    var x1 =spate();
	t1.appendChild(x1);
	x1.setAttribute("id", "a_m_img");
	
	document.getElementById("j_m").removeChild(document.getElementById("j_m_img"));
	var t2=document.getElementById("j_m");	
	var x2 =corelare_Carte_Vector(CarteManaJ);
	t2.appendChild(x2);
	x2.setAttribute("id", "j_m_img");
	setTimeout(function(){astepareTragereCarteCalculator();},200);
}

function ContesaJ(){
	setTimeout(function(){astepareTragereCarteCalculator();},200);	
}

function PrintesaJ(){
    window.open("sfarsitPierdut.html", "_self");
}

function actiuneJ(CarteJucata){
	switch (CarteJucata) {

		case 1:
			GardianaJ();
			break;

		case 2:
			PreotJ();
			break;

		case 3:
			BaronJ();
			break;

		case 4:
			CameristaJ();
			break;

		case 5:
			PrintJ();
			break;

		case 6:
			setTimeout(function(){RegeJ();},600);
			break;

		case 7:
			ContesaJ();
			break;

		case 8:
			PrintesaJ();
	}	
}

function GardianaC(){// de facut mai frumusel
	var a;
	if(CarteAflata<=1){
		a=getRndInteger(2, 8);
	}
	else {
		a=CarteAflata;
		CarteAflata=0;
	}
	
    var gg=document.getElementById("gardian_ghiceste");
    gg.innerHTML="Adversarul te-a intrebat daca esti "+a;
    
    gg.style.display="block";
    
    setTimeout(function(){gg.style.display="none";}, 1800);
	
	if(a==CarteManaJ)
		setTimeout(function(){
            window.open("sfarsitPierdut.html", "_self");
        },1000);
	 
	
}

function PreotC(){ //de facut mai frumusel
	CarteAflata=CarteManaJ;
	var gg=document.getElementById("gardian_ghiceste");
    gg.innerHTML="Adversarul se uita la cartea ta:<br><br>";
    
    var carte=document.createElement("img");
    carte.src=document.getElementById("j_m_img").src;
    gg.appendChild(carte);
    
    
    gg.style.display="block";
    
    setTimeout(function(){gg.style.display="none";}, 3600);
	
}

function BaronC(){
	document.getElementById("a_m").removeChild(document.getElementById("a_m_img"));
	var t1=document.getElementById("a_m");	
    x1 =corelare_Carte_Vector(CarteManaC);
	t1.appendChild(x1);
	x1.setAttribute("id", "a_m_img");
	
	setTimeout(function(){document.getElementById("a_m").removeChild(document.getElementById("a_m_img"));
						var t2=document.getElementById("a_m");	
						var x2 =corelare_Carte_Vector(CarteManaC);
						t2.appendChild(x2);
						x2.setAttribute("id", "a_m_img");
							
						},800);
	if(CarteManaC < CarteManaJ)
		setTimeout(function(){
            window.open("sfarsitCastigat.html", "_self");
        },1200);
	if(CarteManaC > CarteManaJ)
		setTimeout(function(){
            window.open("sfarsitPierdut.html", "_self");
        },1200);
	if(CarteManaC == CarteManaJ)
		CarteAflata=CarteManaC;
}

function CameristaC(){
	cameristaC=true;
}

function PrintC(){
	if(CarteManaJ==8){
        window.open("sfarsitPierdut.html", "_self");
    }
	else{
		var t2=document.getElementById("j_j");
		t2.removeChild(document.getElementById("j_j_img"));			
		
		var x2 =corelare_Carte_Vector(CarteManaJ);
		t2.appendChild(x2);
		x2.setAttribute("id", "j_j_img");
		
		
		document.getElementById("j_m").removeChild(document.getElementById("j_m_img"));
		
		document.getElementById("pachet").removeEventListener("click", Joc);
		document.getElementById("pachet").addEventListener("click", Trage_p);
	}
}

function Trage_p(){
	t1=document.getElementById("j_m");	
		x1 =corelare_Carte_Vector(pachet[indexPachet]);
		CarteManaJ=pachet[indexPachet];
		indexPachet+=1;
		t1.appendChild(x1);
		x1.setAttribute("id", "j_m_img");
		document.getElementById("pachet").removeEventListener("click", Trage_p);
		document.getElementById("pachet").addEventListener("click", Joc);
}

function RegeC(){
	var m=CarteManaC;
	CarteManaC=CarteManaJ;
	CarteManaJ=m;
	CarteAflata=m;
	document.getElementById("a_m").removeChild(document.getElementById("a_m_img"));
	var t1=document.getElementById("a_m");	
    var x1 =spate();
	t1.appendChild(x1);
	x1.setAttribute("id", "a_m_img");
	
	document.getElementById("j_m").removeChild(document.getElementById("j_m_img"));
	var t2=document.getElementById("j_m");	
	var x2 =corelare_Carte_Vector(CarteManaJ);
	t2.appendChild(x2);
	x2.setAttribute("id", "j_m_img");
}

function ContesaC(){
	
}

function PrintesaC(){
    window.open("sfarsitCastigat.html", "_self");
}

function actiuneC(CarteJucata){
	switch (CarteJucata) {

		case 1:
			GardianaC();
			break;

		case 2:
			PreotC();
			break;

		case 3:
			BaronC();
			break;

		case 4:
			CameristaC();
			break;

		case 5:
			setTimeout(function(){PrintC();},1000);
			break;

		case 6:
			setTimeout(function(){RegeC();},1000);
			break;

		case 7:
			ContesaC();
			break;

		case 8:
			PrintesaC();
		
	}
	
}

function PrintSingurC(){
	
	if(CarteManaC==8){
		var t5=document.getElementById("a_m");
		setTimeout(function(){t5.removeChild(document.getElementById("a_m_img"));},200);			
		var x5 =corelare_Carte_Vector(CarteManaC);
		setTimeout(function(){t5.appendChild(x5);},300);
		x5.setAttribute("id", "a_m_img");
		setTimeout(function(){
            window.open("sfarsitCastigat.html", "_self");
        },800);
	}
	else{
		
		var t=document.getElementById("a_j");
		setTimeout(function(){t.removeChild(document.getElementById("a_j_img"));},600);			
		var x =corelare_Carte_Vector(CarteManaC);
		setTimeout(function(){t.appendChild(x);},800);
		x.setAttribute("id", "a_j_img");
		

		document.getElementById("a_m").removeChild(document.getElementById("a_m_img"));
		t1=document.getElementById("a_m");	
		x1 =spate();
		CarteManaC=pachet[indexPachet];
		indexPachet+=1;
		t1.appendChild(x1);
		x1.setAttribute("id", "a_m_img");
		a2aRunda=1;
						
	}
}

function actiuneSingurC(CarteJucata){
	//daca pune camerista jucatorul	
	if(CarteJucata==5){
		PrintSingurC();
		return 0;
	}
	if(CarteJucata==8){
		PrintesaC();
		return 0;
	}
	if(CarteJucata==4){
		cameristaC=true;
		return 0;
	}
	//alert("ceva");		
	var t=document.getElementById("a_j");
	if(a2aRunda==1){
	t.removeChild(document.getElementById("a_j_img"));			
	}
	var x =corelare_Carte_Vector(CarteManaC);
	setTimeout(function(){t.appendChild(x);},300);
	x.setAttribute("id", "a_j_img");
	return 0;
}

function actiuneSingurJ(CarteJucata){
	//daca pune camerista calculatorul
	if(CarteJucata==5){
		PrintC();
		setTimeout(function(){astepareTragereCarteCalculator();},200);
		return 0;
	}
	if(CarteJucata==8){
		PrintesaJ();
		return 0;
	}
	if(CarteJucata==4){
		cameristaJ=true;
		setTimeout(function(){astepareTragereCarteCalculator();},200);
		return 0;
	}
	var t3=document.getElementById("j_j");					
	if(a2aRunda==1){						
		setTimeout(function(){t3.removeChild(document.getElementById("j_j_img"));},200);			
	}
	var x3 =corelare_Carte_Vector(CarteJucata);
	t3.appendChild(x3);
	x3.setAttribute("id", "j_j_img");		
	setTimeout(function(){astepareTragereCarteCalculator();},200);	
    return 0;	
}

