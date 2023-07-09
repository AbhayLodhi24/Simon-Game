var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0 ;
var started = false ;

$(document).keypress(function (){
    if(!started){
        $("#level-title").text("Level " + level); 
        nextSequence();
        started = true ;
    }
} );

function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber] ;   
    gamePattern.push(randomChosenColour);
    // console.log(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); ;
   playSound(randomChosenColour);
   level++;
   $("#level-title").text("Level "+level);
}


// nextSequence();

$(".btn").click(function (){
    var userChosenColour = $(this).attr("id") ;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
    // console.log(gamePattern);
    // console.log(userClickedPattern);
    
});

function playSound(name)
{
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
}

function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function (){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel])
    {
        // console.log("Success");
        if(gamePattern.length === userClickedPattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else
    {
        // console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver()
{
    level = 0 ;
    gamePattern = [];
    $("#level-title").text("Press A Key to Start");
    started = false ;
}