/**
 *  2024-02-23 texts adapted, css color (overlay, menu) set for internet explorer
 *  2024-02-22 start/end game (overlay), story, sounds
 *  2024-02-21 text engine, inventory
 *  2024-02-20 init
 * 
 * 
 *  Thanks to pixybay pictures and sounds!
 *  GNU public license
 * todos:
 * - language support
 */


let $ = (id) => document.getElementById(id);
const dly = 50;             // ms per letter of text

var story_next_stp = -1;
var progress = 0;
var timeout_ = 0;



function obj_bg() {
    $("txt").innerHTML = ("Ein Wald.<br> Erstmal viel grün... <br> Was war nur los? Mir ist so schwindlig. Und einen Durst hab ich. Sollte mich erstmal umsehen...");
    story_next(-1);
}

/*********** Menu        */
function btn_view() {
    if ($("btn_view").style.textShadow == "") {
        $("btn_view").style.textShadow = "0 0 15px #008cff";
    }
    else {
        $("btn_view").style.textShadow = "";
    }
}
function btn_use() {
    if ($("btn_use").style.textShadow == "") {
        $("btn_use").style.textShadow = "0 0 15px #008cff";
    }
    else {
        $("btn_use").style.textShadow = "";
    }
}
function btn_take() {
    if ($("btn_take").style.textShadow == "") {
        $("btn_take").style.textShadow = "0 0 15px #008cff";
    }
    else {
        $("btn_take").style.textShadow = "";
    }
}

/********   Baum links */
function obj_tree() {
    console.log(Date() + $("btn_view").style.textShadow);
    if ($("btn_view").style.textShadow != "") {
        $("btn_view").style.textShadow = "";
        $("txt").innerHTML = ("Ein Baum in erreichbarer Nähe... da könnte ich hinrobben, wenn auch unter Schmerzen.");
        story_next(-1);
    }
    if ($("btn_take").style.textShadow != "")  {
        $("btn_take").style.textShadow = "";
        if (! $("inventory").innerHTML.includes("Ast")) {
            $("txt").innerHTML = ("Okay, bin dort. Tatsächlich, dieser Ast ist schon fast ganz ohne Rinde aber scheint doch stark genung, um einges zu stützen. Ich zieh mal dran...");
            audio_effort = new Audio('res/effort.mp3');
            audio_effort.play();
            story_next(1);
            progress += 10;
        } else {
            $("txt").innerHTML = "Ja das war der morsche Baum, hab bereits einen Ast dabei. Das muss jetzt mal reichen, kann mit meinem verletzten Bein jetzt nicht auch noch Feuerholz sammeln.";
            story_next(-1);    
        }
    }
}

/********** Baum rechts    */
function obj_tree2() {
    console.log("tree2" + Date() + $("btn_view").style.textShadow);

    if (twig_use) {
        if (!twig_broken){
            $("txt").innerHTML = ("...ich stecke den zu langen Ast in das Loch und... KRACKS! Jup, jetzt hab ich eine Krücke.");
            $("twig").innerHTML = ("Ast");
            twig_broken = true;
            new Audio('res/crack.mp3').play();
            story_next(-1);
        } else {
            $("txt").innerHTML = ("Ja, diese glänzende Idee hattest du breits. Der Ast ist jetzt als Krücke zu gebrauchen.");
            story_next(-1);
        }
    }
    if ($("btn_view").style.textShadow != "") {
        $("btn_view").style.textShadow = "";
        if (!tree2_seen) {
            $("txt").innerHTML = ("Der zweite Baum in erreichbarer Nähe... da könnte ich auch hinüber robben, wenn auch unter noch mehr Schmerzen.");
            story_next(-1);
        } else {
            $("txt").innerHTML = ("Dieser hat hier ein tiefes Loch, aber mit durchaus stabilen Rändern. Ob ich das nutzen kann?");
            story_next(-1);
        }
    }
    if ($("btn_take").style.textShadow != "")  {
        $("btn_take").style.textShadow = "";
        if (! tree2_taken) {
            $("txt").innerHTML = ("Okay, bin ...endlich... dort. <br> Aber die erreichbaren Äste sind alle jung und gesund, kann nichts abbrechen.");
            story_next(2);
        } else {
            $("txt").innerHTML = ("Wie gesagt, ich will mir hier keinen abbrechen, beim Versuch hier etwas abzubrechen. Alles realtiv jung und stabil... auch das Loch.");
            story_next(-1);
        }
    }    
    if ($("btn_use").style.textShadow != "")  {
        $("btn_use").style.textShadow = "";
        $("txt").innerHTML = ("Tja, wenns so einfach wär, gel!?");
        story_next(-1);
    }
}

function twig_clicked() {
    if ($("btn_view").style.textShadow != "") {
        $("btn_view").style.textShadow = "";
        if (!twig_broken) {
            $("txt").innerHTML = ("Ja genau, du hast es dir gemert, ganz toll. Ein übermannsgroßer, schwerer Ast mit einer Gabelung.");
            story_next(-1);
        } else {
            $("txt").innerHTML = ("Sag mal, fragt bei dir eigentlich die eine Gehirnhälfte die andere oder was? Ja, das ist nun ein auf Achselhöhe abgebrochener, stabiler Ast mit Gabel.");
            story_next(-1);
        }
    }
    if ($("btn_take").style.textShadow != "")  {
        $("btn_take").style.textShadow = "";
        $("txt").innerHTML = ("Nehmen, nehmen, nehmen... und nix geben oder was? Du hast diesen Ast bereits.");
        story_next(-1);
    }    
    if ($("btn_use").style.textShadow != "")  {
        $("btn_use").style.textShadow = "";
            $("txt").innerHTML = ("Verwende Ast mit ...                                                                   ");
            twig_use = true;
            story_next(-1);
        }

    }


/******* Pfad   */
function obj_way() {
    console.log(Date() + $("btn_view").style.textShadow);
    if (twig_use)
    {
        if (twig_broken) {
            $("txt").innerHTML = ("Oh ja, es geht. Zwar langsam, aber mit dem Ast als Krücke kann ich den Pfad entlanghumpeln. Erstmal bis zum Wasser...");
            story_next(4);        
            progress += 10;        
        } else {
            $("txt").innerHTML = ("Tja grundsätzlich keine schlechte Idee. Mit dem Ast als Stütze könnte ichs schaffen.");
            story_next(6);        
            progress += 10;        
        }
    }
    if ($("btn_view").style.textShadow != "") {
        $("btn_view").style.textShadow = "";
        $("txt").innerHTML = ("Ein Pfad...");
        story_next(-1);
    }
    if ($("btn_use").style.textShadow != "")  {
        $("btn_use").style.textShadow = "";
        $("txt").innerHTML = ("Also den Pfad losmaschieren?<br><br>Okay, also auf!");
        story_next(0);
        progress += 10;
    }
}

/***** Story   *********************************************************************************  */

var audio_effort;

var tree2_seen = false;
var tree2_taken = false;

var twig_broken = false;
var twig_use = false;


// called by timeout which is set depending on the text length
function story_next(story_next_stp_) {
    story_next_stp = story_next_stp_;
    clearTimeout( timeout_ );
    timeout_ = setTimeout(story_txt, $("txt").innerHTML.length * dly);
}

// called if current text is clicked
function txt_continue() {
    clearTimeout( timeout_ );
    story_txt();
}

function story_txt() {
    switch(story_next_stp) {
        case -1: 
            $("txt").innerHTML = "";
        break;
        case 0:
            $("txt").innerHTML = "AUTSCH!<br><br>Aua, mein Bein... ahhh.<br><br>Nein, so kann ich nicht gehen.";
            story_next(-1);    
        break;
        case 1:
            audio_effort.pause();
            new Audio('res/crack.mp3').play();
            $("txt").innerHTML = "RATSCH!<br><br>...ja, tatsächlich, diesen stabilen Ast hab ich mal. Allerdings ist das ein ziemliches Gerät... Kaum zu tragen.";
            story_next(-1); 
            var div = document.createElement("div");
            div.id = "twig";
            div.innerHTML = "grosser Ast";
            div.classList.add("ani");
            div.addEventListener( 'click', function() { twig_clicked(); } );
            $("inventory").appendChild(div);
            progress += 10;        
        break;
        case 2:
            $("txt").innerHTML = "Aber Moment mal, diesen Baum solllte ich mir genauer anschauen...";
            tree2_taken = true;
            story_next(3);    
        break;        
        case 3:
            $("txt").innerHTML = "...jetzt wo ich schonmal da bin.";
            tree2_seen = true;
            story_next(-1);    
            progress += 10;
        break;
        case 4:
            $("txt").innerHTML = "Oh, das tut gut. Schmeckt frisch und sauber... noch die Füße waschen, so. Jetzt bin ich wieder halbwegs Mensch.";
            new Audio('res/drink.mp3').play();
            story_next(5);                
        break;
        case 5:          
            new Audio('res/win.mp3').play();
            $("overlay").innerHTML ="<br>Gratulation<br><br>Soweit hast dus mal durchgespielt ;)";  
            $("overlay").hidden = false;
            $("overlay").onclick = "";            
            story_next(-1);                
        break;

        case 6:          
            $("txt").innerHTML = "Aber der ist einfach zu lang, um ihn als Krücke unter die Achsel zu schieben. Grrrr... den nochmal mittig durchbrechen, das schaffe ich so ganz ohne Werkzeug nicht. Womit könnte ichs versuchen?";
            story_next(-1);                
        break;
    
    }
}

function timer_txt_del() {
    $("txt").innerHTML = "";
}

function game_start() {
    var bg_music = new Audio('res/water.mp3');
    bg_music.volume = 0.5;
    bg_music.play();
    $("overlay").hidden = true;

    $("txt").innerHTML = "Ohhh. Ahhh. <br>Au. Was, wo bin ich hier gelandet? Au, mein Bein, das zieht!<br>Erstmal umschauen...";
    story_next(-1); 

}

/*********** DOM ready    */
window.addEventListener('load', function () {
    timeout_ = setTimeout(timer_txt_del, ($("txt").innerHTML.length * dly));
  })
