const sideNavigation = document.querySelector(".sideNavigation"),
 sideBarToggle = document.querySelector(".fa-bars"),
 startContentUI = document.querySelector(".startContent ul"),
 inputArea = document.querySelector(".inputArea input"),
 sendRequest = document.querySelector(".fa-paper-plane"),
 chatHistory = document.querySelector(".chatHistory ul"),
 startContent = document.querySelector(".startContent"),
 chatContent = document.querySelector(".chatContent"),
 results = document.querySelector(".results");

 promptQuestions = [
    {
        question:"Write a thank you note to my employees",
        icon:"fa-solid fa-wand-magic-sparkles",
    },
    {
        question:"Create react code for creating book app",
        icon: "fa-solid fa-code",
    },
    {
        question:"How to become a full stack developer",
        icon:"fa-solid fa-laptop-code",
    },
    {
        question:"How to become a backend developer",
        icon:"fa-solid fa-database",
    },
 ];

 window.addEventListener("load", () => {
    promptQuestions.forEach((data) => {
       let item = document.createElement("li");
       item.addEventListener("click",() => {
        getGeminiResponse(data.question, true);
       });

       item.innerHTML= `<div class="promptSuggestion">
       <p>${data.question}</p>
       <div class="icon"><i class="${data.icon}"></i><div>
       </div>`;

       startContentUI.append(item);
    });
 });

 sideBarToggle.addEventListener("click", () => {
       sideNavigation.classList.toggle("expandClose");
 })

 inputArea.addEventListener("keyup", (e) => {
       if(e.target.value.length> 0){
        sendRequest.style.display = "inline";
       }else{
        sendRequest.style.display = "none";
       }
 });


   sendRequest.addEventListener("click", () => {
     getGeminiResponse(inputArea.value, true);
 });

   const generateAPIResponse = async (resultData) => {
    const textElement = resultData.querySelector(".text");

    try{
        const response = await fetch(API_URL, {
            method:"POST",
            headers: {"content-Type": "application/json"},
            body: JSON.stringify({
                contents: [{
                    role:"user",
                    parts:[{text: question}]
                }]
            })
        });

        const data = await response.json();

        const apiResponse = data?.candidates[0].content.parts[0].text;
        textElement.innerHTML = apiResponse;
    }catch (error){
         console.log(error);
    }finally{
        resultData.classList.remove("loading")
    }
   }




 
 function getGeminiResponse(question, appendHistory){
    console.log(question);
    if(appendHistory){

    let historyLi = document.createElement("li");
    historyLi.addEventListener("click", () => {
        getGeminiResponse(question, false);
    });
    historyLi.innerHTML = `<i class="fa-regular fa-message"></i>${question}`;
    chatHistory.append(historyLi);
}

    results.innerHTML="";
    inputArea.value="";

    startContent.style.display="none";
    chatContent.style.display="block";

    let resultTitle = `
    <div class="resultTitle"> 
    <img src="images/Gemini logo.webp"/>
    <p>${question}</p>
    </div>`;

    let resultData=`
       <div class="resultData">
         <img src="images/Gemini logo.webp" />

         <div class="loader">
         <div class="animatedBG"></div>
         <div class="animatedBG"></div>
         <div class="animatedBG"></div>
         </div>
       </div>
      `;

      results.innerHTML += resultTitle;
      results.innerHTML += resultData;


      //API configuration
      const API_KEY = " AIzaSyD1q6RZ4Vi9WMvmEonaZlinJRXjSQcEF7k ";
      const API_URL =  `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;
    
      

    //const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyD1q6RZ4Vi9WMvmEonaZlinJRXjSQcEF7k`
       //fetch(apiUrl,{
       //method: "POST",
       //body: JSON.stringify({
           // contents: [{ parts: [{ text: question }] }], 
        //}),
   // })
    //.then((response) => response.json())
   // .then((data) => {

   


          //document.querySelector(".results .resultData").remove

   // let responseData = jsonEscape(data.candidate[0].content.parts[0].text)
    //console.log(responseData);

   // let responseArray = responseData.split("**");
   // let newResponse="";

    //for (let i = 0; i < responseArray.length; i++) {
       // if(i==0 || i%2!==1){
           // newResponse+=responseArray[i];
        //}else{
           // newResponse+= 
           // "<strong>" + 
           // responseArray[i].split("").join("&nbsp") + "</strong>";
      //  }   
   // }
   // let newResponse2 = newResponse.split("*").join(" ");

   // let textArea = document.createElement("textarea");
   // textArea.innerHTML = newResponse2;
    

           // results.innerHTML += `
           // <div class = "resultResponse">
               // <img 
               // src="../images/Gemini logo.webp">
                //<p id="typeEffect"></p>
           // </div>
           // `;

           // let newResponseData = newResponse2.split(" ");
           // for (let j = 0; j < newResponseData.length; j++) {
           // timeOut(j, newResponseData[j]+ " ");
                
           // }
        
   // });
 }

 const timeOut = (index, nextWord) => {
    setTimeout(function(){
        document.getElementById("typeEffect").innerHTML += nextWord;
    }, 75 * index);
 }

 function newChat(){
    startContent.style.display = "block";
    chatContent.style.display = "none";
 }

 function jsonEscape(str){
    return str
    .replace(new RegExp("\r?\n\n", "g"), "<br>")
    .replace(new RegExp("\r?\n", "g"), "<br>");
 }




 //'package:google_generative_ai/google_generative_ai.dart';
 //`final model = GenerativeModel
 // model: 'gemini-1.5-flash',
 // apiKey: apiKey,`


 //AIzaSyD1q6RZ4Vi9WMvmEonaZlinJRXjSQcEF7k
 //