
const selectCategory = document.getElementById("category");
const selectLanguage = document.getElementById("language");
const selectBlackFlags = document.getElementById("blackFlags");
const selectType = document.getElementById("type");
const selectAmount = document.getElementById("amount");
const consultarButton = document.getElementById("consultar");
const resultadoSingle= document.getElementById("single");
const resultadoSetup = document.getElementById("setup");
const resultadoDelivery = document.getElementById("delivery");

       
consultarButton.addEventListener("click", function () {                        
const opcionCategory = selectCategory.value;
const opcionLanguage = selectLanguage.value;
const opcionType = selectType.value
const opcionAmount = selectAmount.value

const checkboxesBlackFlags = selectBlackFlags.querySelectorAll('input[type="checkbox"]');
const opcionBlackFlags = [];
  
checkboxesBlackFlags.forEach(checkbox => {
   if(checkbox.checked){
       opcionBlackFlags.push(checkbox.value)
   }
});

consultarAPI(opcionCategory, opcionLanguage, opcionBlackFlags, opcionType, opcionAmount);

   });

 const apiUrl = 'https://v2.jokeapi.dev/joke/';

   
 function consultarAPI(category, language, blackflags, type, amount) {
     fetch(apiUrl + category + language + blackflags + type + amount)
        .then(response => {
             if (!response.ok) {
                   throw new Error('La solicitud no fue exitosa');
               }
               return response.json();
           })
        .then(data => {
                
                   resultadoSingle.textContent = JSON.stringify(data.joke);   
                   console.log(data.joke);                     
                   resultadoSetup.textContent = JSON.stringify(data.setup);
                   console.log(data.setup);  
                   resultadoDelivery.textContent = JSON.stringify( data.delivery);
                   console.log(data.delivery);                             
          })
        /*   .catch(error => {
               resultadoDiv.textContent = 'Error al consultar la API: ' + error;
           });*/
   }