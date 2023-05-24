const root = document.getElementById("root");
const timerElement = document.querySelector(".timer");

const imgSrcs = [
                    "./images/istockphoto-968475622-612x612.jpg","./images/istockphoto-968475622-612x612.jpg",
                     "./images/istockphoto-868646936-612x612.jpg","./images/istockphoto-868646936-612x612.jpg",
                    "./images/istockphoto-944585158-612x612.jpg","./images/istockphoto-944585158-612x612.jpg",
                     "./images/istockphoto-1083322640-612x612.jpg", "./images/istockphoto-1083322640-612x612.jpg",
                    "./images/istockphoto-1152113369-612x612.jpg","./images/istockphoto-1152113369-612x612.jpg",
                     "./images/istockphoto-1168998642-612x612.jpg", "./images/istockphoto-1168998642-612x612.jpg",
                    "./images/istockphoto-1097490360-612x612.jpg","./images/istockphoto-1097490360-612x612.jpg",
                     "./images/istockphoto-833591044-612x612.jpg", "./images/istockphoto-833591044-612x612.jpg",
                    
                ];


let boxSize = 0;
let currentSrc = "";
let clickCount = 0;
let id = 0;
let timerInterval;

function startGame(){
   

    const container = document.createElement("div");
    container.className = "startGame";

    const h1 = document.createElement("h1");
    h1.innerText = "Enter box count ";
   

    const myNumber = document.createElement("input");

    myNumber.setAttribute("type", "number");
    myNumber.setAttribute("class", "myNumber");
    myNumber.setAttribute("min", "2");
    myNumber.setAttribute("step", "2");
    myNumber.setAttribute("max", "4");
    myNumber.setAttribute("placeholder", "2 or 4");
    


    const btn = document.createElement("button");
    btn.className = "start";
    btn.innerHTML = "START";
    

    container.appendChild(h1);
    container.appendChild(myNumber);
    container.appendChild(btn);

    root.appendChild(container)
    
    return  container ;


}

startGame();

function gameSkeleton(boxCount){


        timerInterval = setInterval(updateTimer, 1000);
    
        const createdImages = [];


        const container = document.createElement("div");
        container.className = "gameSkeleton";
        
        boxCount = document.querySelector("input").value;
        
        boxSize = document.querySelector("input").value * document.querySelector("input").value ;

        if( boxCount != "2" && boxCount != "4"){

            alert("enter 2 or 4");
            
            location.reload();
            return;
            
        }



        document.querySelector(".startGame").remove();
        
        for(let j = 0; j < boxCount; ++j){
            
            const div = document.createElement("div");
            
            for(let i = 0; i < boxCount ; ++i){
                
                div.appendChild( createEmptyDiv(createdImages) );
                
            }
             
            container.appendChild(div);
   
        }

        
        root.appendChild(container);

        toImg(createdImages)

        return  container;
  
    
};



function createEmptyDiv(arr){
    
    const emptyDiv = document.createElement("div");
    emptyDiv.className = "emptyDiv";

    const img = document.createElement("img");
    img.className = "animal";

    
    emptyDiv.appendChild(img);
    
    arr.push({id:id++, div:emptyDiv});


    img.src = randomSrc(arr);
    
    return emptyDiv;
};



function toImg(arr){

    let currenntId;

    arr.forEach(element => {

        
        
        element.div.addEventListener("click", (e)=>{
            

            if( clickCount == 0 ){
                
                e.target.style.opacity = "1";
                currentSrc = e.target.src;
                currenntId = element.id;
                clickCount++;
                element.div.style.pointerEvents = "none";
                
                

            }else if(currentSrc == e.target.src){

                e.target.style.opacity = "1";
                clickCount  = 0;
                clearInterval(timerInterval);
                seconds = 9;
                timerInterval = setInterval(updateTimer, 1000);
                element.div.style.pointerEvents = "none";                
                gameWin(arr);

            }else{

                clearInterval(timerInterval);
                seconds = 9;
                timerInterval = setInterval(updateTimer, 1000);

                e.target.style.opacity = "1";

                setTimeout(function(){

                e.target.style.opacity = "0";
                
                for(const key in arr){

                    if( arr[key].id == currenntId){

                        arr[key].div.lastChild.style.opacity = "0";
                        arr[key].div.lastChild.style.pointerEvents = "auto"

                        clickCount = 0;

                    };
                 };
               },500);

               gameWin(arr)
            };          
        });
    });
      
};



function randomSrc(arr){

    // const src = imgSrcs[Math.floor(Math.random() * Math.pow(arr.length, 0.5))];
    // indexes.push(src);
    
          let src = imgSrcs[Math.floor(Math.random() * boxSize )];

          boxSize -=1;

          imgSrcs.splice(imgSrcs.indexOf(src), 1);

          return src;

}



let seconds = 9;

function updateTimer() {
    
  timerElement.textContent = seconds;

  seconds--;

  if (seconds < 0) {
    clearInterval(timerInterval);
    timerElement.textContent = "GAME OVER";
    timerElement.style.fontSize = "100px"
    document.querySelector(".gameSkeleton").remove();
    
    setTimeout(function(){

        location.reload()

    },2000)
   
  }
}



function gameWin(arr){
    
    
    for(const key in arr){
        
        if( arr[key].div.lastChild.style.opacity !== "1"){
            
            return 0;
            
        }
        
    }


    timerElement.textContent = "YOU WIN";
    timerElement.style.fontSize = "100px"

    clearInterval(timerInterval);

    
    setTimeout(function(){
        
        document.querySelector(".gameSkeleton").remove();
        location.reload()

    },2000)

}




document.querySelector("button").addEventListener("click", gameSkeleton);






 
