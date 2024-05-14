import React, { useState, useEffect } from "react";
import RSC from "react-scrollbars-custom";
import { Document, Page } from "react-pdf";
import {
  defaultWidthHeight,
  handleImageResize,
  handleSignYourselfImageResize
} from "../../constant/Utils";
import Placeholder from "./Placeholder";
import Alert from "../../primitives/Alert";

function RenderPdf({
  pageNumber,
  drop,
  signerPos,
  successEmail,
  handleTabDrag,
  handleStop,
  isDragging,
  setIsSignPad,
  setIsStamp,
  handleDeleteSign,
  setSignKey,
  pdfDetails,
  xyPostion,
  pdfUrl,
  numPages,
  pageDetails,
  pdfRequest,
  setCurrentSigner,
  signerObjectId,
  signedSigners,
  setPdfLoadFail,
  placeholder,
  setSignerPos,
  setXyPostion,
  index,
  containerWH,
  setIsResize,
  handleLinkUser,
  setUniqueId,
  signersdata,
  setIsPageCopy,
  setSignerObjId,
  setShowDropdown,
  setIsInitial,
  setIsValidate,
  setWidgetType,
  setValidateAlert,
  setIsRadio,
  setCurrWidgetsDetails,
  setSelectWidgetId,
  selectWidgetId,
  unSignedWidgetId,
  setIsCheckbox,
  handleNameModal,
  handleTextSettingModal,
  setTempSignerId,
  uniqueId,
  setPdfRenderHeight,
  isResize,
  pdfOriginalWH,
  setTotalZoomPercent,
  scale
}) {
  const [isLoadPdf, setIsLoadPdf] = useState(false);
  const [containerScale, setContainerScale] = useState();
  const isMobile = window.innerWidth < 767;
  //check isGuestSigner is present in local if yes than handle login flow header in mobile view
  const isGuestSigner = localStorage.getItem("isGuestSigner");
  useEffect(() => {
    if (pdfOriginalWH) {
      const value = (containerWH.width / pdfOriginalWH.width) * 100;
      setTotalZoomPercent(value);
    }
  }, [pdfOriginalWH, containerWH]);
  // handle signature block width and height according to screen
  const posWidth = (pos, signYourself) => {
    const containerScale = containerWH.width / pdfOriginalWH.width;
    const defaultWidth = defaultWidthHeight(pos.type).width;
    const posWidth = pos.Width ? pos.Width : defaultWidth;
    if (signYourself) {
      return posWidth * scale * containerScale;
    } else {
      // if (isMobile && pos.scale) {
      //   if (!pos.isMobile) {
      //     if (pos.IsResize) {
      //       width = posWidth ? posWidth : defaultWidth;
      //       return width;
      //     } else {
      //       width = (posWidth || defaultWidth) / scale;

      //       return width;
      //     }
      //   } else {
      //     width = posWidth;
      //     return width;
      //   }
      // } else {
      //   if (pos.isMobile && pos.scale) {
      //     if (pos.IsResize) {
      //       width = posWidth ? posWidth : defaultWidth;
      //       return width;
      //     } else {
      //       width = (posWidth || defaultWidth) * pos.scale;
      //       return width;
      //     }
      //   } else if (pos.scale) {
      //     width = posWidth ? posWidth : defaultWidth;
      //     return width;
      //   } else {
      //     if (pos.IsResize) {
      //       pixelWidth = calculateResolutionWidth(
      //         posWidth,
      //         containerWH.widthF,
      //         containerWH.width
      //       );
      //       return pixelWidth;
      //     } else {
      //       return pixelWidth;
      //     }
      //   }
      // }
      return posWidth * scale;
    }
  };
  const posHeight = (pos, signYourself) => {
    const containerScale = containerWH.width / pdfOriginalWH.width;

    const posHeight = pos.Height || defaultWidthHeight(pos.type).height;
    if (signYourself) {
      return posHeight * scale * containerScale;
    } else {
      // if (isMobile && pos.scale) {
      //   if (!pos.isMobile) {
      //     if (pos.IsResize) {
      //       height = posHeight ? posHeight : defaultHeight;
      //       return height;
      //     } else {
      //       height = (posHeight || defaultHeight) / scale;

      //       return height;
      //     }
      //   } else {
      //     height = posHeight ? posHeight : defaultHeight;
      //     return height;
      //   }
      // } else {
      //   if (pos.isMobile && pos.scale) {
      //     if (pos.IsResize) {
      //       height = posHeight ? posHeight : defaultHeight;
      //       return height;
      //     } else {
      //       height = (posHeight || defaultHeight) * pos.scale;
      //       return height;
      //     }
      //   } else if (pos.scale) {
      //     height = posHeight ? posHeight : defaultHeight;
      //     return height;
      //   } else {
      //     if (pos.IsResize) {
      //       pixelHeight = calculateResolutionHeight(
      //         posUpdateHeight,
      //         pdfRenderHeight,
      //         pdfRenderHeight
      //       );
      //       return pixelHeight;
      //     } else {
      //       return pixelHeight;
      //     }
      //   }
      // }
      return posHeight * scale;
    }
  };

  const xPos = (pos, signYourself) => {
    const containerScale = containerWH.width / pdfOriginalWH.width;
    console.log("scale", containerScale);
    setContainerScale(containerScale);
    const resizePos = pos.xPosition;

    if (signYourself) {
      if (pos.scale === containerScale) {
        return resizePos * pos.scale;
      } else {
        return resizePos * containerScale * scale;
      }
    } else {
      //checking both condition mobile and desktop view
      if (pos.isMobile && pos.scale) {
        return pos.scale && resizePos * pos.scale;
      } else if (pos.scale === containerScale) {
        return resizePos * pos.scale;
      } else {
        // console.log("scalePos", resizePos , scale);
        return resizePos * containerScale;
      }
    }
  };
  const yPos = (pos, signYourself) => {
    const containerScale = containerWH.width / pdfOriginalWH.width;
    const resizePos = pos.yPosition;

    if (signYourself) {
      if (pos.scale === containerScale) {
        return resizePos * pos.scale;
      } else {
        return resizePos * containerScale * scale;
      }
    } else {
      // checking both condition mobile and desktop view
      if (pos.isMobile && pos.scale) {
        return pos.scale && resizePos * pos.scale;
      } else if (pos.scale === containerScale) {
        return resizePos * pos.scale;
      } else {
        return resizePos * containerScale;
      }
    }
  };

  //function for render placeholder block over pdf document
  const CheckSignedSignes = ({ data }) => {
    const checkSign = signedSigners.filter(
      (sign) => sign.objectId === data.signerObjId
    );
    useEffect(() => {
      if (data.signerObjId === signerObjectId) {
        setCurrentSigner(true);
      }
    }, [data.signerObjId]);

    const handleAllUserName = (Id, Role, type) => {
      return pdfDetails[0].Signers.map((signerData, key) => {
        return (
          signerData.objectId === data.signerObjId && (
            <React.Fragment key={key}>
              {signerData?.Name && (
                <div style={{ color: "black", fontSize: 8, fontWeight: "500" }}>
                  {signerData.Name}
                </div>
              )}
              {type && (
                <div style={{ fontWeight: "700", fontSize: 11 }}>{type}</div>
              )}
              {Role && (
                <div style={{ color: "black", fontSize: 8, fontWeight: "500" }}>
                  {`(${Role})`}
                </div>
              )}
            </React.Fragment>
          )
        );
      });
    };

    return (
      checkSign.length === 0 &&
      data.placeHolder.map((placeData, key) => {
        return (
          <React.Fragment key={key}>
            {placeData.pageNumber === pageNumber &&
              placeData.pos.map((pos) => {
                return (
                  pos && (
                    <React.Fragment key={pos.key}>
                      <Placeholder
                        pos={pos}
                        setSignKey={setSignKey}
                        setIsSignPad={setIsSignPad}
                        setIsStamp={setIsStamp}
                        handleSignYourselfImageResize={handleImageResize}
                        index={pageNumber}
                        xyPostion={signerPos}
                        setXyPostion={setSignerPos}
                        data={data}
                        setIsResize={setIsResize}
                        isResize={isResize}
                        isShowBorder={false}
                        signerObjId={signerObjectId}
                        isShowDropdown={true}
                        isNeedSign={true}
                        isSignYourself={false}
                        xPos={xPos}
                        yPos={yPos}
                        posWidth={posWidth}
                        posHeight={posHeight}
                        handleUserName={handleAllUserName}
                        isDragging={false}
                        pdfDetails={pdfDetails}
                        setIsInitial={setIsInitial}
                        setValidateAlert={setValidateAlert}
                        unSignedWidgetId={unSignedWidgetId}
                        setSelectWidgetId={setSelectWidgetId}
                        selectWidgetId={selectWidgetId}
                        setCurrWidgetsDetails={setCurrWidgetsDetails}
                      />
                    </React.Fragment>
                  )
                );
              })}
          </React.Fragment>
        );
      })
    );
  };

  //function for render placeholder block over pdf document

  const handleUserName = (Id, Role, type) => {
    if (Id) {
      const checkSign = signersdata.find((sign) => sign.Id === Id);
      if (checkSign?.Name) {
        return (
          <>
            <div style={{ color: "black", fontSize: 8, fontWeight: "500" }}>
              {checkSign?.Name}
            </div>
            {type && (
              <div style={{ fontWeight: "700", fontSize: 11 }}>{type}</div>
            )}
            {Role && (
              <div style={{ color: "black", fontSize: 8, fontWeight: "500" }}>
                {`(${Role})`}
              </div>
            )}
          </>
        );
      } else {
        return (
          <>
            {type && (
              <div style={{ fontWeight: "700", fontSize: 11 }}>{type}</div>
            )}
            <div style={{ color: "black", fontSize: 8, fontWeight: "500" }}>
              {Role}
            </div>
          </>
        );
      }
    } else {
      return (
        <>
          {type && (
            <div style={{ fontWeight: "700", fontSize: 11 }}>{type}</div>
          )}
          <div style={{ color: "black", fontSize: 8, fontWeight: "500" }}>
            {Role}
          </div>
        </>
      );
    }
  };
  console.log("scale", scale);
  return (
    <>
      {successEmail && <Alert type={"success"}>Email sent successfully!</Alert>}
      {isMobile ? (
        <div
          style={{
            border: "0.1px solid #ebe8e8",
            marginTop: isGuestSigner && "30px"
          }}
          ref={drop}
          id="container"
        >
          {isLoadPdf &&
            (pdfRequest
              ? signerPos.map((data, key) => {
                  return (
                    <React.Fragment key={key}>
                      <CheckSignedSignes data={data} />
                    </React.Fragment>
                  );
                })
              : placeholder // placeholder mobile
                ? signerPos.map((data, ind) => {
                    return (
                      <React.Fragment key={ind}>
                        {data.placeHolder.map((placeData, index) => {
                          return (
                            <React.Fragment key={index}>
                              {placeData.pageNumber === pageNumber &&
                                placeData.pos.map((pos) => {
                                  return (
                                    <React.Fragment key={pos.key}>
                                      <Placeholder
                                        pos={pos}
                                        setIsPageCopy={setIsPageCopy}
                                        setSignKey={setSignKey}
                                        handleDeleteSign={handleDeleteSign}
                                        setIsStamp={setIsStamp}
                                        handleTabDrag={handleTabDrag}
                                        handleStop={handleStop}
                                        handleSignYourselfImageResize={
                                          handleImageResize
                                        }
                                        index={pageNumber}
                                        xyPostion={signerPos}
                                        setXyPostion={setSignerPos}
                                        setSignerObjId={setSignerObjId}
                                        data={data}
                                        setIsResize={setIsResize}
                                        setShowDropdown={setShowDropdown}
                                        isShowBorder={true}
                                        isPlaceholder={true}
                                        setUniqueId={setUniqueId}
                                        handleLinkUser={handleLinkUser}
                                        handleUserName={handleUserName}
                                        isSignYourself={false}
                                        xPos={xPos}
                                        yPos={yPos}
                                        posWidth={posWidth}
                                        posHeight={posHeight}
                                        isDragging={isDragging}
                                        setIsValidate={setIsValidate}
                                        setWidgetType={setWidgetType}
                                        setIsRadio={setIsRadio}
                                        setIsCheckbox={setIsCheckbox}
                                        setCurrWidgetsDetails={
                                          setCurrWidgetsDetails
                                        }
                                        setSelectWidgetId={setSelectWidgetId}
                                        selectWidgetId={selectWidgetId}
                                        handleNameModal={handleNameModal}
                                        setTempSignerId={setTempSignerId}
                                        uniqueId={uniqueId}
                                        handleTextSettingModal={
                                          handleTextSettingModal
                                        }
                                      />
                                    </React.Fragment>
                                  );
                                })}
                            </React.Fragment>
                          );
                        })}
                      </React.Fragment>
                    );
                  })
                : xyPostion.map((data, ind) => {
                    return (
                      <React.Fragment key={ind}>
                        {data.pageNumber === pageNumber &&
                          data.pos.map((pos) => {
                            return (
                              pos && (
                                <Placeholder
                                  pos={pos}
                                  setIsPageCopy={setIsPageCopy}
                                  setSignKey={setSignKey}
                                  handleDeleteSign={handleDeleteSign}
                                  setIsStamp={setIsStamp}
                                  handleTabDrag={handleTabDrag}
                                  handleStop={handleStop}
                                  handleSignYourselfImageResize={
                                    handleSignYourselfImageResize
                                  }
                                  index={index}
                                  xyPostion={xyPostion}
                                  setXyPostion={setXyPostion}
                                  containerWH={containerWH}
                                  setIsSignPad={setIsSignPad}
                                  isShowBorder={true}
                                  isSignYourself={true}
                                  xPos={xPos}
                                  yPos={yPos}
                                  posWidth={posWidth}
                                  posHeight={posHeight}
                                  pdfDetails={pdfDetails[0]}
                                  isDragging={isDragging}
                                  setIsInitial={setIsInitial}
                                  setWidgetType={setWidgetType}
                                  setSelectWidgetId={setSelectWidgetId}
                                  selectWidgetId={selectWidgetId}
                                  handleUserName={handleUserName}
                                  setIsCheckbox={setIsCheckbox}
                                  setValidateAlert={setValidateAlert}
                                  setCurrWidgetsDetails={setCurrWidgetsDetails}
                                  handleTextSettingModal={
                                    handleTextSettingModal
                                  }
                                />
                              )
                            );
                          })}
                      </React.Fragment>
                    );
                  }))}

          {/* this component for render pdf document is in middle of the component */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Document
              onLoadError={() => {
                setPdfLoadFail(true);
              }}
              loading={"Loading Document.."}
              onLoadSuccess={pageDetails}
              // ref={pdfRef}'
              onClick={() => {
                if (setSelectWidgetId) {
                  setSelectWidgetId("");
                }
              }}
              file={
                pdfUrl
                  ? pdfUrl
                  : pdfDetails[0] && pdfDetails[0].SignedUrl
                    ? pdfDetails[0].SignedUrl
                    : pdfDetails[0].URL
              }
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page
                  onLoadSuccess={({ height }) => {
                    setPdfRenderHeight && setPdfRenderHeight(height);
                    setIsLoadPdf(true);
                  }}
                  key={index}
                  pageNumber={pageNumber}
                  width={containerWH.width}
                  height={containerWH.height}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  onGetAnnotationsError={(error) => {
                    console.log("annotation error", error);
                  }}
                />
              ))}
            </Document>
          </div>
        </div>
      ) : (
        <RSC
          style={{
            position: "relative",
            boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
            height: window.innerHeight + "px"
          }}
          noScrollY={false}
          // noScrollX={true}
          noScrollX={scale === 1 ? true : false}
        >
          <div
            // className={`  autoSignScroll border-[0.1px] border-[#ebe8e8] max-h-screen relative  overflow-auto`}
            style={{
              marginTop: isGuestSigner && "30px"
            }}
            ref={drop}
            id="container"
          >
            {isLoadPdf &&
              (pdfRequest
                ? signerPos?.map((data, key) => {
                    return (
                      <React.Fragment key={key}>
                        <CheckSignedSignes data={data} />
                      </React.Fragment>
                    );
                  })
                : placeholder
                  ? signerPos.map((data, ind) => {
                      return (
                        <React.Fragment key={ind}>
                          {data.placeHolder.map((placeData, index) => {
                            return (
                              <React.Fragment key={index}>
                                {placeData.pageNumber === pageNumber &&
                                  placeData.pos.map((pos) => {
                                    return (
                                      <React.Fragment key={pos.key}>
                                        <Placeholder
                                          pos={pos}
                                          setIsPageCopy={setIsPageCopy}
                                          setSignKey={setSignKey}
                                          handleDeleteSign={handleDeleteSign}
                                          setIsStamp={setIsStamp}
                                          handleTabDrag={handleTabDrag}
                                          handleStop={handleStop}
                                          handleSignYourselfImageResize={
                                            handleImageResize
                                          }
                                          index={pageNumber}
                                          xyPostion={signerPos}
                                          setXyPostion={setSignerPos}
                                          setSignerObjId={setSignerObjId}
                                          data={data}
                                          setIsResize={setIsResize}
                                          setShowDropdown={setShowDropdown}
                                          isShowBorder={true}
                                          isPlaceholder={true}
                                          setUniqueId={setUniqueId}
                                          handleLinkUser={handleLinkUser}
                                          handleUserName={handleUserName}
                                          isSignYourself={false}
                                          xPos={xPos}
                                          yPos={yPos}
                                          posWidth={posWidth}
                                          posHeight={posHeight}
                                          isDragging={isDragging}
                                          setIsValidate={setIsValidate}
                                          setWidgetType={setWidgetType}
                                          setIsRadio={setIsRadio}
                                          setIsCheckbox={setIsCheckbox}
                                          setCurrWidgetsDetails={
                                            setCurrWidgetsDetails
                                          }
                                          setSelectWidgetId={setSelectWidgetId}
                                          selectWidgetId={selectWidgetId}
                                          handleNameModal={handleNameModal}
                                          setTempSignerId={setTempSignerId}
                                          uniqueId={uniqueId}
                                          handleTextSettingModal={
                                            handleTextSettingModal
                                          }
                                        />
                                      </React.Fragment>
                                    );
                                  })}
                              </React.Fragment>
                            );
                          })}
                        </React.Fragment>
                      );
                    })
                  : xyPostion.map((data, ind) => {
                      return (
                        <React.Fragment key={ind}>
                          {data.pageNumber === pageNumber &&
                            data.pos.map((pos) => {
                              return (
                                pos && (
                                  <React.Fragment key={pos.key}>
                                    <Placeholder
                                      pos={pos}
                                      setIsPageCopy={setIsPageCopy}
                                      setSignKey={setSignKey}
                                      handleDeleteSign={handleDeleteSign}
                                      setIsStamp={setIsStamp}
                                      handleTabDrag={handleTabDrag}
                                      handleStop={(event, dragElement) =>
                                        handleStop(event, dragElement, pos.type)
                                      }
                                      handleSignYourselfImageResize={
                                        handleSignYourselfImageResize
                                      }
                                      index={index}
                                      xyPostion={xyPostion}
                                      setXyPostion={setXyPostion}
                                      containerWH={containerWH}
                                      setIsSignPad={setIsSignPad}
                                      isShowBorder={true}
                                      isSignYourself={true}
                                      xPos={xPos}
                                      yPos={yPos}
                                      posWidth={posWidth}
                                      posHeight={posHeight}
                                      pdfDetails={pdfDetails[0]}
                                      isDragging={isDragging}
                                      setIsInitial={setIsInitial}
                                      setWidgetType={setWidgetType}
                                      setSelectWidgetId={setSelectWidgetId}
                                      selectWidgetId={selectWidgetId}
                                      handleUserName={handleUserName}
                                      setIsCheckbox={setIsCheckbox}
                                      setValidateAlert={setValidateAlert}
                                      setCurrWidgetsDetails={
                                        setCurrWidgetsDetails
                                      }
                                      handleTextSettingModal={
                                        handleTextSettingModal
                                      }
                                      scale={scale}
                                      containerScale={containerScale}
                                    />
                                  </React.Fragment>
                                )
                              );
                            })}
                        </React.Fragment>
                      );
                    }))}

            {/* this component for render pdf document is in middle of the component */}
            <Document
              onLoadError={() => {
                const load = {
                  status: false,
                  type: "failed"
                };
                setPdfLoadFail(load);
              }}
              loading={"Loading Document.."}
              onLoadSuccess={pageDetails}
              onClick={() => {
                if (setSelectWidgetId) {
                  setSelectWidgetId("");
                }
              }}
              // ref={pdfRef}
              file={
                pdfUrl
                  ? pdfUrl
                  : pdfDetails[0] && pdfDetails[0].SignedUrl
                    ? pdfDetails[0].SignedUrl
                    : pdfDetails[0].URL
              }
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page
                  onLoadSuccess={({ height }) => {
                    setPdfRenderHeight && setPdfRenderHeight(height);
                    setIsLoadPdf(true);
                  }}
                  key={index}
                  width={containerWH.width}
                  scale={scale || 1}
                  // scale={1}
                  // height={containerWH.height}
                  pageNumber={pageNumber}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  onGetAnnotationsError={(error) => {
                    console.log("annotation error", error);
                  }}
                />
              ))}
            </Document>
          </div>
        </RSC>
      )}
    </>
  );
}

export default RenderPdf;
