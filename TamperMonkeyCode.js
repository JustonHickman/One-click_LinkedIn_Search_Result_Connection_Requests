// ==UserScript==
// @name         One-click LinkedIn Search Result Connection Request
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  OneClick Connect Requests
// @author       Jay HIckman
// @match       https://www.linkedin.com/search/results/people/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==


(
  function() {
    'use strict';

    if (window.self == window.top){
      createButton();
      createPopup();
    }//this makes sure we don't create extra buttons inside iframes, ads, etc

    function createButton() {
      let div = document.createElement('div');
      div.innerHTML = '<a id="connectBtn">Connect!</a>';
      div.style.display = "inline-block";
      div.style.position = "fixed";
      div.style.right = "3em";
      div.style.top = "5em";
      div.style.zIndex = '995';
      div.style.cursor = 'pointer';

      document.body.append(div);

      let btn = document.getElementById('connectBtn');
      btn.style.background = 'white';
      btn.style.color = 'blue';
      btn.style.fontWeight = '800';
      btn.style.padding = '5px';
      btn.style.border = 'solid 2px black';
      btn.style.borderRadius = '7px';
      btn.style.textDecoration = 'none';
      btn.style.fontSize = '0.8em';

      document.getElementById('connectBtn').addEventListener('click', clicked, false);
    }

    function createPopup() {
      let div = document.createElement('div');
      div.innerHTML = '<a id="popup">This button works on the People Search Results section only</a>';
      div.style.display = "none";
      div.style.position = "fixed";
      div.style.right = "3em";
      div.style.top = "7.5em";
      div.style.zIndex = '996';
      div.style.cursor = 'pointer';

      document.body.append(div);

      let btn = document.getElementById('popup');
      btn.style.background = 'palevioletred';
      btn.style.color = 'white';
      btn.style.marginTop = '0.5em';
      btn.style.padding = '4px';
      btn.style.borderRadius = '7px';
      btn.style.textDecoration = 'none';
      btn.style.fontSize = '1em';
    }

    function clicked() {
      if (location.pathname.split('/')[1].toLowerCase() === 'search'){
        buttonClickAction();
      } else {
        var btn = document.getElementById('popup').parentNode;
        btn.style.display = "block";
        setTimeout( () => {btn.style.display = "none";}, 4000);
      }
    }


    function buttonClickAction() {
      let btn = document.getElementById('connectBtn');
      btn.style.background = 'gray';
      btn.style.color = 'white';
      // flashes color on click

      setTimeout( () => { btn.style.background = 'white'; btn.style.color = 'blue';}, 300);

      //finds the buttons and performs the clicking
        if (document.querySelectorAll('.entity-result__actions.entity-result__divider')) {
            var x = Array.from(document.querySelectorAll('.entity-result__actions.entity-result__divider')).filter(data=>{return data.innerText.trim() === "Connect";});

            processConnect(x);

        } else {
            console.log('No "Connect" buttons found.');
        }
    }

    function processConnect(arr){

        //recrusive function to click the arr on connect button and send the connection request

        if(arr.length === 0){

            console.log("No more connections to send");
            return;
        }

            let buttonToClick = arr.shift();
    setTimeout(() => {
      buttonToClick.querySelector('button').click();
      setTimeout(() => {
        document.querySelector('button[aria-label="Send now"]').click();
        setTimeout(() => {
          processConnect(arr);
        }, 3000);
      }, 1000);
    }, 1500);

    }
})();

/*
Previous code in processConnect, worked with 1 off error, not clicking 1st "Connect" on page
    //  if(arr.length === 0){
    //      console.log("No more connections to send");
    //      return;
    //   }
    //        setTimeout( () => {
    //           arr[0].querySelector('button').click();
    //        }, 1500);
    //        setTimeout(() => {
    //          document.querySelector('button[aria-label="Send now"]').click();
    //      }, 1000);
    //        arr.shift();
    //      setTimeout( () => {
    //          processConnect(arr);
    //      }, 3000);
*/
