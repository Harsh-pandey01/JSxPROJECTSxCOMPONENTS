const startBtn = document.querySelector('.start-btn')
const stopBtn = document.querySelector('.stop-btn')
const pauseBtn = document.querySelector('.pause-btn')
const inputs = document.querySelectorAll('.input');

let timerId ;


// fucntion to set the input values

(function (){
    const hrsInput = inputs[0]
    const minsInput= inputs[1]
    const secsInput = inputs[2]

    secsInput.addEventListener('change',(e)=>{

        if(e.target.value >= 60){
            minsInput.value = Math.floor(e.target.value / 60)
            e.target.value = (e.target.value%60)
        }
        
    })

    minsInput.addEventListener('change',(e)=>{

        if(e.target.value >= 60){
            hrsInput.value = Math.floor(e.target.value / 60)
            e.target.value = (e.target.value%60)
        }
        
    })


})()


// Function to set the current date

function setCurrentDate(){
    const dateWrapper = document.querySelector('.date')

    const monthShortName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const date = new Date()
    let todaysDate = date.getDate();
    let currentMonthNumber = date.getMonth();
    let currentYear = date.getFullYear()

    dateWrapper.innerHTML = `
    ${todaysDate} ${monthShortName[currentMonthNumber]} ${currentYear}
    `
    
}
setCurrentDate()


                   // Fnction to start the alarm

function startAlarm(){

    let hrs = inputs[0].value;
    let mins =inputs[1].value;
    let secs =inputs[2].value;

    timerId = setInterval(()=>{

        // Check if time ends
        if(hrs == 0 && mins == 0 && secs == 0){
            clearInterval(timerId)
        }

        if(secs > 0){
            --secs;
            if( secs<10){
                secs = secs.toString();
                secs = "0" + secs;
            }
            
        }else if(secs==0){
            
            if(mins > 0){
                --mins;

                if( mins<10){
                    mins = mins.toString();
                    mins = "0" + mins;
                }


                secs = 59 ;
            }else if(mins == 0){
                if(hrs > 0){
                    --hrs ;
                    if( hrs<10){
                        hrs = hrs.toString();
                        hrs = "0" + hrs;
                    }
                    mins = 59 ;
                    secs = 59
                }else{
                    clearTimeout(timerId)
                }
            }
        }

        inputs[0].value = hrs ;
        inputs[1].value = mins ;
        inputs[2].value = secs ;

    },1000)

}





startBtn.addEventListener('click',(e)=>{
    inputs.forEach(input => {
        input.setAttribute('readonly',"true")
    });

    startBtn.style.display = 'none'
    pauseBtn.style.display = 'block'
    startAlarm();
})
stopBtn.addEventListener('click',(e)=>{
    inputs.forEach(input => {
        input.removeAttribute('readonly')
    });

startBtn.style.display = 'block'
    pauseBtn.style.display = 'none'

    clearInterval(timerId)
    inputs[0].value = "" ;
    inputs[1].value = "" ;
    inputs[2].value = "" ;
})


pauseBtn.addEventListener('click',(e)=>{
    inputs.forEach(input => {
        input.setAttribute('readonly',"true")
    });

    clearInterval(timerId)
    startBtn.style.display = 'block'
    pauseBtn.style.display = 'none'
})





