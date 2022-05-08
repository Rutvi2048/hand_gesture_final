Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function takesnapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });

}

console.log("ml5 version: ",ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/ZAX6WQpds/model.json",modelLoaded); 

function modelLoaded()
{
    console.log("model loaded");
}

var prediction_1 = "";
var prediction_2 = "";

function speak()
{
 var synth = window.speechSynthesis;
 speak_data_1 = "this represent  "+prediction_1;
 var utterThis = new SpeechSynthesisUtterance(speak_data_1);
synth.speak(utterThis);
}

function check()
{
    img = document.getElementById("captured_image");
    console.log(classifier.classify(img,gotResult));
    classifier.classify(img, gotResult);
   
}

function gotResult(error ,results)
{
    if (error)
    {
        console.error(error);
    }else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction_1 = results[0].label;
        speak();
        
        if(results[0].label == "victory")
        {
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }
        if(results[0].label == "all the best")
        {
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
        if(results[0].label == "amazing")
        {
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
    }
}

