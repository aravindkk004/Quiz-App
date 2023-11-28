var questions = [
    { 
        question: " What does CSS stand for in web development?", 
        options: ["Creative Style Sheets","Cascading Style Sheets","Computer Style Sheets"," Colorful Style Sheets"], answer: "Cascading Style Sheets"
    },

    { 
        question: " Which programming language is used for creating dynamic and interactive web pages?", 
        options: [" HTML"," Python","JavaScripts"," CSS"], 
        answer: "JavaScripts" 
    },

    { 
        question: "What is the main purpose of HTML in web development?", 
        options: ["Styling web pages","CProviding interactivity","Structuring content"," Managing databases"], 
        answer: "Structuring content" 
    },

    { 
        question: "Which tag is used to define an unordered list in HTML?", 
        options: ["<ol>","<ul>","<li>","<dl>"], 
        answer: "<ul>" 
    },

    { 
        question: "What is the role of a 'div' element in HTML and CSS?", 
        options: ["Defines a hyperlink","Contains metadata about the document","Represents a thematic break between paragraphs"," Acts as a container to organize and style content"], 
        answer: " Acts as a container to organize and style content" 
    }
];

var questionNo = 1;
var startTime = 30;
var interval;
var mark = 0;
var btnCount = 0;

$(".start").click(function(){
    mark = 0;
    $(".result").removeAttr("id","restart");
    $(".beforeStart").addClass("disable");
    $(".wrapper").addClass("active");
    questionNo = 1;
    firstQuestion(questionNo);
    interval = setInterval(timeStart, 1000);
})

function timeStart(){
    startTime = startTime-1;
    if(startTime<10 && startTime>0){
        $(".timer").css("background-color",'red');
        $(".timer").text("00:0"+startTime);
    }
    else if(startTime>=10){
        $(".timer").css("background-color",'green');
        $(".timer").text("00:"+startTime);
    }
    else if(startTime==0){
        startTime = 30;
        questionNo++;
        firstQuestion(questionNo);
    }
}


function firstQuestion(questionNo){
    $(".questionNo").text(questionNo);
    $(".question").text(questions[questionNo-1].question)
    for(var i=1; i<=4; i++){
        $(".option"+i).text(questions[questionNo-1].options[i-1]);
    }
}

$(".option").click(function(){
    btnCount++;
    if(btnCount <=1){
        var id = $(this).attr("id");
        $(".submit").addClass("btnActive");
        validate(id);
        clearInterval(interval);
        $("li").css('cursor', 'no-drop');
    }    
})


function validate(id){
    var clickedAns = $(".option"+id).text();
    var crtAns = questions[questionNo-1].answer;
    var opt = questions[questionNo-1].options.indexOf(crtAns);
    if(crtAns === clickedAns){
        $("#"+id+" div").html('<i class="fa-solid fa-circle-check"></i>')
        mark++;
    }
    else{
        $("#"+id+" div").html('<i class="fa-solid fa-circle-xmark"></i>')
        $("#"+(opt+1)+" div").html('<i class="fa-solid fa-circle-check"></i>')
    }
}

$(".submit").click(function(){
    btnCount = 0;
    questionNo++;
    $(".validate").html('');
    $("li").css('cursor', 'pointer');
    $(".submit").removeClass("btnActive")
    startTime = 30;
    if(questionNo > 5){
        $(".mark").text(mark);
        $(".wrapper").removeClass("active");
        $(".result").attr("id","restart");
    }
    else{
        interval = setInterval(timeStart, 1000);
        firstQuestion(questionNo);
    }
})
