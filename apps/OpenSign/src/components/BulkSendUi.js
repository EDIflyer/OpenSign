import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import SuggestionInput from "./shared/fields/SuggestionInput";
import Loader from "../primitives/Loader";
import { useTranslation } from "react-i18next";

const BulkSendUi = (props) => {
  const { t } = useTranslation();
  const [forms, setForms] = useState([]);
  const [formId, setFormId] = useState(2);
  const formRef = useRef(null);
  const [scrollOnNextUpdate, setScrollOnNextUpdate] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [allowedForm, setAllowedForm] = useState(0);
  const [isSignatureExist, setIsSignatureExist] = useState();
  const allowedSigners = 50;
  useEffect(() => {
    signatureExist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //function to check atleast one signature field exist
  const signatureExist = () => {
    const getPlaceholder = props.item?.Placeholders;
    const checkIsSignatureExistt = getPlaceholder?.every((placeholderObj) =>
      placeholderObj?.placeHolder?.some((holder) =>
        holder?.pos?.some((posItem) => posItem?.type === "signature")
      )
    );
    setIsSignatureExist(checkIsSignatureExistt);
  };
  useEffect(() => {
    if (scrollOnNextUpdate && formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest"
      });
      setScrollOnNextUpdate(false);
    }
  }, [forms, scrollOnNextUpdate]);

  useEffect(() => {
    (() => {
      if (props?.Placeholders?.length > 0) {
        let users = [];
        props?.Placeholders?.forEach((element) => {
          if (!element.signerObjId) {
            users = [
              ...users,
              {
                fieldId: element.Id,
                email: "",
                label: element.Role,
                signer: {}
              }
            ];
          }
        });
        setForms((prevForms) => [...prevForms, { Id: 1, fields: users }]);
        const totalForms = Math.floor(allowedSigners / users?.length);
        setAllowedForm(totalForms);
      }
    })();
    // eslint-disable-next-line
  }, []);
  const handleInputChange = (index, signer, fieldIndex) => {
    const newForms = [...forms];
    newForms[index].fields[fieldIndex].email = signer?.Email
      ? signer?.Email
      : signer || "";
    newForms[index].fields[fieldIndex].signer = signer?.objectId ? signer : "";
    setForms(newForms);
  };

  const handleAddForm = (e) => {
    e.preventDefault();
    // Check if the quick send limit has been reached
    if (forms?.length < allowedForm) {
      if (props?.Placeholders.length > 0) {
        let newForm = [];
        props?.Placeholders?.forEach((element) => {
          if (!element.signerObjId) {
            newForm = [
              ...newForm,
              {
                fieldId: element.Id,
                email: "",
                label: element.Role,
                signer: {}
              }
            ];
          }
        });
        setForms([...forms, { Id: formId, fields: newForm }]);
      }
      setFormId(formId + 1);
      setScrollOnNextUpdate(true);
    } else {
      // If the limit has been reached, throw an error with the appropriate message
      alert(t("quick-send-alert-4"));
    }
  };

  const handleRemoveForm = (index) => {
    const updatedForms = forms.filter((_, i) => i !== index);
    setForms(updatedForms);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSubmit(true);

    // Create a copy of Placeholders array from props.item
    let Placeholders = [...props.item.Placeholders];
    // Initialize an empty array to store updated documents
    let Documents = [];
    // Loop through each form
    forms.forEach((form) => {
      //checking if user enter email which already exist as a signer then add user in a signers array
      let existSigner = [];
      form.fields.map((data) => {
        if (data.signer) {
          existSigner.push(data.signer);
        }
      });
      // Map through the copied Placeholders array to update email values
      const updatedPlaceholders = Placeholders.map((placeholder) => {
        // Find the field in the current form that matches the placeholder Id
        const field = form.fields.find(
          (element) => parseInt(element.fieldId) === placeholder.Id
        );
        // If a matching field is found, update the email value in the placeholder
        const signer = field?.signer?.objectId ? field.signer : "";
        if (field) {
          if (signer) {
            return {
              ...placeholder,
              signerObjId: field?.signer?.objectId || "",
              signerPtr: signer
            };
          } else {
            return {
              ...placeholder,
              email: field.email,
              signerObjId: field?.signer?.objectId || "",
              signerPtr: signer
            };
          }
        }
        // If no matching field is found, keep the placeholder as is
        return placeholder;
      });

      // Push a new document object with updated Placeholders into the Documents array
      if (existSigner?.length > 0) {
        Documents.push({
          ...props.item,
          Placeholders: updatedPlaceholders,
          Signers: props.item.Signers
            ? [...props.item.Signers, ...existSigner]
            : [...existSigner]
        });
      } else {
        Documents.push({
          ...props.item,
          Placeholders: updatedPlaceholders
        });
      }
    });
    //console.log("Documents ", Documents);
    await batchQuery(Documents);
  };

  const batchQuery = async (Documents) => {
    const serverUrl = localStorage.getItem("baseUrl");
    const functionsUrl = `${serverUrl}functions/batchdocuments`;
    const headers = {
      "Content-Type": "application/json",
      "X-Parse-Application-Id": localStorage.getItem("parseAppId"),
      sessionToken: localStorage.getItem("accesstoken")
    };
    const params = {
      Documents: JSON.stringify(Documents)
    };
    try {
      const res = await axios.post(functionsUrl, params, { headers: headers });
      // console.log("res ", res);
      if (res.data && res.data.result) {
        props.handleClose("success", Documents?.length);
      }
    } catch (err) {
      console.log("Err ", err);
      props.handleClose("error", 0);
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <>
      {isSubmit && (
        <div className="absolute z-[999] h-full w-full flex justify-center items-center bg-black bg-opacity-30">
          <Loader />
        </div>
      )}
      {props.Placeholders?.length > 0 ? (
        isSignatureExist ? (
          <>
            {props.Placeholders?.some((x) => !x.signerObjId) ? (
              <form onSubmit={handleSubmit}>
                <div className="min-h-max max-h-[250px] overflow-y-auto">
                  {forms?.map((form, index) => (
                    <div
                      key={form.Id}
                      className="p-3 op-card border-[1px] border-gray-400 mt-3 mx-4 mb-4 bg-base-200 text-base-content grid grid-cols-1 md:grid-cols-2 gap-2 relative"
                    >
                      {form?.fields?.map((field, fieldIndex) => (
                        <div className="flex flex-col" key={field.fieldId}>
                          <label>{field.label}</label>
                          <SuggestionInput
                            required
                            type="email"
                            value={field.value}
                            index={fieldIndex}
                            onChange={(signer) =>
                              handleInputChange(index, signer, fieldIndex)
                            }
                          />
                        </div>
                      ))}
                      {forms?.length > 1 && (
                        <button
                          onClick={() => handleRemoveForm(index)}
                          className="absolute right-3 top-1 text-[red] border-[1px] border-[red] rounded-lg w-[1.7rem] h-[1.7rem]"
                        >
                          <i className="fa-light fa-trash"></i>
                        </button>
                      )}
                      <div ref={formRef}></div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col mx-4 mb-4 gap-3">
                  <button
                    onClick={handleAddForm}
                    className="op-btn op-btn-primary focus:outline-none"
                  >
                    <i className="fa-light fa-plus"></i>{" "}
                    <span>{t("add-new")}</span>
                  </button>
                  <button
                    type="submit"
                    className="op-btn op-btn-secondary focus:outline-none"
                  >
                    <i className="fa-light fa-paper-plane"></i>{" "}
                    <span>{t("send")}</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-black p-3 bg-white w-full text-sm md:text-base flex justify-center items-center">
                {t("quick-send-alert-1")}
              </div>
            )}
          </>
        ) : (
          <div className="text-black p-3 bg-white w-full text-sm md:text-base flex justify-center items-center">
            {t("quick-send-alert-2")}
          </div>
        )
      ) : (
        <div className="text-black p-3 bg-white w-full text-sm md:text-base flex justify-center items-center">
          {t("quick-send-alert-3")}
        </div>
      )}
    </>
  );
};

export default BulkSendUi;
