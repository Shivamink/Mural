import React, { useEffect, useRef } from "react";
import * as PDFObject from "pdfobject";

function PdfViewer({ url }) {
  /**
   * @type {React.RefObject<HTMLDivElement>}
   */
  const pdfRef = useRef(null);

  useEffect(() => {
    console.log(url);
    PDFObject.embed(url + "#toolbar=0&navpanes=0&scrollbar=0", pdfRef.current);
  }, [url]);

  return <div ref={pdfRef} className="pdf-container"></div>;
}

export default PdfViewer;
