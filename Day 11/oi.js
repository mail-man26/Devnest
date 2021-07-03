var skip = document.getElementById('skip');
var score = document.getElementById('score');
var totalScore = document.getElementById('totalScore');
var countdown = document.getElementById('countdown');
var count = 0;
var scoreCount = 0;
var duration = 0;

var quizset = document.querySelectorAll('.quiz_set');
var quizAnsRow = document.querySelectorAll('.quiz_set .quiz_ans_row input');

skip.addEventListener('click', function(){
    step();
})

quizAnsRow.forEach(function(quizAnsRowSingle){
    quizAnsRowSingle.addEventListener('click', function(){
        setTimeout(function(){
            step();
            duration=10;
        },500)

        var valid = this.getAttribute("valid");
        if(valid == "valid"){
            scoreCount += 10;
            score.innerHTML = scoreCount;
            totalScore.innerHTML = scoreCount;
        }
        else{
            
            score.innerHTML = scoreCount;
            totalScore.innerHTML = scoreCount;

        }
    })
});

function step() {
    count += 1;
    for(var i=0; i<quizset.length;i++)
    {
        quizset[i].className = 'quiz_set';
    }
    quizset[count].className = 'quiz_set active';
    if(count == 5)
    {
        skip.style.display = 'none';
        clearInterval(durationTime);
        countdown.innerHTML = 0;
    }
}

var durationTime = setInterval(function(){
    if(duration == 10)
    {
        duration = 0;
    }
    duration += 1;
    countdown.innerHTML = duration;
    if(countdown.innerHTML == "10")
    {
        step()
    }
},1000);