function init() {
    var jazda_noca 	= document.getElementById('jazda_noca');
    var lot 	= document.getElementById('lot');
    var buck 	= document.getElementById('buck');
    var poranek = document.getElementById('poranek');
    var zachod  = document.getElementById('zachod');
    var wschod  = document.getElementById('wschod');
    var morze   = document.getElementById('morze');
    
    // listeners
    jazda_noca.addEventListener("click", videoNameURL, false); 
    lot.addEventListener("click", videoNameURL, false);        
    buck.addEventListener("click", videoNameURL, false);        
    poranek.addEventListener("click", videoNameURL, false);        
    zachod.addEventListener("click", videoNameURL, false);        
    wschod.addEventListener("click", videoNameURL, false);        
    morze.addEventListener("click", videoNameURL, false);        
    
    var film = getURL();
    var urlID = film.substring(5);
    var element = document.getElementById(urlID);
    var pobranyID = null;
    if(element !== null) {
        pobranyID = element.id;
        getVideo(pobranyID);            
    }
}

window.onload = init;

function videoNameURL() {
    location.href = "#div_video";
    var elementID = this.id;
    location.href += "?film=" + elementID;
    var src = this.src;
    var title 	= document.getElementById('title');
    title.innerText = this.nextElementSibling.innerText;
    dynamic(src);
}

function getVideo(pobranyFilm) {
    var src = document.getElementById(pobranyFilm).src;
    dynamic(src);
}

function getURL() {
   var url = location.href;
   var film = url.search('film');
   var sub = url.substring(film);
   return sub;
}

function getSrc(src) {
    var src_length = src.length;
    var src_start = src.search('video_img');
    var src_name = src.substring(src_start+10, src_length-4);
    return src_name;
}

function dynamic(src) {
    var src_name = getSrc(src);
    var video_html5_api = document.getElementById('video_html5_api');
    var video_div = document.getElementById('video');

    src_name_foler = 'video/video_img/' + src_name + '.jpg';
    video_html5_api.poster = src_name_foler;
    video_div.setAttribute("poster",src_name_foler);

    var playAny = 0;
    var vid = document.createElement('video');
    myTypes = new Array ("video/mp4","video/ogg","video/webm");
    for (var i=0, len = myTypes.length; i < len; i++) {
    var canPlay = vid.canPlayType(myTypes[i]);
        if ((canPlay == "maybe") || (canPlay == "probably")) {
            playAny = i;
            break;
        }
    }
    if(playAny == 0) {video_html5_api.src = './video/' + src_name + '.mp4'; 
    }
    if(playAny == 1) {video_html5_api.src = './video/' + src_name + '.ogv'; 
    }
    if(playAny == 2) {video_html5_api.src = './video/' + src_name + '.webm'; 
    }
    var video_width  = '600px';
    var video_height = video_html5_api.offsetHeight;

    var div_poster = document.getElementsByClassName("vjs-poster");
    div_poster[0].setAttribute("style",'background-image: url("'+src_name_foler+'")');
    video_html5_api.load();
}



