const t={bodyEl:document.querySelector("body"),btnStart:document.querySelector("[data-start]"),btnStop:document.querySelector("[data-stop]")};let e=null;t.btnStart.addEventListener("click",(function(n){t.btnStart.disabled=!0,t.btnStop.disabled=!1,e=setInterval((()=>{t.bodyEl.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),t.btnStop.addEventListener("click",(function(n){t.btnStart.disabled=!1,t.btnStop.disabled=!0,clearInterval(e)}));
//# sourceMappingURL=01-color-switcher.4165e86c.js.map
