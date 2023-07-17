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