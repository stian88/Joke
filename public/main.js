
const selectCategory = document.getElementById("category");
const selectLanguage = document.getElementById("language");
const selectBlackFlags = document.getElementById("blackFlags");
const selectType = document.getElementById("type");
const selectAmount = document.getElementById("amount");
const consultarButton = document.getElementById("consultar");
const resultSingle1= document.getElementById("single1");
const resultSingle2= document.getElementById("single1");
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
    const optionA = separateWords[0];
    const wordNumber = parseInt(separateWords[1]);
    
    consultarAPI(optionCategory, optionLanguage, optionBlackFlags, optionType, optionA, 
                 wordNumber);
}
   });

 const apiUrl = 'https://v2.jokeapi.dev/joke/';

   
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

 function viewJokes(data, option, numbers, types){    

                    if (option === " "){ 
                    resultSingle1.textContent = JSON.stringify(data.joke);
                    resultSetup.textContent = JSON.stringify(data.setup);
                    resultDelivery.textContent = JSON.stringify(data.delivery);
                    console.log(data.joke);  
                    console.log(data.setup);
                    console.log(data.delivery);
    
                 } else {
    
                 if(types === "&type=single"){
                   for (let index = 0; index < numbers ; index++) {                
                    const singleVar = [];
                    const json = JSON.stringify(data.jokes[index].joke);
                    resultSingle1.innerHTML = JSON.stringify(data.jokes[index].joke);                
                    console.log(data.jokes[index].joke);                      }   

                  } else {
    
                   for (let index = 0; index < numbers; index++) {
                    resultSetup.textContent = JSON.stringify(data.jokes[index].setup);
                    resultDelivery.textContent = JSON.stringify(data.jokes[index].delivery);
                    console.log(data.jokes[index].setup);
                    console.log(data.jokes[index].delivery);
                     }
                    } 
                   } 
                  }
                 
              
  