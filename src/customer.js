import {clean,lines,selected,requireText,number,pence,pounds,section,report,enumValue,webAddress} from './customer-ui.js';
export const config = {
  "title": "Trades Website Self-Check",
  "short": "Find the next useful job for your website",
  "audience": "For trade business owners",
  "summary": "Check the basics customers need to see, then take away a practical list of improvements.",
  "button": "Create my action list",
  "filename": "trades-website-self-check",
  "eyebrow": "A straightforward look at your website.",
  "time": "About 8 minutes",
  "outcome": "An owner-friendly action list you can work through or send to your website supplier.",
  "layout": "workshop",
  "intro": "Open your website on a phone. Answer based on what you can actually find and use. Not sure is a useful answer too.",
  "note": "This is a guided self-check, not an automated site audit. It cannot measure rankings, diagnose technical faults or guarantee more enquiries.",
  "fields": [
    {
      "id": "business",
      "label": "Business name",
      "help": "Optional. Used only to label the result.",
      "required": false,
      "type": "text",
      "maxLength": 180
    },
    {
      "id": "service",
      "label": "Is your main service clear as soon as the page opens?",
      "options": [
        [
          "yes",
          "Yes"
        ],
        [
          "no",
          "No"
        ],
        [
          "unsure",
          "Not sure"
        ]
      ],
      "help": "Would a first-time visitor understand what work you take on?",
      "required": true,
      "type": "select"
    },
    {
      "id": "area",
      "label": "Can customers find your real service area?",
      "options": [
        [
          "yes",
          "Yes"
        ],
        [
          "no",
          "No"
        ],
        [
          "unsure",
          "Not sure"
        ]
      ],
      "help": "Check that coverage is accurate and does not imply premises you do not have.",
      "required": true,
      "type": "select"
    },
    {
      "id": "call",
      "label": "Can a customer easily call you from a phone?",
      "options": [
        [
          "yes",
          "Yes"
        ],
        [
          "no",
          "No"
        ],
        [
          "unsure",
          "Not sure"
        ]
      ],
      "help": "Find the phone number and check that its call link uses your actual number. You do not need to place a call.",
      "required": true,
      "type": "select"
    },
    {
      "id": "evidence",
      "label": "Can visitors see genuine examples of your work?",
      "options": [
        [
          "yes",
          "Yes"
        ],
        [
          "no",
          "No"
        ],
        [
          "unsure",
          "Not sure"
        ]
      ],
      "help": "Use your own approved job photographs or project descriptions.",
      "required": true,
      "type": "select"
    },
    {
      "id": "details",
      "label": "Do your website contact details match your business information?",
      "options": [
        [
          "yes",
          "Yes"
        ],
        [
          "no",
          "No"
        ],
        [
          "unsure",
          "Not sure"
        ]
      ],
      "help": "Check the name, phone, opening arrangements and service details you actually use.",
      "required": true,
      "type": "select"
    },
    {
      "id": "enquiry",
      "label": "Has someone recently tested the enquiry route?",
      "options": [
        [
          "yes",
          "Yes"
        ],
        [
          "no",
          "No"
        ],
        [
          "unsure",
          "Not sure"
        ]
      ],
      "help": "Choose Not sure if delivery to your inbox has not been checked.",
      "required": true,
      "type": "select"
    }
  ],
  "example": {
    "business": "Example Plumbing Team",
    "service": "yes",
    "area": "no",
    "call": "yes",
    "evidence": "no",
    "details": "yes",
    "enquiry": "unsure"
  }
};
export function evaluate(v){const checks=[['service','Make the main service clear','Write a direct opening description of the actual work you want enquiries for.'],['area','Explain your coverage','List the places you genuinely serve and keep any premises claims accurate.'],['call','Make calling straightforward','Ask your supplier to make the real number visible and tappable on mobile.'],['evidence','Show real work','Add approved job photographs and short factual project descriptions.'],['details','Correct business details','Check the website against your approved business name, phone and operating arrangements.'],['enquiry','Test enquiry delivery','Arrange a controlled test and confirm that the team receives it and can reply.']];const todo=[],uncertain=[],done=[];for(const [id,label,action]of checks){enumValue(v[id],['yes','no','unsure'],label);(v[id]==='no'?todo:v[id]==='unsure'?uncertain:done).push(v[id]==='yes'?label+': checked by you.':label+': '+action);}return report((clean(v.business)||'Your trade business')+': website action list','Based on your answers. Start with contact and service information customers rely on.',[section('Improvements you identified',todo.length?todo:['No problems reported in these basics. This does not rule out other website issues.']),section('Confirm next',uncertain.length?uncertain:['Repeat the check when your services, coverage or contact arrangements change.']),section('Already checked',done)]);}
