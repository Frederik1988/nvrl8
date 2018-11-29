
import axios, { AxiosError, AxiosResponse } from "../../node_modules/axios/index";
import { Leg } from "../js/leg";
import { Trip } from "../js/trip";

// Import stop locations.
import * as data from "../Data/stops.json";
const stopArray: IStop[] = data.default as IStop[];
console.log(stopArray);

interface ITripList {
  TripList: Trip[];
}

interface IITripList {
  TripList: ITripList;
}

const date: Date = new Date();
const today: string = date.getDate() + "." +
  (date.getMonth() + 1) + "." +
  (date.getFullYear().toString().split("20")[1]);
console.log(today);

// const uri  = "http://cors-anywhere.herokuapp.com/http://xmlopen.rejseplanen.dk/bin/rest.exe/trip?originId=8600617" +
//           "&destCoordX=12565562&destCoordY=55673063&destCoordName=K%C3%B8benhavn%20H&date=" + today +
//          "&time=10:58&useBus=0&format=json";

const uri = "http://cors-anywhere.herokuapp.com/http://xmlopen.rejseplanen.dk" +
  "/bin/rest.exe/trip?originId=8600617&destId=8600696&date=29.11.18&time=12:30&useBus=0&format=json";

document.getElementById("TripButton").addEventListener("click", GetTripsAxios);

function GetTripsAxios(): void {
  document.getElementById("TripList").innerHTML = "";
  axios.get<ITripList[]>(uri, {
    headers: {
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Origin": "*",
      "X-Requested-With": "XMLHttpRequest",
    },
  })
    .then((response: AxiosResponse<any>) => {
      const tlist: any = response.data;
      const array: Trip[] = tlist.TripList.Trip as Trip[];
      console.log(array);
      array.forEach((element: Trip) => {
        const node = document.createElement("li");
        const legArray: Leg[] = element.Leg as Leg[];
        console.log(legArray);
        element.Leg.forEach((e) => {
          const legNode = document.createElement("li");
          legNode.appendChild(document.createTextNode(`Name : ${e.name}, Type : ${e.type},
                                  Origin : ${e.Origin.name}, Kl : ${e.Origin.time},
                                   Destination : ${e.Destination.name},
                                  Kl : ${e.Destination.time}`));
          node.appendChild(legNode);
        });
        let txt: string = ``;
        if (element.cancelled !== undefined) {
          txt += ` Cancelled : ${element.cancelled}`;
        }
        if (element.alternative !== undefined) {
          txt += ` Alternative : ${element.alternative}`;
        }
        if (element.valid !== undefined) {
          txt += ` Valid : ${element.valid}`;
        }
        const txtNode = document.createTextNode(txt);
        node.appendChild(txtNode);
        document.getElementById("TripList").append(node);
        console.log(element);
      });
    })
    .catch((error) => {
      // handle error
      console.log(error);
    })
    .then(() => {
      // always executed
    });
}

function onSignIn(googleUser: any) {
    const profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log("Name: " + profile.getName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

if (!onSignIn) {
    GetLoginPage();
} else if (onSignIn) {
    GetProfilePage();
}

function GetLoginPage(): void {
    // OPRETTER ELEMENTER
    const loginBody = document.getElementById("profilbody");
    const loginHeader = document.createElement("header");
    loginHeader.className = "container fluid col-lg-12";
    const loginHeaderDiv = document.createElement("div");
    loginHeaderDiv.className = "col-lg-6";
    const loginHeaderH1 = document.createElement("h1");
    loginHeaderH1.className = "color";
    const loginHeaderH1Span = document.createElement("span");
    loginHeaderH1Span.className = "forsent";
    const loginFormContainer = document.createElement("form");
    loginFormContainer.className = "col-lg-4 offset-lg-5 formcontainer";
    const loginFormDiv = document.createElement("div");
    loginFormDiv.className = "g-signin2";
    loginFormDiv.addEventListener("click", onSignIn);

    // TILFØJE ELEMENTER TIL INNERHTML
    loginBody.appendChild(loginHeader);
    loginHeader.appendChild(loginHeaderDiv);
    loginHeader.className = "container fluid col-lg-12";
    loginHeaderDiv.appendChild(loginHeaderH1);
    loginHeaderDiv.className = "col-lg-6";
    loginHeaderH1.appendChild(loginHeaderH1Span);
    loginHeaderH1.className = "color";
    loginHeaderH1.innerText = "Nvr";
    loginHeaderH1Span.className = "forsent";
    loginHeaderH1Span.innerText = "L8";
    loginBody.appendChild(loginFormContainer);
    loginFormContainer.appendChild(loginFormDiv);
    loginFormContainer.className = "col-lg-4 offset-lg-5 formcontainer";
    loginFormDiv.className = "g-signin2";
}

function GetProfilePage(): void {

      // OPRETTER ALLE ELEMENTER
      // BODY
      const profilBody = document.getElementById("profilbody");

      // HEADER
      const profilHeader = document.createElement("header");
      profilHeader.className = "container fluid col-lg-12";
      const profilDivHeader = document.createElement("div");
      profilDivHeader.className = "col-lg-6";
      const profilHeaderH1 = document.createElement("h1");
      profilHeaderH1.className = "color";
      profilHeaderH1.innerHTML = "NvrL8";
      const profilHeaderH1Span = document.createElement("span");

      // NAVIGATION
      const profilUl = document.createElement("ul");
      profilUl.className = "nav flex-column col-lg-1";
      profilUl.id = "navbackground";
      const profilNavItemLi = document.createElement("li");
      profilNavItemLi.className = "nav-item";
      const afgangNavItemLi = document.createElement("li");
      afgangNavItemLi.className = "nav-item";
      const alarmNavItemLi = document.createElement("li");
      alarmNavItemLi.className = "nav-item";
      const logNavItemLi = document.createElement("li");
      logNavItemLi.className = "nav-item";
      const profilNavItemA = document.createElement("a");
      profilNavItemA.className = "nav-link navitemcolor";
      profilNavItemA.href = "profil.htm";
      profilNavItemA.innerHTML = "<b>Profil</b>";
      const afgangNavItemA = document.createElement("a");
      afgangNavItemA.className = "nav-link navitemcolor";
      afgangNavItemA.href = "afgang.htm";
      afgangNavItemA.innerHTML = "<b>Afgang & Ankomst</b>";
      const alarmNavItemA = document.createElement("a");
      alarmNavItemA.className = "nav-link navitemcolor";
      alarmNavItemA.href = "alarm.htm";
      alarmNavItemA.innerHTML = "<b>Alarmtider</b>";
      const logNavItemA = document.createElement("a");
      logNavItemA.className = "nav-link navitemcolor";
      logNavItemA.href = "log.htm";
      logNavItemA.innerHTML = "<b>Rejse Dagbog</b>";

      // LOG UD A-TAG
      // const signOutA = document.getElementById("signOutA");

      // INDSÆTTER ALLE ELEMENTER I INNERHTML
      // HEADER
      profilBody.appendChild(profilHeader);
      profilHeader.appendChild(profilDivHeader);
      profilDivHeader.appendChild(profilHeaderH1);
      profilHeaderH1.appendChild(profilHeaderH1Span);

      // NAVIGATION
      profilBody.appendChild(profilUl);
      profilUl.append(profilNavItemLi, afgangNavItemLi, alarmNavItemLi, logNavItemLi);
      profilNavItemLi.appendChild(profilNavItemA);
      afgangNavItemLi.appendChild(afgangNavItemA);
      alarmNavItemLi.appendChild(alarmNavItemA);
      logNavItemLi.appendChild(logNavItemA);

  }

function GetAfgangPage(): void {

    // OPRETTER ALLE ELEMENTER
    // BODY
    const afgangBody = document.getElementById("profilbody");

    // HEADER
    const afgangHeader = document.createElement("header");
    afgangHeader.className = "container fluid col-lg-12";
    const afgangDivHeader = document.createElement("div");
    afgangDivHeader.className = "col-lg-6";
    const afgangHeaderH1 = document.createElement("h1");
    afgangHeaderH1.className = "color";
    const afgangHeaderH1Span = document.createElement("span");

    // NAVIGATION
    const afgangUl = document.createElement("ul");
    afgangUl.className = "nav flex-column col-lg-1";
    afgangUl.id = "navbackground";
    const profilNavItemLi = document.createElement("li");
    profilNavItemLi.className = "nav-item";
    const afgangNavItemLi = document.createElement("li");
    afgangNavItemLi.className = "nav-item";
    const alarmNavItemLi = document.createElement("li");
    alarmNavItemLi.className = "nav-item";
    const logNavItemLi = document.createElement("li");
    logNavItemLi.className = "nav-item";
    const profilNavItemA = document.createElement("a");
    profilNavItemA.className = "nav-link navitemcolor";
    profilNavItemA.href = "profil.htm";
    profilNavItemA.text = "<b>Profil</b>";
    const afgangNavItemA = document.createElement("a");
    afgangNavItemA.className = "nav-link navitemcolor";
    afgangNavItemA.href = "afgang.htm";
    afgangNavItemA.text = "<b>Afgang & Ankomst</b>";
    const alarmNavItemA = document.createElement("a");
    alarmNavItemA.className = "nav-link navitemcolor";
    alarmNavItemA.href = "alarm.htm";
    alarmNavItemA.text = "<b>Alarmtider</b>";
    const logNavItemA = document.createElement("a");
    logNavItemA.className = "nav-link navitemcolor";
    logNavItemA.href = "log.htm";
    logNavItemA.text = "<b>Rejse Dagbog</b>";

    // LOG UD A-TAG
    // const signOutA = document.getElementById("signOutA");

    // INDSÆTTER ALLE ELEMENTER I INNERHTML
    // HEADER
    afgangBody.appendChild(afgangHeader);
    afgangHeader.appendChild(afgangDivHeader);
    afgangDivHeader.appendChild(afgangHeaderH1);
    afgangHeaderH1.appendChild(afgangHeaderH1Span);

    // NAVIGATION
    afgangBody.appendChild(afgangUl);
    afgangUl.append(profilNavItemLi, afgangNavItemLi, alarmNavItemLi, logNavItemLi);
    profilNavItemLi.appendChild(profilNavItemA);
    afgangNavItemLi.appendChild(afgangNavItemA);
    alarmNavItemLi.appendChild(alarmNavItemA);
    logNavItemLi.appendChild(logNavItemA);

}

function GetAlarmPage(): void {

    // OPRETTER ALLE ELEMENTER
    // BODY
    const alarmBody = document.getElementById("profilbody");

    // HEADER
    const alarmHeader = document.createElement("header");
    alarmHeader.className = "container fluid col-lg-12";
    const alarmDivHeader = document.createElement("div");
    alarmDivHeader.className = "col-lg-6";
    const alarmHeaderH1 = document.createElement("h1");
    alarmHeaderH1.className = "color";
    const alarmHeaderH1Span = document.createElement("span");

    // NAVIGATION
    const alarmUl = document.createElement("ul");
    alarmUl.className = "nav flex-column col-lg-1";
    alarmUl.id = "navbackground";
    const profilNavItemLi = document.createElement("li");
    profilNavItemLi.className = "nav-item";
    const afgangNavItemLi = document.createElement("li");
    afgangNavItemLi.className = "nav-item";
    const alarmNavItemLi = document.createElement("li");
    alarmNavItemLi.className = "nav-item";
    const logNavItemLi = document.createElement("li");
    logNavItemLi.className = "nav-item";
    const profilNavItemA = document.createElement("a");
    profilNavItemA.className = "nav-link navitemcolor";
    profilNavItemA.href = "profil.htm";
    profilNavItemA.text = "<b>Profil</b>";
    const afgangNavItemA = document.createElement("a");
    afgangNavItemA.className = "nav-link navitemcolor";
    afgangNavItemA.href = "afgang.htm";
    afgangNavItemA.text = "<b>Afgang & Ankomst</b>";
    const alarmNavItemA = document.createElement("a");
    alarmNavItemA.className = "nav-link navitemcolor";
    alarmNavItemA.href = "alarm.htm";
    alarmNavItemA.text = "<b>Alarmtider</b>";
    const logNavItemA = document.createElement("a");
    logNavItemA.className = "nav-link navitemcolor";
    logNavItemA.href = "log.htm";
    logNavItemA.text = "<b>Rejse Dagbog</b>";

    // LOG UD A-TAG
   // const signOutA = document.getElementById("signOutA");

    // INDSÆTTER ALLE ELEMENTER I INNERHTML
    // HEADER
    alarmBody.appendChild(alarmHeader);
    alarmHeader.appendChild(alarmDivHeader);
    alarmDivHeader.appendChild(alarmHeaderH1);
    alarmHeaderH1.appendChild(alarmHeaderH1Span);

    // NAVIGATION
    alarmBody.appendChild(alarmUl);
    alarmUl.append(profilNavItemLi, afgangNavItemLi, alarmNavItemLi, logNavItemLi);
    profilNavItemLi.appendChild(profilNavItemA);
    afgangNavItemLi.appendChild(afgangNavItemA);
    alarmNavItemLi.appendChild(alarmNavItemA);
    logNavItemLi.appendChild(logNavItemA);
}

function GetLogPage(): void {

    // OPRETTER ALLE ELEMENTER
    // BODY
    const logBody = document.getElementById("profilbody");

    // HEADER
    const logHeader = document.createElement("header");
    logHeader.className = "container fluid col-lg-12";
    const logDivHeader = document.createElement("div");
    logDivHeader.className = "col-lg-6";
    const logHeaderH1 = document.createElement("h1");
    logHeaderH1.className = "color";
    const logHeaderH1Span = document.createElement("span");

    // NAVIGATION
    const logUl = document.createElement("ul");
    logUl.className = "nav flex-column col-lg-1";
    logUl.id = "navbackground";
    const profilNavItemLi = document.createElement("li");
    profilNavItemLi.className = "nav-item";
    const afgangNavItemLi = document.createElement("li");
    afgangNavItemLi.className = "nav-item";
    const alarmNavItemLi = document.createElement("li");
    alarmNavItemLi.className = "nav-item";
    const logNavItemLi = document.createElement("li");
    logNavItemLi.className = "nav-item";
    const profilNavItemA = document.createElement("a");
    profilNavItemA.className = "nav-link navitemcolor";
    profilNavItemA.href = "profil.htm";
    profilNavItemA.text = "<b>Profil</b>";
    const afgangNavItemA = document.createElement("a");
    afgangNavItemA.className = "nav-link navitemcolor";
    afgangNavItemA.href = "afgang.htm";
    afgangNavItemA.text = "<b>Afgang & Ankomst</b>";
    const alarmNavItemA = document.createElement("a");
    alarmNavItemA.className = "nav-link navitemcolor";
    alarmNavItemA.href = "alarm.htm";
    alarmNavItemA.text = "<b>Alarmtider</b>";
    const logNavItemA = document.createElement("a");
    logNavItemA.className = "nav-link navitemcolor";
    logNavItemA.href = "log.htm";
    logNavItemA.text = "<b>Rejse Dagbog</b>";

    // LOG UD A-TAG
    // const signOutA = document.getElementById("signOutA");

    // INDSÆTTER ALLE ELEMENTER I INNERHTML
    // HEADER
    logBody.appendChild(logHeader);
    logHeader.appendChild(logDivHeader);
    logDivHeader.appendChild(logHeaderH1);
    logHeaderH1.appendChild(logHeaderH1Span);

    // NAVIGATION
    logBody.appendChild(logUl);
    logUl.append(profilNavItemLi, afgangNavItemLi, alarmNavItemLi, logNavItemLi);
    profilNavItemLi.appendChild(profilNavItemA);
    afgangNavItemLi.appendChild(afgangNavItemA);
    alarmNavItemLi.appendChild(alarmNavItemA);
    logNavItemLi.appendChild(logNavItemA);

}
interface IStop {
  stop_id: string;
  stop_code: string;
  stop_name: string;
  stop_desc: string;
  stop_lat: string;
  stop_lon: string;
  location_type: string;
  parent_station: string;
}
