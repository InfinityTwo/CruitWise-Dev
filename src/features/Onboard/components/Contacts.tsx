import "./Contacts.scss";

import React, { useCallback, useEffect, useState } from "react";

import { cardTransition } from "../../../utils/cardTransition";
import { CardWrapper } from "./CardWrapper";

interface ContactsProps {
  onFinish: () => void;
  contacts: string[][][];
}

export const Contacts = ({ onFinish, contacts }: ContactsProps) => {
  const transitionPart = useCallback(cardTransition(), []);
  const [contactsJSXList, setContactsJSXList] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setContactsJSXList(
      contacts.map((contactInner, index) => (
        <div key={index} className="contacts-item flex-row">
          {contactInner.map((contact, index) => (
            <div key={index} className="contacts-item-inner flex-column">
              <img src={contact[2]} alt="contact" className="contacts-image" />
              <p className="contacts-name">{contact[0]}</p>
              <p className="contacts-role">{contact[1]}</p>
            </div>
          ))}
        </div>
      )),
    );
  }, []);

  return (
    <CardWrapper>
      <div className="contacts-component flex-column">
        <h1 className="contacts-header">Persons of Interest</h1>
        <span className="contacts-desc">{"Here's a few fellas you might find in our office"}</span>
        <div className="flex-column contacts">{contactsJSXList}</div>
        <button
          className="standard-button flex-end contacts-continue-btn"
          onClick={() => transitionPart(onFinish, true)}
        >
          Got it!
        </button>
      </div>
    </CardWrapper>
  );
};
