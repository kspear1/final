// Khalia Spear
// October 9, 2024
// Homework 3



console.log("Accessibility Rocks!");

$(document).ready(function () {
    $("*:not(body):not(p)").hover(
        function (ev) {
            // EXECUTED WHEN MOUSE ENTERS AN ELEMENT
            $(this).addClass("highlight");
            ev.stopPropagation();
            hoveredElement = $(this); 
        },
        function (ev) {
            // EXECUTED WHEN MOUSE EXITS AN ELEMENT
            $(".highlight").removeClass("highlight");
            speechSynthesis.cancel();
            hoveredElement = null;
        }
    );

    document.addEventListener('keydown', function (e) {
        if ((e.code === '' || e.code === 'Unidentified' || e.code === 'Space') && hoveredElement) {
            
            // Prevent default Space action (scrolling, etc.)
            e.preventDefault(); 
            console.log('Space Pressed!');

            // Do not trigger screen reader for p tags
            if (hoveredElement.is('p')) {
                return; 
            }

            //Speak alt text for images if it exists; speak the source if it doesn't
            if (hoveredElement.is('img')) {
                var alttext = hoveredElement.attr("alt");
                var srcofimg = hoveredElement.attr("src");

                if (alttext) {
                    speechSynthesis.speak(new SpeechSynthesisUtterance(alttext));
                } else {
                    speechSynthesis.speak(new SpeechSynthesisUtterance(srcofimg));
                }
            } else {
                const textToSpeak = hoveredElement.text();
                speechSynthesis.speak(new SpeechSynthesisUtterance(textToSpeak));
            }

        } else {
            // If Space is not pressed or no hovered element, remove highlight and cancel speech
            $(".highlight").removeClass("highlight");
            speechSynthesis.cancel();
        }
    });

        console.log("DOMContentLoaded fired!"); // Add this log
        // Get all the audio tracks
        const story1 = document.getElementById('story1');
        const story2 = document.getElementById('story2');
        const story3 = document.getElementById('story3');

        // Get the speed control elements
        const speedControl1 = document.getElementById('speedControl1');
        const speedControl2 = document.getElementById('speedControl2');
        const speedControl3 = document.getElementById('speedControl3');

        // Get the speed label elements
        const speedLabel1 = document.getElementById('speedLabel1');
        const speedLabel2 = document.getElementById('speedLabel2');
        const speedLabel3 = document.getElementById('speedLabel3');

        // Update playback speed based on user input
        speedControl1.addEventListener('input', function() {
            story1.playbackRate = speedControl1.value;
            speedLabel1.textContent = `${speedControl1.value}x`;
        });

        speedControl2.addEventListener('input', function() {
            story2.playbackRate = speedControl2.value;
            speedLabel2.textContent = `${speedControl2.value}x`;
        });

        speedControl3.addEventListener('input', function() {
            story3.playbackRate = speedControl3.value;
            speedLabel3.textContent = `${speedControl3.value}x`;
        });

        const audios = document.querySelectorAll('audio');

        // Add event listeners to each audio element
        audios.forEach(audio => {
            audio.addEventListener('play', function() {
                // Stop all other audio elements when a new one starts playing
                audios.forEach(otherAudio => {
                    if (otherAudio !== audio) {
                        otherAudio.pause();
                        otherAudio.currentTime = 0; // Reset the other audio to the start
                    }
                });
            });
        });

        //Button for Light and Dark Modes
        const switcher = document.querySelector('.btn');
        const switchImg = document.querySelector('.image');

        switcher.addEventListener('click', function(){
        document.body.classList.toggle('dark-theme')

        var className = document.body.className;
        if(className == "light-theme"){
            this.textContent = "Dark Mode";
            switchImg.src = "afrofutures.png";
        }else{
            this.textContent = "Light Mode";
            switchImg.src = "afropic2.jpeg";
        }

    });
});

