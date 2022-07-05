import { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import PdfViewer from "./PdfViewer";
import "./Carousel.css";

function MyCarousel({ onBackDropClick, type, urls, itemTop, itemLeft }) {
  useEffect(() => {
    console.log({ type, urls, itemTop, itemLeft });
    // if (itemTop > 700) {
    //   document.getElementById("my-carousel").style.top = `${itemTop}px`;
    //   document.getElementById("my-carousel").style.left = `${itemLeft + 500}px`;
    // } else {
    //   document.getElementById("my-carousel").style.top = `${itemTop + 200}px`;
    //   document.getElementById("my-carousel").style.left = `${itemLeft + 500}px`;
    // }
  }, []);

  const [autoplay, Setautoplay] = useState(false);
  const videoRef = useRef(null);
  let carouselarray = document.querySelectorAll(
    ".carousel-inner .carousel-item"
  );
  const handleSelect = (selectedIndex, e) => {
    carouselarray.forEach((random) => {
      console.log(random.classList.value === "active carousel-item");
      if (random.childNodes[0].id == "player") {
        if (random.classList.value === "active carousel-item") {
          random.childNodes[0].pause();
        } else {
          random.childNodes[0].play();
        }
      }
    });
  };

  return (
    <div id="my-carousel-wrapper">
      <div id="carousel-backdrop" onClick={onBackDropClick}></div>
      <div id="my-carousel" className="ratio ratio-16x9">
        <Carousel interval={null} onSelect={handleSelect}>
          {urls.map((url, i) => (
            <Carousel.Item key={i}>
              {type === "video" && (
                <video
                  ref={videoRef}
                  id="player"
                  src={url}
                  loop
                  controls
                  autoPlay="autoplay"
                  // autoPlay={autoplay}
                ></video>
              )}
              {type === "image" && <img src={url} />}
              {type === "text" && typeof url === "string" && (
                <div className="text-container">{url}</div>
              )}
              {type === "pdf" && <PdfViewer url={url} />}
              {/* <Carousel.Caption>Test-1</Carousel.Caption> */}
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default MyCarousel;
