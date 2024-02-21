/**
 *  2024-02-21 text engine
 *  2024-02-20 init
 * 
 */


const dly = 50;             // ms per letter of text
var progress = 0;

var obj_way_timeout = 0;
let $ = (id) => document.getElementById(id);

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

function obj_bg() {
    $("txt").innerHTML = ("Ein Wald.<br> Erstmal viel grün... <br> Was war nur los? Mir ist so schwindlig. Und einen Durst hab ich. Sollte mich erstmal umsehen...");
    clearTimeout(obj_way_timeout);
    obj_way_timeout = setTimeout(timer_txt_del, $("txt").innerHTML.length * dly);
}

function obj_tree() {
    console.log(Date() + $("btn_view").style.textShadow);
    if ($("btn_view").style.textShadow != "") {
        $("btn_view").style.textShadow = "";
        $("txt").innerHTML = ("Ein Baum in erreichbarer Nähe... da könnte ich hinrobben, wenn auch unter Schmerzen.");
        clearTimeout(obj_way_timeout);
        obj_way_timeout = setTimeout(timer_txt_del, $("txt").innerHTML.length * dly);
    }
    if ($("btn_take").style.textShadow != "")  {
        $("btn_take").style.textShadow = "";
        if (! $("inventory").innerHTML.includes("Ast")) {
            $("txt").innerHTML = ("Okay, bin dort. Tatsächlich, dieser Ast ist schon fast ganz ohne Rinde aber scheint doch stark genung, um einges zu stützen. Ich zieh mal dran...");
            clearTimeout(obj_way_timeout);
            obj_way_timeout = setTimeout(timer_txt_story, $("txt").innerHTML.length * dly, 1);
            progress += 10;
        } else {
            $("txt").innerHTML = "Ja das war der morsche Baum, hab bereits einen Ast dabei. Das muss jetzt mal reichen, kann mit meinem verletzten Bein jetzt nicht auch noch Feuerholz sammeln.";
            clearTimeout(obj_way_timeout);    
            obj_way_timeout = setTimeout(timer_txt_del, $("txt").innerHTML.length * dly);
        }
    }
}


function obj_tree2() {
    console.log("tree2" + Date() + $("btn_view").style.textShadow);
    if ($("btn_view").style.textShadow != "") {
        $("btn_view").style.textShadow = "";
        $("txt").innerHTML = ("Der zweite Baum in erreichbarer Nähe... da könnte ich auch hinüber robben, wenn auch unter noch mehr Schmerzen.");
        clearTimeout(obj_way_timeout);
        obj_way_timeout = setTimeout(timer_txt_del, $("txt").innerHTML.length * dly);
    }
    if ($("btn_take").style.textShadow != "")  {
        $("btn_take").style.textShadow = "";
        $("txt").innerHTML = ("Okay, bin ...endlich... dort. <br> Aber die erreichbaren Äste sind alle jung und gesund, kann nichts abbrechen.");
        alert( $("txt").innerHTML.length * dly);
        clearTimeout(obj_way_timeout);
        //obj_way_timeout = setTimeout(timer_txt_del, $("txt").innerHTML.length * dly);
        obj_way_timeout = setTimeout(timer_txt_story, $("txt").innerHTML.length * dly, 2);
    }
}

function obj_way() {
    console.log(Date() + $("btn_view").style.textShadow);
    if ($("btn_view").style.textShadow != "") {
        $("btn_view").style.textShadow = "";
        $("txt").innerHTML = ("Ein Pfad...");
        clearTimeout(obj_way_timeout);
        obj_way_timeout = setTimeout(timer_txt_del, $("txt").innerHTML.length * dly);
    }
    if ($("btn_use").style.textShadow != "")  {
        $("btn_use").style.textShadow = "";
        $("txt").innerHTML = ("Also den Pfad losmaschieren?<br><br>Okay, also auf!");
        clearTimeout(obj_way_timeout);
        obj_way_timeout = setTimeout(timer_txt_story, $("txt").innerHTML.length * dly, 0);
        progress += 10;
    }
}

function timer_ (xx_) {
            $("txt").innerHTML = "xx" + xx_ + "AUTSCH!<br><br>Aua, mein Bein... ahhh.<br><br>Nein, so kann ich nicht gehen.";
            clearTimeout(obj_way_timeout);    
            obj_way_timeout = setTimeout(timer_txt_del, $("txt").innerHTML.length * dly);
}

function timer_txt_story(nr_) {
    switch(nr_) {
        case 0:
            $("txt").innerHTML = "AUTSCH!<br><br>Aua, mein Bein... ahhh.<br><br>Nein, so kann ich nicht gehen.";
            clearTimeout(obj_way_timeout);    
            obj_way_timeout = setTimeout(timer_txt_del, $("txt").innerHTML.length * dly);
        break;
        case 1:
            $("txt").innerHTML = "RATSCH!<br><br>...ja, tatsächlich, diesen stabilen Ast hab ich mal dabei.";
            clearTimeout(obj_way_timeout);    
            obj_way_timeout = setTimeout(timer_txt_del, $("txt").innerHTML.length * dly);
            $("inventory").innerHTML += ("Ast, ");
            progress += 10;        
        break;
        case 2:
            $("txt").innerHTML = "Aber Moment mal, diesen Baum solllte ich mir genauer anschauen...";
            clearTimeout(obj_way_timeout);    
            obj_way_timeout = setTimeout(timer_txt_del, $("txt").innerHTML.length * dly);
            progress += 10;
        break;

    }
}

function timer_txt_del() {
    $("txt").innerHTML = "";
}


window.addEventListener('load', function () {
    obj_way_timeout = setTimeout(timer_txt_del, ($("txt").innerHTML.length * dly));
  })
