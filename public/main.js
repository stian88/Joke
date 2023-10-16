
const selectCategory = document.getElementById("category");
const selectLanguage = document.getElementById("language");
const selectBlackFlags = document.getElementById("blackFlags");
const selectType = document.getElementById("type");
const selectAmount = document.getElementById("amount");
const consultarButton = document.getElementById("consultar");
const resultSingle= document.getElementById("single");
const resultSetup = document.getElementById("setup");
const resultDelivery = document.getElementById("delivery");

       
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

separate(optionAmount);

function separate (Words){

    const separateWords = Words.split(","); 
    const numberWord = parseInt(separateWords[1]);
    
    consultarAPI(optionCategory, optionLanguage, optionBlackFlags, optionType, optionAmount, 
                 numberWord);
}
   });

 const apiUrl = 'https://v2.jokeapi.dev/joke/';

   
 function consultarAPI(category, language, blackflags, type, amount, numberAmount) {

     fetch(apiUrl + category + language + blackflags + type + amount)
        .then(response => {
             if (!response.ok) {
                   throw new Error('La solicitud no fue exitosa');
               }
               return response.json();
           })
        .then(data => { 
            
                 if (amount=== " "){
                    resultSingle.textContent = JSON.stringify(data.joke);
                    resultSetup.textContent = JSON.stringify(data.setup);
                    resultDelivery.textContent = JSON.stringify(data.delivery);
                    console.log(data.joke);  
                    console.log(data.setup);
                    console.log(data.delivery);

                 } else {

                 if(type === "&type=single"){
                 
                 for (let index = 0; index < numberAmount ; index++) {
                    resultSingle.textContent = JSON.stringify(data.jokes[index].joke);
                    console.log(data.jokes[index].joke);  

                  } } else {

                   for (let index = 0; index < numberAmount; index++) {
                    resultSetup.textContent = JSON.stringify(data.jokes[index].setup);
                    resultDelivery.textContent = JSON.stringify(data.jokes[index].delivery);
                    console.log(data.jokes[index].setup);
                    console.log(data.jokes[index].delivery);
                }} 
         } })
        /*   .catch(error => {
               resultadoDiv.textContent = 'Error al consultar la API: ' + error;
           });*/
   }