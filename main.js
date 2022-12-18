// @ts-nocheck

// ==UserScript==
// @name         Omegle Blacklister
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Blocks your connection with people you don't wanna meet anymore on Omegle.com by skipping them before they even show up on screen again; Blocks the connections with every country in country_blacklist at line 17; Deletes the annoying logo for every new connection.
// @author       Dakkarm
// @match        https://www.omegle.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=omegle.com
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const country_blacklist = ['India', 'Canada', 'United States'];
  const blacklist = [];
  let currentIP;

  //register in https://app.ipgeolocation.io/ and replace <API_KEY> with your brand new API Key
  let api_key = "<API_KEY>"; 


  function skip() {
    document.getElementsByClassName('disconnectbtn')[0].click();
  }

  function generateBtn(){
    const table = document.getElementsByClassName('controltable');
    const td = (table[0].children)[0].children;
    let btnBlacklist = document.getElementById('myButton');
    if (!btnBlacklist){
      let btnBlacklist = document.createElement('button');
      btnBlacklist.innerHTML = 'BLACKLIST';
      btnBlacklist.id = 'myButton';
      btnBlacklist.style.backgroundColor = 'black';
      btnBlacklist.style.color = 'white';
      btnBlacklist.style.borderRadius = '15px';
      btnBlacklist.style.marginLeft = '10px';
      btnBlacklist.style.width = '250px';
      btnBlacklist.style.height = '80px';
      btnBlacklist.style.fontFamily = 'arial black';
      btnBlacklist.style.fontSize = '32px';
      td[0].appendChild(btnBlacklist);
    }

    btnBlacklist.onclick = function() {
      blacklist.push(currentIP);
      skip();
      skip();
      skip();
    };
  }

  window.oRTCPeerConnection = window.oRTCPeerConnection || window.RTCPeerConnection;
  window.RTCPeerConnection = function (...args) {
    const pc = new window.oRTCPeerConnection(...args);

    pc.oaddIceCandidate = pc.addIceCandidate;

    pc.addIceCandidate = function (iceCandidate, ...rest) {
      const fields = iceCandidate.candidate.split(" ");

      console.log(iceCandidate.candidate);
      const ip = fields[4];
      if (fields[7] === "srflx") {
        document.getElementById('videologo').style.visibility = "hidden";
        generateBtn();
        getLocation(ip);

      }
      return pc.oaddIceCandidate(iceCandidate, ...rest);
    };
    return pc;
  };


  let getLocation = async (ip) => {
    let url = `https://api.ipgeolocation.io/ipgeo?apiKey=${api_key}&ip=${ip}`;

    await fetch(url).then((response) =>
      response.json().then((json) => {
        currentIP = json.ip;
        const output = `
          ---------------------
          Country: ${json.country_name}
          State: ${json.state_prov}
          City: ${json.city}
          District: ${json.district}
          IP: ${json.ip}
          ---------------------
          `;
        for (let i=0; i<blacklist.length || i<country_blacklist.length; i++){
          if (json.ip == blacklist[i] || json.country_name == country_blacklist[i]) {
            skip();
            skip();
            skip();
          }
        }
        //console.log(output)
      })
    );
    //console.log(blacklist)
  };
})();
