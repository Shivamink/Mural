import { useState, useEffect, createRef, useRef } from "react";
import Carousel from "./Carousel.jsx";
import Navigation from "./Navigation.jsx";
import base64 from "base-64";
import "./Mural.css";

//#region <Asset Imports>
import Ground from "./Assets/Ground.png";
import Airport from "./Assets/Airport.png";
import Building from "./Assets/Building.png";
import Building2 from "./Assets/Building-2.png";
import Building3 from "./Assets/Building-3.png";
import IREbuildings from "./Assets/I&RE buildings.png";
import TMTbuilding from "./Assets/TMT building.png";
import CMhospital from "./Assets/CM hospital.png";
import CMmall from "./Assets/CM mall.png";
import EDTech from "./Assets/EDTech Services school.png";
import ESGelectric from "./Assets/ESG electric lines.png";
import FSbank from "./Assets/FS bank.png";
import SLBCcoal from "./Assets/SL BC coal.png";
import Coalfactory from "./Assets/Coal factory.png";
import Coal from "./Assets/Coal.png";
import Train1 from "./Assets/Train1.png";
import Train2 from "./Assets/Train2.png";
import IREdock from "./Assets/I&RE dock.png";
import Industry from "./Assets/Industry.png";
import SLBCbuilding from "./Assets/SL BC building.png";
import SLRAgovernment from "./Assets/SLRA government.png";
import SLRAhole from "./Assets/SLRA hole.png";
import Cinema from "./Assets/Cinema.png";
import Twintower from "./Assets/Twin tower.png";
import IMAbuilding from "./Assets/IM&A building.png";
import TMTDrone from "./Assets/Drone.webm";
import TMTMovieposter from "./Assets/TMT Movie poster.png";
import TMTMovieposter2 from "./Assets/TMT Movie poster2.png";
import TMTMovieposter3 from "./Assets/TMT Movie poster3.png";
import TMTStadium from "./Assets/TMT Stadium.png";
import Mobileqr from "./Assets/Mobile qr.png";
import Dampond from "./Assets/Dam water.png";
import Lamp from "./Assets/Lamp.png";
import Mantralya from "./Assets/Mantralya.png";
import Cafe from "./Assets/Cafe.png";
import Windmill from "./Assets/Windmill.webm";
import Streetlightleft from "./Assets/Street light left.png";
import Streetlightright from "./Assets/Street light right.png";
import Yellowbus from "./Assets/Yellow bus.png";
import yellowcargoing from "./Assets/yellow car going.png";
import redcarcoming from "./Assets/red car coming.png";
import greycarleft from "./Assets/grey car left.png";
import whitecar from "./Assets/white car.png";
import yellowcab from "./Assets/yellow cab.png";
import darkgreycar from "./Assets/dark grey car.png";
import greencar from "./Assets/green car.png";
import imacars from "./Assets/ima cars.png";
import streetlight1 from "./Assets/streetlight1.png";
import streetlight2 from "./Assets/streetlight2.png";
import Consumermarkets from "./Assets/Consumer markets.png";
import EnergyNatural from "./Assets/Energy & Natural  Resources.png";
import FinancialServices from "./Assets/Financial Services.png";
import GovernmentPublic from "./Assets/Government &  Public Services.png";
import InfrastructureRealEstate from "./Assets/Infrastructure & Real Estate.png";
import IndustrialManufacturingAuto from "./Assets/Industrial Manufacturing  & Auto.png";
import TechnologyMediatelecom from "./Assets/Technology, Media & telecom.png";
import Services from "./Assets/Services.png";
import BusinessConsulting from "./Assets/Business Consulting.png";
import DigitalTrustCyber from "./Assets/Digital Trust- Cyber.png";
import RiskAdvisory from "./Assets/Risk Advisory.png";
import TechEnablement from "./Assets/Tech Enablement.png";
import OneMA from "./Assets/One M&A.png";
import ManagedServices from "./Assets/Managed Services.png";
import Tax from "./Assets/Tax.png";
import StrategicInitiatives from "./Assets/Strategic Initiatives.png";
import ESGtrees1 from "./Assets/ESG trees 1.png";
import ESGTree2 from "./Assets/ESG Tree 2.png";
import ESGtree3 from "./Assets/ESG tree 3.png";
import Damwater from "./Assets/Dam water.webm";
import Boat from "./Assets/Boat.webm";
import fire from "./Assets/fire2.webm";
import imageIcon from "./Assets/imageIcon.png";
import pptIcon from "./Assets/pptIcon.png";
import pdfIcon from "./Assets/pdfIcon.png";
//#endregion

const completemap = {
  sector1: ["CMmall", "EDTech"],
  "Energy & Natural Resources": [
    "Solarpanel1",
    "Solarpanel2",
    "Solarpanel3",
    "Solarpanel4",
    "ESGelectric",
    "Lamp",
    "Windmill1",
    "Windmill2",
    "Windmill3",
    "Windmill4",
  ],
  "Financial Services": ["FSbank"],
  "Government & Public Services": [
    "SLRAgovernment",
    "CMhospital",
    "Mantralya",
    "Yellowbus1",
    "Yellowbus2",
    "Yellowbus3",
  ],
  "Infrastructure & Real Estate": [
    "IREdock",
    "IREbuilding",
    "Train1",
    "Train2",
  ],
  "Industrial Manufacturing & Auto": [
    "Coal",
    "IMAbuilding",
    "Coalfactory",
    "Car1",
    "Car2",
    "Car3",
    "Car4",
    "Car5",
    "Car6",
    "Car7",
    "Car8",
    "Car9",
    "Car10",
    "Car11",
    "Car12",
    "Car13",
  ],
  "Technology, Media & telecom": [
    "Mobileqr",
    "TMTbuilding",
    "SLRAhole",
    "TMTStadium",
    "TMTDrone",
    "EDTech",
    "TMTMovieposter1",
    "TMTMovieposter2",
    "TMTMovieposter3",
  ],
  service1: [],
  "Business Consulting": ["Coal", "SLBCbuilding", "Mobileqr"],
  "Digital Trust": ["Mobileqr"],
  "Risk Advisory": ["SLRAhole", "SLRAgovernment"],
  "Tech Enablement": ["Twintower"],
  "One M&A": ["FSbank", "Whitebluebuilding", "Trianglebuilding"],
  "Managed Services": ["Airport", "Cinema", "CMhospital"],
  Tax: ["Mantralya", "Twintower", "Govermentbuilding", "Cafe"],
  "Strategic Initiatives": [
    "ESGTree3",
    "ESGTree2",
    "ESGTree1",
    "Dampond",
    "Windmill1",
    "Windmill2",
    "Windmill3",
    "Windmill4",
  ],
};

const USERNAME = "kpmg_mural";
const PASSWORD = "password";

let itemTop = null;
let itemLeft = null;
let hotspot_label = "";
let mediaRef = null;
let ssname = "";
let sectorIcon = [];
let serviceIcon = [];

const MEDIA_STATUS = {
  text: false,
  image: false,
  pdf: false,
  video: false,
};

const MEDIA_ANIMATION_DURATION_REQ = {
  text: 0.7,
  image: 0.7,
  pdf: 0.7,
  video: 0.7,
};

const ANIMATION_DELAY = {
  text: 0,
  image: 0,
  pdf: 0,
  video: 0,
};

function dataMapGenerator(data) {
  const dataMap = {};

  data.forEach(
    ({
      hotspot_label,
      resource_name,
      resource_type,
      content_url,
      content_type,
    }) => {
      if (!dataMap[hotspot_label]) {
        dataMap[hotspot_label] = {
          sector: [],
          service: [],
          datacontent: {},
        };
      }

      const hotspotRef = dataMap[hotspot_label];

      if (resource_type == "sector") {
        if (!hotspotRef.sector.includes(resource_name)) {
          hotspotRef.sector.push(resource_name);
        }
      } else if (resource_type == "service") {
        if (!hotspotRef.service.includes(resource_name)) {
          hotspotRef.service.push(resource_name);
        }
      }

      if (!hotspotRef.datacontent[resource_name]) {
        hotspotRef.datacontent[resource_name] = {
          video: [],
          text: [],
          image: [],
          pdf: [],
        };
      }
      hotspotRef.datacontent[resource_name][content_type].push(content_url);
    }
  );

  console.log(dataMap);

  return dataMap;
}

function calculateDelay(data) {
  // Set MEDIA_STATUS
  for (let media_type in MEDIA_STATUS) {
    MEDIA_STATUS[media_type] = data[media_type].length > 0;
  }

  // Set ANIMATION_DELAY
  let delay = 0;
  for (let media_type in MEDIA_STATUS) {
    if (MEDIA_STATUS[media_type]) {
      ANIMATION_DELAY[media_type] = delay;
      delay += MEDIA_ANIMATION_DURATION_REQ[media_type];
    }
  }

  console.log("calculateDelay: ", { MEDIA_STATUS, ANIMATION_DELAY });
}

function App() {
  const [activeGroup, setActiveGroup] = useState({ prev: null, current: null });
  const [activeHotspot, setActiveHotspot] = useState({
    prev: null,
    current: null,
  });
  const [dataMap, setDataMap] = useState({});
  const [Icons, setIcons] = useState({});
  const [sectorList, setSectorList] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [sectors, Setsectors] = useState([]); //icons
  const [services, Setservices] = useState([]); //icons

  //Show hide content state
  const [modalbtn, setModalbtn] = useState(false);
  const [infoModal, setInfoModal] = useState(null);
  const [animation, Setanimation] = useState(false);

  /**
   * @type{React.RefObject<HTMLDivElement>}
   */
  const backdropRef = createRef(null);
  let buttons = createRef(null);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      let jwt = localStorage.getItem("mural_jwt");
      const exp = jwt
        ? parseInt(JSON.parse(base64.decode(jwt.split(".")[1])).exp)
        : 0;

      // console.log({ jwt, exp });

      if (!(parseInt((Date.now() / 1000).toFixed(0)) < exp)) {
        const fd = new FormData();
        fd.append("user", USERNAME);
        fd.append("pass", PASSWORD);

        const authRes = await fetch(
          "https://kpmg.experientialetc.com/jwt/jwtAuthorize.php",
          {
            method: "POST",
            body: fd,
          }
        );
        jwt = (await authRes.json()).key;
        localStorage.setItem("mural_jwt", jwt);
      }

      const res = await fetch(
        "https://kpmg.experientialetc.com/api/tabletop/fetchMuralHotspotApi.php",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + jwt,
          },
        }
      );
      const json = await res.json();
      /**
       * @type {{
       * content_type: string,
       * content_url: string,
       * hotspot_label: string
       * }[]}
       */
      const muralContent = json.mural_hotspot;

      const Iconres = await fetch(
        "https://kpmg.experientialetc.com/api/tabletop/fetchResourceIconApi.php",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + jwt,
          },
        }
      );

      const json2 = await Iconres.json();

      setIcons(json2.response);

      setDataMap(dataMapGenerator(muralContent));
    };

    fetchData();
  }, []);

  //Icon handler
  useEffect(() => {
    Object.entries(Icons).map(function (eachIcon) {
      if (eachIcon[1].resource_type == "sector") {
        sectorIcon.push(eachIcon[1]);
      } else if (eachIcon[1].resource_type == "service") {
        serviceIcon.push(eachIcon[1]);
      }
    });
    Setsectors(sectorIcon);
    Setservices(serviceIcon);
  }, [Icons]);

  // Group Handler
  useEffect(() => {
    if (activeGroup.current === null) return;
    console.log(activeGroup);

    if (activeGroup.current && backdropRef)
      backdropRef.current.style.zIndex = 0;

    const currentGroup = completemap[activeGroup.current];
    if (currentGroup) {
      currentGroup.forEach((h) => {
        document.getElementById(h).style.zIndex = 1;
      });
    }

    if (activeGroup.current == "Infrastructure & Real Estate") {
      document.getElementById("boat").style.zIndex = 1;
    } else if (activeGroup.current == "Industrial Manufacturing & Auto") {
      document.getElementById("fire1").style.zIndex = 1;
      document.getElementById("fire2").style.zIndex = 1;
    }

    if (activeGroup.current === activeGroup.prev) return;

    const prevGroup = completemap[activeGroup.prev];
    if (prevGroup) {
      prevGroup.forEach((h) => {
        document.getElementById(h).style.zIndex = 0;
      });
    }

    if (activeGroup.prev == "Infrastructure & Real Estate") {
      document.getElementById("boat").style.zIndex = 0;
    } else if (activeGroup.prev == "Industrial Manufacturing & Auto") {
      document.getElementById("fire1").style.zIndex = 0;
      document.getElementById("fire2").style.zIndex = 0;
    }
  }, [activeGroup]);

  // Hotspot Handler
  useEffect(() => {
    if (activeHotspot.current === null) return;

    if (activeGroup.current) {
      const currentGroup = completemap[activeGroup.current];
      currentGroup.forEach((h) => {
        if (h === activeHotspot.current) return;
        document.getElementById(h).style.zIndex = 0;
      });

      if (
        activeHotspot.current !== "IREdock" &&
        activeGroup.current == "Infrastructure & Real Estate"
      ) {
        document.getElementById("boat").style.zIndex = 0;
      } else if (
        activeHotspot.current !== "Coalfactory" &&
        activeGroup.current == "Industrial Manufacturing & Auto"
      ) {
        console.log("hiding fire");
        document.getElementById("fire1").style.zIndex = 0;
        document.getElementById("fire2").style.zIndex = 0;
      }

      if (!dataMap[activeHotspot.current]) return;
      mediaRef = dataMap[activeHotspot.current].datacontent[ssname];
      if (!mediaRef) return;
      calculateDelay(mediaRef);
      setModalbtn(true);
    } else {
      document.getElementById(activeHotspot.current).style.zIndex = 1;
      backdropRef.current.style.zIndex = 0;
      if (activeHotspot.current == "IREdock") {
        document.getElementById("boat").style.zIndex = 1;
      } else if (activeHotspot.current == "Coalfactory") {
        document.getElementById("fire1").style.zIndex = 1;
        document.getElementById("fire2").style.zIndex = 1;
      }

      if (!dataMap[activeHotspot.current]) return;
      setSectorList(dataMap[activeHotspot.current].sector);
      setServiceList(dataMap[activeHotspot.current].service);
    }
  }, [activeHotspot]);

  useEffect(() => {
    console.log("modalbtn effect");
    if (!modalbtn && mediaRef) setModalbtn(true);
  }, [modalbtn]);

  function enablegroup(event) {
    console.log("Clicked on Group: ", event.target.id);
    ssname = event.target.id;

    setActiveGroup((state) => ({
      prev: state.current,
      current: event.target.id,
    }));
  }

  function individualitem(event) {
    console.log("Clicked on Hotspot: ", event.target.id);
    hotspot_label = event.target.id;

    setActiveHotspot((state) => ({
      prev: state.current,
      current: event.target.id,
    }));

    //#region <Menu Positioning>
    let itemval = document.getElementById(event.target.id);
    let itemin = itemval.getBoundingClientRect();
    itemTop = itemin.top;
    itemLeft = itemin.left;
    console.log(itemTop);
    console.log(itemin.top, itemin.left);
    let button = buttons.current;

    button.style.top = `${itemin.top.toFixed()}px`;
    button.style.left = `${itemin.left + 550}px`;
    if (activeGroup.current) {
      button.style.left = `${itemin.left + 250}px`;
    }
    let Sectorlist = document.getElementById("Sectorlist");
    Sectorlist.style.top = `${itemin.top.toFixed()}px`;
    Sectorlist.style.left = `${itemin.left.toFixed() - 300}px`;

    let Servicelist = document.getElementById("Servicelist");
    Servicelist.style.top = `${itemin.top.toFixed()}px`;
    Servicelist.style.left = `${itemin.left + 150}px`;

    if (itemin.left == 0 || itemin.top == 496.794677734375) {
      button.style.top = `${500}px`;
      button.style.left = `${850}px`;
      Sectorlist.style.top = `${500}px`;
      Sectorlist.style.left = `${500}px`;
      Servicelist.style.top = `${500}px`;
      Servicelist.style.left = `${900}px`;
    }
    //#endregion
  }

  function showmainbtn(event) {
    ssname = event.target.id;
    console.log("showmainbtn(): ", hotspot_label, ssname);
    console.log(activeHotspot.current, "activeHotspot.current");
    console.log(hotspot_label, "hotspot_label");
    console.log("helloooooooooo");
    mediaRef = dataMap[activeHotspot.current].datacontent[event.target.id];
    calculateDelay(mediaRef);

    if (modalbtn) setModalbtn(false);
    else setModalbtn(true);
  }

  function reset() {
    const hostspots = document.getElementsByClassName("hotspot");
    for (let i = 0; i < hostspots.length; i++) {
      hostspots.item(i).style.zIndex = 0;
    }
    backdropRef.current.style.zIndex = -1;
    setActiveGroup((state) => ({
      prev: state.current,
      current: null,
    }));
    setActiveHotspot((state) => ({
      prev: state.current,
      current: null,
    }));

    setSectorList([]);
    setServiceList([]);

    hotspot_label = "";
    ssname = "";
    mediaRef = null;

    setModalbtn(false);

    MEDIA_STATUS.text = false;
    MEDIA_STATUS.image = false;
    MEDIA_STATUS.pdf = false;
    MEDIA_STATUS.video = false;

    ANIMATION_DELAY.text = 0;
    ANIMATION_DELAY.image = 0;
    ANIMATION_DELAY.pdf = 0;
    ANIMATION_DELAY.video = 0;
  }

  const carouselBackdropClickHandler = () => {
    setInfoModal(null);
    console.log("Backdrop clicked");
  };

  return (
    <div className="App">
      <div id="Parent">
        {/* Hotspots */}
        <>
          <img className="bg-image" src={Ground} />
          <img
            className="hotspot airport-image"
            id="Airport"
            src={Airport}
            onClick={individualitem}
          />
          <img
            className="hotspot building-image"
            id="Trianglebuilding"
            src={Building}
            onClick={individualitem}
          />
          <img
            className="hotspot building2-image"
            id="Whitebluebuilding"
            src={Building2}
            onClick={individualitem}
          />
          <img
            className="hotspot building3-image"
            id="Govermentbuilding"
            src={Building3}
            onClick={individualitem}
          />
          <img
            className="hotspot IREbuilding-image"
            id="IREbuilding"
            src={IREbuildings}
            onClick={individualitem}
          />
          <img
            className="hotspot TMTbuilding-image"
            id="TMTbuilding"
            src={TMTbuilding}
            onClick={individualitem}
          />
          <img
            className="hotspot CMhospital-image"
            id="CMhospital"
            src={CMhospital}
            onClick={individualitem}
          />
          <img
            className="hotspot CMmall-image"
            id="CMmall"
            src={CMmall}
            onClick={individualitem}
          />
          <img
            className="hotspot Twintower-image"
            id="Twintower"
            src={Twintower}
            onClick={individualitem}
          />
          <img
            className="hotspot EDTech-image"
            id="EDTech"
            src={EDTech}
            onClick={individualitem}
          />
          <img
            className="hotspot ESGelectric-image"
            id="ESGelectric"
            src={ESGelectric}
            onClick={individualitem}
          />
          <img
            className="hotspot Cinema-image"
            id="Cinema"
            src={Cinema}
            onClick={individualitem}
          />
          <img
            className="hotspot FSbank-image"
            id="FSbank"
            src={FSbank}
            onClick={individualitem}
          />
          <img
            className="hotspot SLBCcoal-image"
            id="SLBCcoal"
            src={SLBCcoal}
            // onClick={individualitem}
          />
          <img
            src={Industry}
            className="hotspot Industry-image"
            id="Industry"
            onClick={individualitem}
          />

          <img
            src={Coalfactory}
            id="Coalfactory"
            onClick={individualitem}
            className="hotspot Coalfactory-image"
          />
          <video
            className="fire1 hotspot"
            id="fire1"
            src={fire}
            autoPlay
            loop
            muted
          />
          <video
            className="fire2 hotspot"
            id="fire2"
            src={fire}
            autoPlay
            loop
            muted
          />

          <img
            src={Coal}
            className="hotspot Coal-image"
            id="Coal"
            onClick={individualitem}
          />
          <img
            src={Train1}
            className="hotspot Train1-image"
            id="Train1"
            onClick={individualitem}
          />
          <img
            src={Train2}
            className="hotspot Train2-image"
            id="Train2"
            onClick={individualitem}
          />
          <div>
            <img
              className="hotspot IREdock-image"
              id="IREdock"
              src={IREdock}
              onClick={individualitem}
            />
            <video
              className="boat hotspot"
              id="boat"
              src={Boat}
              autoPlay
              loop
              muted
            />
          </div>

          <img
            className="hotspot SLBCbuilding-image"
            id="SLBCbuilding"
            src={SLBCbuilding}
            onClick={individualitem}
          />
          <img
            className="hotspot SLRAgovernment-image"
            id="SLRAgovernment"
            src={SLRAgovernment}
            onClick={individualitem}
          />
          <img
            className="hotspot IMAbuilding-image"
            id="IMAbuilding"
            src={IMAbuilding}
            onClick={individualitem}
          />
          <video
            className="hotspot TMTDrone-image"
            id="TMTDrone"
            src={TMTDrone}
            onClick={individualitem}
            autoPlay
            loop
            muted
          />
          <img
            className="hotspot TMTMovieposter-image"
            id="TMTMovieposter1"
            src={TMTMovieposter2}
            onClick={individualitem}
          />
          <img
            className="hotspot TMTMovieposter-image2"
            id="TMTMovieposter2"
            src={TMTMovieposter}
            onClick={individualitem}
          />
          <img
            className="hotspot TMTStadium-image"
            id="TMTStadium"
            src={TMTStadium}
            onClick={individualitem}
          />
          <img
            className="hotspot TMTMovieposter-image3"
            id="TMTMovieposter3"
            src={TMTMovieposter3}
            onClick={individualitem}
          />
          <img
            className="hotspot Mobileqr-image"
            id="Mobileqr"
            src={Mobileqr}
            onClick={individualitem}
          />
          <img
            className="hotspot ESGtrees1"
            id="ESGTree1"
            src={ESGtrees1}
            onClick={individualitem}
          />
          <img
            className="hotspot ESGTree2"
            id="ESGTree2"
            src={ESGTree2}
            onClick={individualitem}
          />
          <img
            className="hotspot ESGtree3"
            id="ESGTree3"
            src={ESGtree3}
            onClick={individualitem}
          />
          <img
            className="hotspot SLRAhole-image"
            id="SLRAhole"
            src={SLRAhole}
            onClick={individualitem}
          />
          <img
            className="hotspot Dampond-image"
            id="Dampond"
            src={Dampond}
            onClick={individualitem}
          />
          <img
            className="hotspot Lamp-image"
            id="Lamp"
            src={Lamp}
            onClick={individualitem}
          />
          <img
            className="hotspot Mantralya-image"
            id="Mantralya"
            src={Mantralya}
            onClick={individualitem}
          />
          <img
            className="hotspot Cafe-image"
            id="Cafe"
            src={Cafe}
            onClick={individualitem}
          />
          <video
            className="hotspot Windmill-image"
            id="Windmill1"
            src={Windmill}
            onClick={individualitem}
            autoPlay
            loop
            muted
          />
          <video
            className="hotspot Windmill-image2"
            id="Windmill2"
            src={Windmill}
            onClick={individualitem}
            autoPlay
            loop
            muted
          />
          <video
            className="hotspot Windmill-image3"
            id="Windmill3"
            src={Windmill}
            onClick={individualitem}
            autoPlay
            loop
            muted
          />
          <video
            className="hotspot Windmill-image4"
            id="Windmill4"
            src={Windmill}
            onClick={individualitem}
            autoPlay
            loop
            muted
          />
          <img
            className="hotspot Streetlightleft-image"
            id="Solarpanel1"
            src={Streetlightleft}
            onClick={individualitem}
          />
          <img
            className="hotspot Streetlightright-image"
            id="Solarpanel2"
            src={Streetlightright}
            onClick={individualitem}
          />
          <img
            className="hotspot Streetlightleft-image2"
            id="Solarpanel3"
            src={Streetlightleft}
            onClick={individualitem}
          />
          <img
            className="hotspot Streetlightright-image2"
            id="Solarpanel4"
            src={Streetlightright}
            onClick={individualitem}
          />
          <img
            className="hotspot Yellowbus-image"
            id="Yellowbus1"
            src={Yellowbus}
            onClick={individualitem}
          />
          <img
            className="hotspot Yellowbus-image2"
            id="Yellowbus2"
            src={Yellowbus}
            onClick={individualitem}
          />
          <img
            className="hotspot Yellowbus-image3"
            id="Yellowbus3"
            src={Yellowbus}
            onClick={individualitem}
          />
          <img
            className="hotspot yellowcargoing-image"
            id="Car1"
            src={yellowcargoing}
            onClick={individualitem}
          />
          <img
            className="hotspot redcarcoming-image"
            id="Car2"
            src={redcarcoming}
            onClick={individualitem}
          />
          <img
            className="hotspot greycarleft-image"
            id="Car3"
            src={greycarleft}
            onClick={individualitem}
          />
          <img
            className="hotspot greycarleft-image2"
            id="Car4"
            src={greycarleft}
            onClick={individualitem}
          />
          <img
            className="hotspot greycarleft-image3"
            id="Car5"
            src={greycarleft}
            onClick={individualitem}
          />
          <img
            className="hotspot greycarleft-image4"
            id="Car6"
            src={greycarleft}
            onClick={individualitem}
          />
          <img
            className="hotspot greycarleft-image5"
            id="Car7"
            src={greycarleft}
            onClick={individualitem}
          />
          <img
            className="hotspot whitecar-image"
            id="Car8"
            src={whitecar}
            onClick={individualitem}
          />
          <img
            className="hotspot whitecar-image2"
            id="Car9"
            src={whitecar}
            onClick={individualitem}
          />
          <img
            className="hotspot darkgreycar-image"
            id="Car10"
            src={darkgreycar}
            onClick={individualitem}
          />
          <img
            className="hotspot greencar-image"
            id="Car11"
            src={greencar}
            onClick={individualitem}
          />
          <img
            className="hotspot imacars-image"
            id="imacars"
            src={imacars}
            onClick={individualitem}
          />
          <img
            className="hotspot yellowcab-image"
            id="Car12"
            src={yellowcab}
            onClick={individualitem}
          />
          <img
            className="hotspot yellowcab-image2"
            id="Car13"
            src={yellowcab}
            onClick={individualitem}
          />
          <img
            className="hotspot streetlight1-image"
            id="streetlight1"
            src={streetlight1}
            // onClick={individualitem}
          />
          <img
            className="hotspot streetlight1-image2"
            id="streetlight1"
            src={streetlight1}
            // onClick={individualitem}
          />
          <img
            className="hotspot streetlight1-image3"
            id="streetlight1"
            src={streetlight1}
            // onClick={individualitem}
          />
          <img
            className="hotspot streetlight2-image"
            id="streetlight2"
            src={streetlight2}
            // onClick={individualitem}
          />
          <img
            className="hotspot streetlight2-image2"
            id="streetlight2"
            src={streetlight2}
            // onClick={individualitem}
          />
          <img
            className="hotspot streetlight2-image3"
            id="streetlight2"
            src={streetlight2}
            // onClick={individualitem}
          />
          <img
            className="hotspot streetlight2-image4"
            id="streetlight2"
            src={streetlight2}
            // onClick={individualitem}
          />
          <img
            className="hotspot streetlight2-image5"
            id="streetlight2"
            src={streetlight2}
            // onClick={individualitem}
          />
        </>

        {/* Sectors List */}
        <div id="primary">
          {sectors.map(function (eachsecIcon) {
            return (
              <button
                className="primary-btn"
                onClick={enablegroup}
                key={eachsecIcon.resource_name}
              >
                <img
                  src={eachsecIcon.icon_url}
                  id={eachsecIcon.resource_name}
                  className="primary-icon"
                />
                <img src={eachsecIcon.label_url} className="primary-text" />
              </button>
            );
          })}
        </div>

        {/* Services List */}
        <div id="service">
          <button
            className="service-btnmain"
            onClick={() => Setanimation(!animation)}
          >
            <img src={Services} className="service-btnimage" id="service1" />
          </button>
          <div id={animation ? "fixserviceanimation" : "serviceanimation"}>
            {services.map(function (eachserIcon) {
              return (
                <button
                  className="service-btn"
                  onClick={enablegroup}
                  key={eachserIcon.resource_name}
                >
                  <img
                    src={eachserIcon.label_url}
                    id={eachserIcon.resource_name}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="modalbtns" ref={buttons}>
          {modalbtn && (
            <>
              <div
                className="flip-box-inner"
                style={{ animationDelay: ANIMATION_DELAY.text + "s" }}
              >
                <button
                  className="modalbtn"
                  onClick={() =>
                    setInfoModal({
                      type: "text",
                      urls: mediaRef["text"],
                    })
                  }
                  hidden={mediaRef && mediaRef["text"].length === 0}
                >
                  <div id="btnicon-container">
                    <img src={pptIcon} className="btnicon" />
                  </div>
                </button>
              </div>
              <div
                className="flip-box-inner2"
                style={{ animationDelay: ANIMATION_DELAY.image + "s" }}
              >
                <button
                  className="modalbtn"
                  onClick={() =>
                    setInfoModal({
                      type: "image",
                      urls: mediaRef["image"],
                    })
                  }
                  hidden={mediaRef && mediaRef["image"].length === 0}
                >
                  <div id="btnicon-container">
                    <img src={imageIcon} className="btnicon" />
                  </div>
                </button>
              </div>
              <div
                className="flip-box-inner3"
                style={{ animationDelay: ANIMATION_DELAY.pdf + "s" }}
              >
                <button
                  className="modalbtn"
                  onClick={() =>
                    setInfoModal({
                      type: "pdf",
                      urls: mediaRef["pdf"],
                    })
                  }
                  hidden={mediaRef && mediaRef["pdf"].length === 0}
                >
                  <div id="btnicon-container">
                    <img src={pdfIcon} className="btnicon" />
                  </div>
                </button>
              </div>
              <div
                className="flip-box-inner4"
                style={{ animationDelay: ANIMATION_DELAY.video + "s" }}
              >
                <button
                  className="modalbtn"
                  onClick={() =>
                    setInfoModal({
                      type: "video",
                      urls: mediaRef["video"],
                    })
                  }
                  hidden={mediaRef && mediaRef["video"].length === 0}
                >
                  <div id="videoicon-container">
                    <video
                      className="videoicon"
                      src={mediaRef["video"][0]}
                      autoPlay
                      loop
                      muted
                    />
                  </div>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Sectors Menu */}
        <div
          style={sectorList.length ? { display: "block" } : { display: "none" }}
        >
          <div id="Sectorlist">
            {sectorList.map((sectorName) => {
              return (
                <button
                  className="Highlightbtn"
                  onClick={showmainbtn}
                  key={sectorName}
                  id={sectorName}
                >
                  {sectorName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Menu */}
        <div
          style={
            serviceList.length ? { display: "block" } : { display: "none" }
          }
        >
          <div id="Servicelist">
            {serviceList.map((serviceName) => {
              return (
                <button
                  className="Highlightbtn"
                  onClick={showmainbtn}
                  key={serviceName}
                  id={serviceName}
                >
                  {serviceName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Carousel */}
        {infoModal && (
          <Carousel
            onBackDropClick={carouselBackdropClickHandler}
            type={infoModal.type}
            urls={infoModal.urls}
            itemTop={itemTop}
            itemLeft={itemLeft}
          />
        )}

        <Navigation />

        <div id="backdrop" ref={backdropRef} onClick={reset}></div>
      </div>
    </div>
  );
}

export default App;
