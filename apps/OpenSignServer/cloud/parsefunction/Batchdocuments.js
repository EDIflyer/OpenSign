import axios from 'axios';

const serverUrl = process.env.SERVER_URL;
const appId = process.env.APP_ID;

async function sendMail(document, sessionToken) {
  // console.log("pdfDetails", pdfDetails);
  const ExpireDate = new Date(document.createdAt);
  ExpireDate.setDate(ExpireDate.getDate() + 15);
  const newDate = ExpireDate;
  const localExpireDate = newDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const sender = document.ExtUserPtr.Email;
  const signerMail = document.Placeholders;
  for (let i = 0; i < signerMail.length; i++) {
    try {
      const imgPng = 'https://qikinnovation.ams3.digitaloceanspaces.com/logo.png';
      let url = `${serverUrl}/functions/sendmailv3/`;
      const headers = {
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': appId,
        sessionToken: sessionToken,
      };
      const serverurl = serverUrl;
      const newServer = serverurl.replaceAll('/', '%2F');
      const objectId = signerMail[i]?.signerObjId;
      const serverParams = `${newServer}&${appId}&contracts`;

      const hostUrl = 'staging-app.opensignlabs.com' + '/loadmf/signmicroapp'; //window.location.origin ;
      let signPdf;
      if (objectId) {
        signPdf = `${hostUrl}/login/${document.objectId}/${signerMail[i].signerPtr.Email}/${objectId}/${serverParams}`;
      } else {
        signPdf = `${hostUrl}/login/${document.objectId}/${signerMail[i].email}/${serverParams}`;
      }
      const openSignUrl = 'https://www.opensignlabs.com/';
      const themeBGcolor = '#47a3ad';
      let params = {
        recipient: objectId ? signerMail[i].signerPtr.Email : signerMail[i].email,
        subject: `${document.ExtUserPtr.Name} has requested you to sign ${document.Name}`,
        from: sender,
        html:
          "<html><head><meta http-equiv='Content-Type' content='text/html; charset=UTF-8' /> </head>   <body> <div style='background-color: #f5f5f5; padding: 20px'> <div   style=' box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;background-color: white;padding-bottom: 20px;'> <div><img src=" +
          imgPng +
          " height='50' style='padding: 20px,width:170px,height:40px' /></div>  <div  style=' padding: 2px;font-family: system-ui;background-color:" +
          themeBGcolor +
          ";'><p style='font-size: 20px;font-weight: 400;color: white;padding-left: 20px;' > Digital Signature Request</p></div><div><p style='padding: 20px;font-family: system-ui;font-size: 14px;   margin-bottom: 10px;'> " +
          document.ExtUserPtr.Name +
          ' has requested you to review and sign ' +
          document.Name +
          "</p><div style='padding: 5px 0px 5px 25px;display: flex;flex-direction: row;justify-content: space-around;'><table> <tr> <td style='font-weight:bold;font-family:sans-serif;font-size:15px'>Sender</td> <td> </td> <td  style='color:#626363;font-weight:bold'>" +
          sender +
          "</td></tr><tr><td style='font-weight:bold;font-family:sans-serif;font-size:15px'>Organization Name</td> <td> </td><td style='color:#626363;font-weight:bold'>__</td></tr> <tr> <td style='font-weight:bold;font-family:sans-serif;font-size:15px'>Expire on</td><td> </td> <td style='color:#626363;font-weight:bold'>" +
          localExpireDate +
          "</td></tr><tr> <td></td> <td> <div style='display: flex; justify-content: center;margin-top: 50px;'><a href=" +
          signPdf +
          ">  <button style='padding: 12px 20px 12px 20px;background-color: #d46b0f;color: white;  border: 0px;box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;font-weight:bold'>Sign here</button></a> </div> </td><td> </td></tr></table> </div><div style='display: flex; justify-content: center;margin-top: 10px;'> </div></div></div><div><p> This is an automated email from OpenSign. For any queries regarding this email, please contact the sender " +
          sender +
          ' directly.If you think this email is inappropriate or spam, you may file a complaint with OpenSign   <a href= ' +
          openSignUrl +
          ' target=_blank>here</a>.</p> </div></div></body> </html>',
      };
      const sendMail = await axios.post(url, params, { headers: headers });
      if (sendMail.data.result.status === 'success') {
        console.log('batch login mail sent');
      }
    } catch (error) {
      console.log('error', error);
    }
  }
}
export default async function batchdocuments(request) {
  const strDocuments = request.params.Documents;
  const sessionToken = request.headers['sessiontoken'];
  const Documents = JSON.parse(strDocuments);

  // console.log('Documents ', Documents);
  const parseConfig = {
    baseURL: serverUrl, //localStorage.getItem('baseUrl'),
    headers: {
      'X-Parse-Application-Id': appId,
      'X-Parse-Session-Token': sessionToken,
      'Content-Type': 'application/json',
    },
  };
  try {
    const requests = Documents.map(x => ({
      method: 'POST',
      path: '/app/classes/contracts_Document',
      body: {
        Name: x.Name,
        URL: x.URL,
        Note: x.Note,
        Description: x.Description,
        CreatedBy: x.CreatedBy,
        ExtUserPtr: {
          __type: 'Pointer',
          className: x.ExtUserPtr.className,
          objectId: x.ExtUserPtr.objectId,
        },
        Placeholders: x.Placeholders.map(y =>
          y?.signerPtr?.objectId
            ? {
                ...y,
                signerPtr: {
                  __type: 'Pointer',
                  className: y.signerPtr.className,
                  objectId: y.signerPtr.objectId,
                },
                signerObjId: y.signerObjId,
              }
            : { ...y, signerPtr: {}, signerObjId: '' }
        ),
        SignedUrl: x.SignedUrl,
        Signers: x.Signers.map(y => ({
          __type: 'Pointer',
          className: y.className,
          objectId: y.objectId,
        })),
      },
    }));
    // console.log('requests ', requests);

    const response = await axios.post('batch', { requests: requests }, parseConfig);
    // // Handle the batch query response
    // console.log('Batch query response:', response.data)
    if (response.data && response.data.length > 0) {
      const updateDocuments = Documents.map((x, i) => ({
        ...x,
        objectId: response.data[i]?.success?.objectId,
        createdAt: response.data[i]?.success.createdAt,
      }));
      for (let i = 0; i < updateDocuments.length; i++) {
        // console.log('updateDocuments ', updateDocuments);
        sendMail(updateDocuments[i], sessionToken);
      }
      return 'success';
    }

    // Handle individual responses within response.data.results
  } catch (error) {
    console.error('Error performing batch query:', error);
  }
}
