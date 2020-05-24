"use strict";

var i = 1;
var j = 1;
var size;
var t = 0;
var qtd,name,price;
function html2pdf(){
	html2canvas(document.getElementById("border"), {
	            onrendered: function (canvas) {
	                var data = canvas.toDataURL();
	                var docDefinition = {
	                    content: [{
	                        image: data,
	                        width: 500,
	                    }]
	                };
	                pdfMake.createPdf(docDefinition).download("Score_Details.pdf");
	            }
	        });
}

function jspdf2(){
	html2canvas(document.getElementById("border")).then(function(canvas){
	var imgdata = canvas.toDataURL('image/png');
	var doc = new jsPDF();
	doc.addImage(imgdata,'PNG',10,10);
	doc.save("sample.pdf");
});
}


function clonarLinha(){
	var elemento = document.getElementsByClassName("container-item");
	var clone_elemento = elemento[0].cloneNode(true);
	var campo = document.getElementById("itens-rows");
	clone_elemento.id = "item"+j;	
	var qtd_elemento = clone_elemento.children[1];
	var name_elemento = clone_elemento.children[0];
	var price_elemento = clone_elemento.children[2];
	var final_elemento = clone_elemento.children[3];
	qtd_elemento.id = "qtd"+j;
	name_elemento.id = "name"+j;
	price_elemento.id = "price"+j;
	final_elemento.id = "final"+j;
	campo.appendChild(clone_elemento);
	j= j +1;
	if (j===size){
		gerarOrcamento();
	}
	else{
		clonarLinha();
	}
}

function gerarOrcamento(){
		qtd = document.getElementById("quantidade-item"+t).value;
		name = document.getElementById("descricao-item"+t).value;
		name = name.toUpperCase();
		price= document.getElementById("preco-item"+t).value;
		if(qtd<10){
			document.getElementById("qtd"+t).innerHTML = ("0"+qtd+ "     ");
		}
		else{
			document.getElementById("qtd"+t).innerHTML = (qtd+ "     ");
		}
		document.getElementById("name"+t).innerHTML = name;
		var calculo = qtd*price;
		document.getElementById("price"+t).innerHTML = "R$ "+price + ",00";
		document.getElementById("final"+t).innerHTML = "R$ "+calculo + ",00";
		t++;
		 if (t>=size){
		 	t = 0;
		 	var name_cliente = document.getElementById("cliente").value;
		 	name_cliente = name_cliente.toUpperCase();
			var dia_orc = document.getElementById("dia").value;
			document.getElementById("nome-cliente").innerHTML = "CLIENTE: "+name_cliente;
			document.getElementById("data").innerHTML = "DATA DE EMISSÃO: "+dia_orc;
		 	return ; 
		 }
		 gerarOrcamento();
}

function teste(){
	alert("o timeout funciona!!!");
}

function verificaClonarLinha(){
	size = document.getElementsByClassName("tbody-input").length;
	if (size>1){
		clonarLinha();
	}
	else{
		gerarOrcamento();
	}
}

function adicionarLinha() {
  var row = document.getElementsByTagName("tbody");
  var table = document.getElementById("table");
  var clone = row[1].cloneNode(true);
  clone.id = "linhaClonada" + i;
  var nome = clone.children[0].children[0].children[0];
  var quantd = clone.children[0].children[1].children[0];
  var preco = clone.children[0].children[2].children[0];
  var valor = clone.children[0].children[3];
  quantd.id  = "quantidade-item" + i;
  preco.id = "preco-item" + i;
  valor.id = "final-item" + i;
  nome.id = "descricao-item"+i;
  nome.value ="";
  quantd.value = "";
  preco.value = "";
  valor.value = "";
  table.appendChild(clone);
  i = i + 1;
}

var somaTotal = 0;
function calculaValor(numero){	
	var resultado = document.getElementById("quantidade-item" + numero).value * document.getElementById("preco-item" + numero).value;
	
	somaTotal = somaTotal+resultado;
	insereValor(resultado, numero,somaTotal);
}

function insereValor(resultado, k,somaTotal){
	document.getElementById("final-item" + k).innerHTML = "R$ " + resultado + ",00";
	document.getElementById("footerTotal").innerHTML = "Valor total: R$ " + somaTotal + ",00";
}

var str;
function elementoFocado(){
	str = document.activeElement.id;
}

function pegaSubSTR(){
	var substr = str.substr(10);
	calculaValor(substr);
}
