"use strict";(self.webpackChunkOpenSign_Docs=self.webpackChunkOpenSign_Docs||[]).push([[8766],{6809:(e,a,s)=>{s.r(a),s.d(a,{assets:()=>x,contentTitle:()=>u,default:()=>b,frontMatter:()=>h,metadata:()=>j,toc:()=>f});var l=s(85893),n=s(11151),t=s(58219),i=(s(62316),s(51039)),o=s.n(i),r=(s(82723),s(9487)),d=(s(41429),s(5397)),c=s(4667),p=s(9472),m=s(85162);const h={id:"save-update-webhook",title:"Save or Update Webhook",description:"The save or update Webhook API allow you to save webhook url which is used to capture document signature completion event",sidebar_label:"Save or Update Webhook",hide_title:!0,hide_table_of_contents:!0,api:"eJzNVm2LGzcQ/ivKfCgNrN+SK5SllFzDEY6E3lHf0Q+2OeTdsVexVlL0Ynsx+9/LaHd9a19iUihtv5j1aEYzzyPNMzqA52sH6Qz+xGWh9QYWCeToMiuMF1pBCg8FMse3yLRlweTcI2t92fX9LeNS6h2rdGBeN367djVYyXaFyAomHAsOc/LIuPHBIst1FkpUnjmxVjyaMl0aiZSV4RaVhwS0QcvJcptDCrT7D00JXbUJWPwS0PnfdF5Bejir/d7qrciRLZGKNNzyEj3aWIhFgpJp5XlGueiLsqYH4MZIkcXEo8+OdjqAywosOX1RRmExJ9YerSTGfGUQUtDLzxj3MpYq9wIdBZBTeuicnLdCrSGBlbYl930L7jlRACkU3huXjkaVDnbQEjoIVr5rXYaZLqGuE/DCx4DW52lJPNQ1LVl0RivX1PBmPH5JzzRkGTq3CpIdmf47TFyGbdEF6b+G/Blnd5OaU82ZO1Ykq1cnAIWSQuFTB+rpzXj89HOL9Go8+V+Ds5JxaZHnFcO9cN5dhkZwOmBXL4E9OrRMac9WOqj81T+HCa3V9jKk89yXYVwdYfz0Esat2nIp8igiD3qD6t9F0k/vm/RU6r6Mvap42UCKTnEdTqD27Q1Ih1mwwleQzg6wH3AjBs16OlvUiwRK9IUmGTPaxYq5LyCF0e4oZQ7tFq2LGwTSjKMMOM/XQq0H3JihNqhINCVfOpKBETditJ0A5ehqmBJPDRUnlRwJ4UZ8xAqSDmjfKwFB51Mgz9FGUoj+P5519qYjsZW271Qr2nelYxEtjXcG1VSsVTyE7QRejh7haHjQcjcw4oVgK23ZWTRbcpoxWjFfYFwk+9vhhDmDmVi1d2nI5mquprpEmkmkDlKojUvnasBmd6uVyASXNOGc8Lj4sYO22+1eMP86xnwQvghLZtHoZ/d1NMbj6Ucd/7yGBDza0t2tpmi3IutE/xupRtF51HYIDSy65SUXRH9renceRJRLkaFy2LvT1x/uP7G3wzEkvUv2HSWPPt2+v/l9ekO70jVtjmgyHA/HZKJbXXLVSzRtHw2PJ4+G80M+PPf8f/rUaBvD496PjOQi9ntoJnfTqrNuyNLEL6iJ0xkcDnTtHq2sazJ/CWhJARYJbLkVfEn3fLaok66dqLc3WEEK7xvYgwdKTO4yNJ15Jnt10kVcZxkaf9G3rzP3d9MHSGDZvoxKnVOM5Tt6NfEdpDCHOcRXFu3QjDWyH0BytQ58Tf7NvqQCPBALfQnZRAlpPwhZt6SqXpWn2tJAoV8C9tWAX+iwP2L169G9WflmQMtt501nt6jr+i8u+cVl",sidebar_class_name:"post api-method",info_path:"docs/API-docs/opensign-api-v-1",custom_edit_url:null},u=void 0,j={id:"API-docs/save-update-webhook",title:"Save or Update Webhook",description:"The save or update Webhook API allow you to save webhook url which is used to capture document signature completion event",source:"@site/docs/API-docs/save-update-webhook.api.mdx",sourceDirName:"API-docs",slug:"/API-docs/save-update-webhook",permalink:"/docs/API-docs/save-update-webhook",draft:!1,unlisted:!1,editUrl:null,tags:[],version:"current",frontMatter:{id:"save-update-webhook",title:"Save or Update Webhook",description:"The save or update Webhook API allow you to save webhook url which is used to capture document signature completion event",sidebar_label:"Save or Update Webhook",hide_title:!0,hide_table_of_contents:!0,api:"eJzNVm2LGzcQ/ivKfCgNrN+SK5SllFzDEY6E3lHf0Q+2OeTdsVexVlL0Ynsx+9/LaHd9a19iUihtv5j1aEYzzyPNMzqA52sH6Qz+xGWh9QYWCeToMiuMF1pBCg8FMse3yLRlweTcI2t92fX9LeNS6h2rdGBeN367djVYyXaFyAomHAsOc/LIuPHBIst1FkpUnjmxVjyaMl0aiZSV4RaVhwS0QcvJcptDCrT7D00JXbUJWPwS0PnfdF5Bejir/d7qrciRLZGKNNzyEj3aWIhFgpJp5XlGueiLsqYH4MZIkcXEo8+OdjqAywosOX1RRmExJ9YerSTGfGUQUtDLzxj3MpYq9wIdBZBTeuicnLdCrSGBlbYl930L7jlRACkU3huXjkaVDnbQEjoIVr5rXYaZLqGuE/DCx4DW52lJPNQ1LVl0RivX1PBmPH5JzzRkGTq3CpIdmf47TFyGbdEF6b+G/Blnd5OaU82ZO1Ykq1cnAIWSQuFTB+rpzXj89HOL9Go8+V+Ds5JxaZHnFcO9cN5dhkZwOmBXL4E9OrRMac9WOqj81T+HCa3V9jKk89yXYVwdYfz0Esat2nIp8igiD3qD6t9F0k/vm/RU6r6Mvap42UCKTnEdTqD27Q1Ih1mwwleQzg6wH3AjBs16OlvUiwRK9IUmGTPaxYq5LyCF0e4oZQ7tFq2LGwTSjKMMOM/XQq0H3JihNqhINCVfOpKBETditJ0A5ehqmBJPDRUnlRwJ4UZ8xAqSDmjfKwFB51Mgz9FGUoj+P5519qYjsZW271Qr2nelYxEtjXcG1VSsVTyE7QRejh7haHjQcjcw4oVgK23ZWTRbcpoxWjFfYFwk+9vhhDmDmVi1d2nI5mquprpEmkmkDlKojUvnasBmd6uVyASXNOGc8Lj4sYO22+1eMP86xnwQvghLZtHoZ/d1NMbj6Ucd/7yGBDza0t2tpmi3IutE/xupRtF51HYIDSy65SUXRH9renceRJRLkaFy2LvT1x/uP7G3wzEkvUv2HSWPPt2+v/l9ekO70jVtjmgyHA/HZKJbXXLVSzRtHw2PJ4+G80M+PPf8f/rUaBvD496PjOQi9ntoJnfTqrNuyNLEL6iJ0xkcDnTtHq2sazJ/CWhJARYJbLkVfEn3fLaok66dqLc3WEEK7xvYgwdKTO4yNJ15Jnt10kVcZxkaf9G3rzP3d9MHSGDZvoxKnVOM5Tt6NfEdpDCHOcRXFu3QjDWyH0BytQ58Tf7NvqQCPBALfQnZRAlpPwhZt6SqXpWn2tJAoV8C9tWAX+iwP2L169G9WflmQMtt501nt6jr+i8u+cVl",sidebar_class_name:"post api-method",info_path:"docs/API-docs/opensign-api-v-1",custom_edit_url:null},sidebar:"apiSidebar",previous:{title:"Get Webhook",permalink:"/docs/API-docs/get-webhook"},next:{title:"Delete Webhook",permalink:"/docs/API-docs/delete-webhook"}},x={},f=[{value:"Request",id:"request",level:2}];function v(e){const a={h2:"h2",p:"p",...(0,n.a)(),...e.components},{Details:s}=a;return s||function(e,a){throw new Error("Expected "+(a?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("h1",{className:"openapi__heading",children:(0,l.jsx)(a.p,{children:"Save or Update Webhook"})}),"\n",(0,l.jsx)(o(),{method:"post",path:"/webhook"}),"\n",(0,l.jsx)(a.p,{children:"The save or update Webhook API allow you to save webhook url which is used to capture document signature completion event"}),"\n",(0,l.jsx)(a.h2,{id:"request",children:"Request"}),"\n",(0,l.jsx)(r.Z,{className:"openapi-tabs__mime",children:(0,l.jsx)(m.default,{label:"application/json",value:"application/json-schema",children:(0,l.jsxs)(s,{style:{},className:"openapi-markdown__details mime","data-collapsed":!1,open:!0,children:[(0,l.jsx)("summary",{style:{},className:"openapi-markdown__details-summary-mime",children:(0,l.jsx)("h3",{className:"openapi-markdown__details-summary-header-body",children:(0,l.jsx)(a.p,{children:"Body"})})}),(0,l.jsx)("div",{style:{textAlign:"left",marginLeft:"1rem"},children:(0,l.jsx)("div",{style:{marginTop:"1rem",marginBottom:"1rem"},children:(0,l.jsx)(a.p,{children:"Provide below parameter to create contact"})})}),(0,l.jsx)("ul",{style:{marginLeft:"1rem"},children:(0,l.jsx)(c.Z,{collapsible:!1,name:"Url",required:!0,schemaName:"string",qualifierMessage:void 0,schema:{type:"string",format:"string",example:"https://your-webhook-url@example.com"}})})]})})}),"\n",(0,l.jsx)("div",{children:(0,l.jsx)("div",{children:(0,l.jsxs)(t.Z,{children:[(0,l.jsxs)(m.default,{label:"200",value:"200",children:[(0,l.jsx)("div",{children:(0,l.jsx)(a.p,{children:"Successful operation"})}),(0,l.jsx)("div",{children:(0,l.jsx)(r.Z,{className:"openapi-tabs__mime",schemaType:"response",children:(0,l.jsx)(m.default,{label:"application/json",value:"application/json",children:(0,l.jsxs)(p.default,{className:"openapi-tabs__schema",children:[(0,l.jsx)(m.default,{label:"Schema",value:"Schema",children:(0,l.jsxs)(s,{style:{},className:"openapi-markdown__details response","data-collapsed":!1,open:!0,children:[(0,l.jsx)("summary",{style:{},className:"openapi-markdown__details-summary-response",children:(0,l.jsx)("strong",{children:(0,l.jsx)(a.p,{children:"Schema"})})}),(0,l.jsx)("div",{style:{textAlign:"left",marginLeft:"1rem"}}),(0,l.jsx)("ul",{style:{marginLeft:"1rem"},children:(0,l.jsx)(c.Z,{collapsible:!1,name:"result",required:!1,schemaName:"string",qualifierMessage:void 0,schema:{type:"string",example:"Webhook updated successfully!"}})})]})}),(0,l.jsx)(m.default,{label:"Example (from schema)",value:"Example (from schema)",children:(0,l.jsx)(d.Z,{responseExample:'{\n  "result": "Webhook updated successfully!"\n}',language:"json"})})]})})})})]}),(0,l.jsxs)(m.default,{label:"401",value:"401",children:[(0,l.jsx)("div",{children:(0,l.jsx)(a.p,{children:"Successful operation"})}),(0,l.jsx)("div",{children:(0,l.jsx)(r.Z,{className:"openapi-tabs__mime",schemaType:"response",children:(0,l.jsx)(m.default,{label:"application/json",value:"application/json",children:(0,l.jsxs)(p.default,{className:"openapi-tabs__schema",children:[(0,l.jsx)(m.default,{label:"Schema",value:"Schema",children:(0,l.jsxs)(s,{style:{},className:"openapi-markdown__details response","data-collapsed":!1,open:!0,children:[(0,l.jsx)("summary",{style:{},className:"openapi-markdown__details-summary-response",children:(0,l.jsx)("strong",{children:(0,l.jsx)(a.p,{children:"Schema"})})}),(0,l.jsx)("div",{style:{textAlign:"left",marginLeft:"1rem"}}),(0,l.jsx)("ul",{style:{marginLeft:"1rem"},children:(0,l.jsx)(c.Z,{collapsible:!1,name:"result",required:!1,schemaName:"string",qualifierMessage:void 0,schema:{type:"string",example:"Webhook url already exists!"}})})]})}),(0,l.jsx)(m.default,{label:"Example (from schema)",value:"Example (from schema)",children:(0,l.jsx)(d.Z,{responseExample:'{\n  "result": "Webhook url already exists!"\n}',language:"json"})})]})})})})]}),(0,l.jsxs)(m.default,{label:"404",value:"404",children:[(0,l.jsx)("div",{children:(0,l.jsx)(a.p,{children:"User not found!"})}),(0,l.jsx)("div",{children:(0,l.jsx)(r.Z,{className:"openapi-tabs__mime",schemaType:"response",children:(0,l.jsx)(m.default,{label:"application/json",value:"application/json",children:(0,l.jsxs)(p.default,{className:"openapi-tabs__schema",children:[(0,l.jsx)(m.default,{label:"Schema",value:"Schema",children:(0,l.jsxs)(s,{style:{},className:"openapi-markdown__details response","data-collapsed":!1,open:!0,children:[(0,l.jsx)("summary",{style:{},className:"openapi-markdown__details-summary-response",children:(0,l.jsx)("strong",{children:(0,l.jsx)(a.p,{children:"Schema"})})}),(0,l.jsx)("div",{style:{textAlign:"left",marginLeft:"1rem"}}),(0,l.jsx)("ul",{style:{marginLeft:"1rem"},children:(0,l.jsx)(c.Z,{collapsible:!1,name:"error",required:!1,schemaName:"string",qualifierMessage:void 0,schema:{type:"string",example:"User not found!"}})})]})}),(0,l.jsx)(m.default,{label:"Example (from schema)",value:"Example (from schema)",children:(0,l.jsx)(d.Z,{responseExample:'{\n  "error": "User not found!"\n}',language:"json"})})]})})})})]}),(0,l.jsxs)(m.default,{label:"405",value:"405",children:[(0,l.jsx)("div",{children:(0,l.jsx)(a.p,{children:"Invalid API Token!"})}),(0,l.jsx)("div",{children:(0,l.jsx)(r.Z,{className:"openapi-tabs__mime",schemaType:"response",children:(0,l.jsx)(m.default,{label:"application/json",value:"application/json",children:(0,l.jsxs)(p.default,{className:"openapi-tabs__schema",children:[(0,l.jsx)(m.default,{label:"Schema",value:"Schema",children:(0,l.jsxs)(s,{style:{},className:"openapi-markdown__details response","data-collapsed":!1,open:!0,children:[(0,l.jsx)("summary",{style:{},className:"openapi-markdown__details-summary-response",children:(0,l.jsx)("strong",{children:(0,l.jsx)(a.p,{children:"Schema"})})}),(0,l.jsx)("div",{style:{textAlign:"left",marginLeft:"1rem"}}),(0,l.jsx)("ul",{style:{marginLeft:"1rem"},children:(0,l.jsx)(c.Z,{collapsible:!1,name:"error",required:!1,schemaName:"string",qualifierMessage:void 0,schema:{type:"string",example:"Invalid API token!"}})})]})}),(0,l.jsx)(m.default,{label:"Example (from schema)",value:"Example (from schema)",children:(0,l.jsx)(d.Z,{responseExample:'{\n  "error": "Invalid API token!"\n}',language:"json"})})]})})})})]})]})})})]})}function b(e={}){const{wrapper:a}={...(0,n.a)(),...e.components};return a?(0,l.jsx)(a,{...e,children:(0,l.jsx)(v,{...e})}):v(e)}}}]);