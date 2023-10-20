/*Referencias a los elementos HTML*/
const selectCategory = document.getElementById("category");
const selectLanguage = document.getElementById("language");
const selectBlackFlags = document.getElementById("blackFlags");
const selectType = document.getElementById("type");
const selectAmount = document.getElementById("amount");
const consultarButton = document.getElementById("consultar");
const resultSingle= document.getElementById("single");
const resultSetup = document.getElementById("setup");
const resultDelivery = document.getElementById("delivery");
const resultJokeViewer = document.getElementById("jokeViewer");

/* Escucha el llamado del boton y se capturan las opciones seleccionadas*/       
consultarButton.addEventListener("click", function () {                        
const optionCategory = selectCategory.value;
const optionLanguage = selectLanguage.value;
const optionType = selectType.value;
const optionAmount = selectAmount.value;
const checkboxesBlackFlags = selectBlackFlags.querySelectorAll('input[type="checkbox"]');
const optionBlackFlags = [];  
checkboxesBlackFlags.forEach(checkbox => {
   if(checkbox.checked){
    optionBlackFlags.push(checkbox.value)
   }
});

/*Separa las partes de Amount*/
separate(optionAmount);

function separate (Words){

    const separateWords = Words.split(",");
    const optionA = separateWords[0];
    const wordNumber = parseInt(separateWords[1]);
    
    consultarAPI(optionCategory, optionLanguage, optionBlackFlags, optionType, optionA, 
                 wordNumber);
    }
   });

/*URL base a la API*/ 
 const apiUrl = 'https://v2.jokeapi.dev/joke/';

 /*Funcio donde se agregarn a la ruta base los parametros necesarias para el tipo de chiste solicitado y se hace la consulta a la API*/  
 function consultarAPI(category, language, blackflags, type, amount, number){ 

     fetch(apiUrl + category + language + blackflags + type + amount)
        .then(response => {
             if (!response.ok) {
                   throw new Error('La solicitud no fue exitosa');
               }
               return response.json();
           })
        .then(data => {
            viewJokes(data, amount, number, type);            
              })
            }

/*Funcion para imprimir en pantalla los chistes*/
 function viewJokes(data, option, numbers, types){    

                    if (option === " "){ 
                      var newdiv = document.createElement("div");
                      newdiv.textContent = JSON.stringify(data.joke);
                      document.getElementById("jokeViewer").appendChild(newdiv);

                      var newdiv = document.createElement("div");                      
                      newdiv.textContent = JSON.stringify(data.setup);
                      document.getElementById("jokeViewer").appendChild(newdiv);
                      var newdiv = document.createElement("div");
                      newdiv.textContent = JSON.stringify(data.delivery);
                      document.getElementById("jokeViewer").appendChild(newdiv);
    
                 } else {
    
                 if(types === "&type=single"){
                   for (let index = 0; index < numbers ; index++) {                    
                      var newdiv = document.createElement("div");
                      newdiv.textContent = JSON.stringify(data.jokes[index].joke);
                      document.getElementById("jokeViewer").appendChild(newdiv); 
                      }   

                  } else {
    
                   for (let index = 0; index < numbers; index++) {
                     var newdiv = document.createElement("div");
                     newdiv.textContent = JSON.stringify(data.jokes[index].setup);
                     document.getElementById("jokeViewer").appendChild(newdiv);
                     var newdiv = document.createElement("div");
                     newdiv.textContent = JSON.stringify(data.jokes[index].delivery);
                     document.getElementById("jokeViewer").appendChild(newdiv);
                     }
                    } 
                   } 
                  }
                 
              
  