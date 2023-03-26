chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (request) {
    if (request.msg === "Hello from popup!") {
      $("#custom-modal").fadeIn();
    }
  });
});

if (document.readyState === "complete") {
  onReady();
} else {
  window.onload = function () {
    onReady();
  };
}

function onReady() {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) {
    thems(storedTheme);
  }

  var netflixBtn = document.createElement("div");
  netflixBtn.setAttribute("id", "netflixId");
  var myStyle = `<style>
    #netflixId{
      position: fixed;
      top: 84%;
      justify-content: center;
      left: 10px;
      border-radius: 50px;
      height: 53px;
      z-index: 9999;
      transition: all 0.5s ease 0s;
    }
    .netFlixButton {
        background-color: black;
        cursor: pointer;
        color: white;
        text-decoration: none;
        border-radius: 60px;
        height: 40px;
        display: inline-flex;
        align-items: center;
        overflow: hidden;
        width: auto;
        max-width: 40px;
        /** I'm animating max-width because width needs to be auto, and auto can't be animated **/
        -webkit-transition: max-width 0.5s;
        transition: max-width 0.5s;
    }

    .netFlixButton:hover {
        max-width: 300px;
    }

    .icon {
        font-size: 16px;
        margin-left: -3px;
        padding: 0px 8px;
        display: flex;
        align-items: center;
    }

    .text {
        color: white;
        white-space: nowrap;
        padding-right: 15px;
        font-size: 13px;
    }

    #custom-modal {
        display: none;
        position: fixed;
        z-index: 999;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0, 0, 0, 0.4);
    }

    .modal-content {
        background-color: black;
        margin: 10% auto;
        padding: 20px;
        border: 6px solid rgba(229, 9, 20, 1);
        width: 80%;
        max-width: 600px;
        color: white;
    }

    .close {
        float: right;
        font-size: 28px;
        font-weight: bold;
    }

    .close:hover,
    .close:focus {
        color: rgba(229, 9, 20, 1);
        text-decoration: none;
        cursor: pointer;
    }
    .theme-switcher {
      border: none;
      margin: 0;
      padding: 0;
    }
    
    .theme-switcher h2 {
      margin-top: 0;
      margin-bottom: 10px;
      font-size: 1.2rem;
      font-weight: bold;
    }
    
    .c-toggle {
      display: flex;
      margin-bottom: 23px;
      justify-content: center;
    }
    
    .input-wrapper {
      position: relative;
      margin: 0 10px;
      width: 50px;  
      height: 50px;
      border-radius: 50%;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
      transition: background-color 0.3s ease;
    }
    
    .input-wrapper:hover {
      background-color: rgb(100 100 100);
    }
    
    .input-wrapper input {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }
    
    .input-wrapper label {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    
    .input-wrapper label span {
      display: none;
    }
    
    #white + label {
      cursor: pointer;
      background-color: #f7f7f7;
    }
    
    #black + label {
      cursor: pointer;
      background-color: #333;
    }
    
    #pink + label {
      cursor: pointer;
      background-color: #ff7eb9;
    }
    
    #blue + label {
      cursor: pointer;
      background-color: #4d94ff;
    }
    
    #yellow + label {
      cursor: pointer;
      background-color: #fff24d;
    }
    
  </style>`;
  netflixBtn.innerHTML =
    myStyle +
    `<a id="netFlix" class="netFlixButton">
          <span class="icon"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAAdVBMVEUAAACxBg/lCRS1Bg+TBQx+BAvoCRTtCRW4Bg+IBQxoAwmuBg94AwuiBQ6eBQ6ZBA6pBQ/RCBKNBQxTAwdzAwrGBxFuAwq+BxHeCBPYCBMTAAJfBAgIAABGAwb2ChYvAgQqAQQfAQM2AgRZAQkkAQM8AgUaAQKKL47NAAACcUlEQVRoge3Y2Y7iMBAFUBtncxwvGLI1A70A/f+f2A6jDlXT85Tcl9GkHoN0ZF3MTQkhttlmm39zTlE/p/k1Pz/XZA4L8XgpybzOz/O+mqf3C/HjjkwZ5+eNkvOobCGet8UTL/ZgXNGjF3O6GDyMNJc5XQwuK5rLgMWVZbnUWNzt6dENFg+mpEfH4sazq15DcenYVa+wuHU0l90bFDea5ZJj8aynubRQXFpf0LOfoXjQI9F/V+MRhZuoflQjDJcu+1GNONzqPb0vFoqHGNhVn3CJwo2P1L6kXDppULjV7R/V2BkULm20NJfhXdQ4PPiG/o7KTtQBhhvHt4Be1Papr8VtdPTow8cJh6dc8oHm0lydxeEu59V49m4++lo85cLedrtjROKZpttRobS3MDyFrlirN5kNIDyFHjW76pn237msxqdc2HbUP3NZjwevWTUOes5lNT7lklO8dNHD8JRLznJp8+/QEbiPllVAjBaGB5d1tAKK1DcBhMtgfU2/0mLfeBhurOuu7FWa7otB4cE2L+wrDRqJ54IuvMXYeBSe9Fzc2VXXWcDhWgj2tlPRwnCTcE2PPmpnQHhaSIV4ubBqfOQCweW0PPMtQMNwNeE5r0YLxd/pz6hw02XE4YL9F9BqGP5Aal4BForfRlYBDooLXo3RQPEDr4AAxXk1SgvFhWe5eCx+oxVQeAPFBd+OLBZni93osPidVUCQUJxXYxuw+JFVIxj/oNvRrsLigv9HshZX0zz/J79eyuIxD10vxfuqUmll8VnUup4fv6QNV/XtfhyKsryEhfipOZ3vr7fPv3/6+XY/H7q49OTbbLPNNv/ffAGs1Sp1bl89LAAAAABJRU5ErkJggg==" alt="" height="20px" width="30px" /></span>
          <span class="text"><b>Settings<b></span>
        </a>
        <div id="custom-modal">
          <div class="modal-content">
            <span class="close">&times;</span>
            <fieldset aria-label="theme switcher" role="radiogroup" class="theme-switcher">
      <legend style="margin-left: 217px;"><h2>Choose a Theme</h2></legend>
    <div class="c-toggle">
      <div class="input-wrapper">
          <input type="radio" name="theme" id="white" value="#f7f7f7" checked>
          <label for="white" data-color="white"><span class="sr-only">white</span></label>
      </div>
      <div class="input-wrapper">
      <input type="radio" name="theme" id="black" value="#000">
        <label for="black" data-color="black"><span class="sr-only">black</span></label>
      </div>
        <div class="input-wrapper">
          <input type="radio" name="theme" id="pink" value="#ff7eb9">
          <label for="pink" data-color="pink"><span class="sr-only">Pink</span></label>
      </div>
      <div class="input-wrapper">
        <input type="radio" name="theme" id="blue" value="#4d94ff">
        <label for="blue" data-color="blue"><span class="sr-only">Blue</span></label>
      </div>
      
      <div class="input-wrapper">
      <input type="radio" name="theme" id="yellow" value="#fff24d">
        <label for="yellow" data-color="yellow"><span class="sr-only">Blue</span></label>
      </div>
        
    </div>
    </fieldset>
      </div>
    </div>`;
  document.body.appendChild(netflixBtn);

  var settingBtn = document.getElementById("netFlix");

  if (settingBtn.addEventListener) {
    settingBtn.addEventListener("click", function () {
      $("#custom-modal").fadeIn();
    });
  }

  // Close the custom modal when the close button is clicked
  $(".close").click(function () {
    $("#custom-modal").fadeOut();
  });

  // Close the custom modal when the user clicks anywhere outside of it
  $(window).click(function (event) {
    if (event.target == $("#custom-modal")[0]) {
      $("#custom-modal").fadeOut();
    }
  });

  $('input[name="theme"]').on("click", function () {
    const selectedTheme = $(this).val();
    thems(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
    $("#custom-modal").fadeOut();
  });
}

function thems(selectedTheme) {
  $("body").css("background", selectedTheme);
  // $(".e1yzhtxy7").css("color", selectedTheme);
  if (selectedTheme === "#fff24d" || selectedTheme === "#f7f7f7") {
    $("h2").css("color", "black");
    $("h3").css("color", "black");
    $("div").css("color", "black");
    $("a").css("color", "black");
    $(".ea3diy33").css("color", "white");
    $(".e19utwz74").css("color", "white");
    $(".ea3diy32").css("color", "white");
    $("p").css("color", "black");
    $(".ep680991").css("color", "black");
  } else if (selectedTheme === "#000") {
    $("h2").css("color", "white");
    $("p").css("color", "white");
    $("h3").css("color", "white");
    $("div").css("color", "white");
    $("a").css("color", "white");
    $(".elj7tfr0").css("color", "black");
  }
  $("h1").css("color", "white");
  $(".ep680991").css("color", "white");
  $("button").css("color", "white");
  $(".e1boxt2d0").css("color", "white");
  $(".e1boxt2d0").css("color", "white");
  $(".default-ltr-cache-1dibr51").css(
    "background-image",
    `linear-gradient(to top, ${selectedTheme} 0, rgba(0, 0, 0, 0) 60%,  ${selectedTheme} 100%)`
  );
}
