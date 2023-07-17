class Calculadora { 
   oTabelaPercetil  = {}; // dados da tabela percetil do IMC 

   IMC = (oUser) => { // Retorna um número flutante do calculo IMC, formula IMC = PESO/(ALTURA^2)
      return oUser.peso/(oUser.altura*oUser.altura)
   }

   saude = (oUser) => { // Função retorna como está o peso do cliente baseado no IMC, formula IMC = PESO/(ALTURA^2)
      let sIMC = "";
      if(this.IMC (oUser) < 18.5){
         sIMC  = "Abaixo do peso";
      }
      else if(this.IMC(oUser) < 24.9){
         sIMC  = "Peso normal";
      }
      else if(this.IMC(oUser) < 29.9){
         sIMC  = "Acima do peso"
      }
      else if(this.IMC(oUser) < 34.9){
         sIMC  = "Obesidade Grau 1"
      }
      else if(this.IMC(oUser) < 39.9){
         sIMC = "Obesidade Grau 2"
      }
      else{
         sIMC = "Obesidade Grau 3"
      }
      return sIMC // Retorna uma string, de como está o peso do cliente 
   }

   tableUserPercetil = (oUser) => { // função retorna os dados percetil baseado na IDADE e no tipo de SEXO
      let oPercetilRowUser = {}; 
      for (let i = 0; i < 10; i++) {
         if(oUser.sexo == "masculino" && this.oTabelaPercetil.masculino[i].idade == oUser.idade){
           oPercetilRowUser = this.oTabelaPercetil.masculino[i].tabela 
         }
         else if(oUser.sexo == "masculino" && (oUser.idade > 19 || oUser.idade < 10)){
           oPercetilRowUser = this.oTabelaPercetil.masculino[i].tabela
         }   
         
         if(oUser.sexo == "feminino" && this.oTabelaPercetil.feminino[i].idade == oUser.idade){
           oPercetilRowUser = this.oTabelaPercetil.feminino[i].tabela;
         }
         else if(oUser.sexo == "feminino" && (oUser.idade > 19 || oUser.idade < 10)){
           oPercetilRowUser = this.oTabelaPercetil.feminino[i].tabela
         }
     }
     return oPercetilRowUser // Retorna a linha da tabela percetil baseado na IDADE e no tipo de sexo do usuário
   }

   pesoUserPercetil = (oUser) => { // REALIZA OS CALCULO DO PERCETIL DO USUÁRIO 
      let pesoMax = Math.round(oUser.altura*oUser.altura * this.tableUserPercetil(oUser).P85);
      let pesoMin = Math.round(oUser.altura*oUser.altura * this.tableUserPercetil(oUser).P5);
      if(oUser.sexo == "masculino" && oUser.idade > 19){
         pesoMax-=4;
         pesoMin+=2
      }
      if(oUser.sexo == "feminino" && oUser.idade > 19) {
         pesoMax-=2;
         pesoMin+=4
      }
      let pesoAbaixoOuAcima = 0; // Quantidade que usuário precisa emagrecer ou encordar
      let emagrecerOuEncordar = ""; // reposta se precisa emagrecer ou encordar 
      if(oUser.peso > pesoMax){
          pesoAbaixoOuAcima = Math.round(oUser.peso - pesoMax);
          emagrecerOuEncordar = "emagrecer"
      }
      else if(oUser.peso < pesoMin){
          pesoAbaixoOuAcima  = Math.round(pesoMin - oUser.peso);
          emagrecerOuEncordar = "encordar"
      }
      return {pesoMax,pesoMin,emagrecerOuEncordar,pesoAbaixoOuAcima} // RETORNA PESO MÁXIMO E MINIMO QUE USUÁRIO DEVE TER EM PERCENTIL IMC
   }

   pesoIdeal (oUser) {
     return {
         "peso":oUser.peso,
         "pesoMax":this.pesoUserPercetil(oUser).pesoMax,
         "pesoMin":this.pesoUserPercetil(oUser).pesoMin,
         "emagrecerOuEncordar":this.pesoUserPercetil(oUser).emagrecerOuEncordar,
         "pesoAbaixoOuAcima":this.pesoUserPercetil(oUser).pesoAbaixoOuAcima,
         "saude":this.saude(oUser), // Busca como está o peso do usuário 
         "IMC":this.IMC(oUser) // Busca o calculo do IMC do usuário 
      };
   }
}


// Estou aprendendo a programar E fiz o meu melhor

const Calc = new Calculadora(); // cria objeto Calc com os métodos e atributos  

// Busca os dados do PERCETIL do IMC na localização pasta data no arquivo dataPercentil.js
const fechtDataPercetil = () => { // Os dados são colocado como atributo da class Calculadora
   Calc.oTabelaPercetil = tabelaPercetil // os dados será em forma de objeto 
}
 
const getLimpar = () => { // função de limpar todos os dados dos inputs
   let aInputText = document.querySelectorAll(".input-text"); // Pega todos os input da class input-text 
   for (let i = 0; i < aInputText.length; i++) {
      aInputText[i].value = ""; // Deixa o input sem valor 
   }
}

const DOM = (ID) => { // Retorna o elemento baseado no ID 
   return document.querySelector(ID) 
}

const sexo = () => { // Função que pega o tipo de sexo do usuário 
   let sSexo = ""; // Guarda o tipo de sexo do usuário 
   var aRadios = document.body.querySelectorAll("input[type='radio']"); // Busca o valor do input radio 
   for (let i = 0; i < aRadios.length; i++) {
      if(aRadios[i].checked){ // SE o input estiver checkado ENTÃO pego o sexo do usuário 
         sSexo = aRadios[i].value // Valor do input checkado 
      }
   }
   return sSexo // Retorna uma string, escrito feminino ou masculino 
}

const limparRes = (sTexto) => { // Limpa a resposta do PERCETIL 
   alert(sTexto);
   DOM("#dataIMC").innerHTML = "";
   DOM("#dataSaude").innerHTML = "";
   DOM("#result").innerHTML = "";
}


const getCalcular = () => { // Função de calcular as informações dos inputs 
   // Função receber um OBJETO com as informações dos inputs, retorna o peso minimo e maximo do usuário E quantidade SE precisar emagrecer OU Encordar SENÃO retorna quantidade 0 por que está saudável
   let oResultaUser = Calc.pesoIdeal({// na CLASS calculadora pego o método pesoIdeal que vai receber os valores do inputs 
      "altura":DOM("#altura").value,// O atributo ALTURA recebe o valor do input pelo ID altura
      "peso":DOM("#peso").value,// O atributo PESO recebe o valor do input pelo ID peso 
      "idade":DOM("#idade").value,// O atributo IDADE recebe o valor do input pelo ID idade
      "sexo":sexo()// O atributo sexo recebe o tipo de sexo do usuário pelo input radio
   });

   // SE algum input não estiver digitado vai ter o aviso para preencher o campo 
   if(DOM("#idade").value < 10){ // Avisa que não foi digitado altura
      limparRes("Idade não pode ser menor que 10, Digite novamente!")
   }
   else if(DOM("#idade").value == ""){ // Avisa que não foi digitado idade
      limparRes("Digite sua idade!");
   }
   else if( DOM("#peso").value == ""){ // Avisa que não foi digitado peso
      limparRes("Digite seu peso!");
   }
   else if(DOM("#altura").value == ""){ 
      limparRes("Digite sua altura!")
   }
   else{ // SENÃO MOSTRA A RESPOSTA DO CALCULO PERCENTIL 
      DOM("#dataIMC").innerHTML = "Seu IMC ficou em "+oResultaUser.IMC;
      DOM("#dataSaude").innerHTML = "Saúde: "+oResultaUser.saude;
      DOM("#result").innerHTML = 
         "Seu peso ideal deve ficar entre "+oResultaUser.pesoMin+
         " e "+oResultaUser.pesoMax+
         " precisa "+oResultaUser.emagrecerOuEncordar+" "+oResultaUser.pesoAbaixoOuAcima+" kg.";
   }
}

// Função valida input recebe proprio INPUT E um número inteiro que será partir de qual número terá "."
const validarInput = (oInput,iFlutuante) => { // EXEMPLO: digitou 170 terá array [1,7,0] e Iflutuante igual a 2, retornará array [1,7,".",0]
   let sTexto = oInput.value
   let aNovoTexto = [];
   for (let i = 0; i < sTexto.length; i++) {
      if(i == iFlutuante && sTexto[i] != "."){
         aNovoTexto.push(".")
      }
      aNovoTexto.push(sTexto[i])  
   }
   return aNovoTexto // novo array com "." 
}

// Função recebe um array contendo "." e retorna texto com número flutuante 
const textoCampo = (aNovoTexto) => { // Função que recebe o array com "." E retorna um texto contendo "." depois do número escolhido
   let sNovoTexto = "";
   aNovoTexto.map((sLetras)=>sNovoTexto+=sLetras)
   return sNovoTexto
}

// FUNÇÃO PEGA O VALOR DO INPUT EM TEMPO REAL DO USUÁRIO
// A função campo recebe proprio INPUT E um número inteiro que será iFlutuante que partir de qual número terá "." E iLimite é a quantidade de número que pode ser digitado no input 
const campo = (oInput,iFlutuante,iLimite) => { // EXEMPLO: digitou 170, SE a função campo ter iFlutuante igual a 1 ENTÃO o input terá 1.70, SE a função campo ter iFlutuante igual a 2 ENTÃO o input terá 17.0
   if(Number(oInput.value) && oInput.value.length <= iLimite){ // SE input for um número E abaixo do iLimite ENTÃO será acrescentado o "." no input 
      DOM(`#${oInput.id}`).value = textoCampo(validarInput(oInput,iFlutuante));
   }
   else{
      oInput.value = "" //  SENÃO usuário não digitou um número E digitou muitos números num campo terá o input limpado 
   }
}


