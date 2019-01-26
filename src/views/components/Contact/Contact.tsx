import * as React from 'react';
import { Input } from '../Form/Input';
import { Submit } from '../Form/Submit';
import { TextArea } from '../Form/TextArea';
import { Spinner } from '../Spinner/Spinner';
import { Title } from '../Title/Title';

export interface ContactProps {
  title: string;
  subtitle: string;
  section: string;
  text: string;
}

export function Contact(props: ContactProps) {
  return <section id="contact" className="contact">
    <Title section={props.section} title={props.title} subtitle={props.subtitle} />
    <p className="text">{props.text}</p>
    <div className="contact-content">
      <div id="sended-mail" style={{display: 'none'}}>
        <div className="content">
          <Spinner/> Sending...
        </div>
      </div>
      <div id="sucess-mail" style={{display: 'none'}}>
        Message sended with success!
      </div>
      <form>
        <Input name="name" ariaLabel="Name" type="text" placeholder="Name" />
        <Input name="email" ariaLabel="Email" type="email" placeholder="Email" />
        <TextArea name="message" ariaLabel="Message" rows={4} placeholder="Type your message..."/>
        <div>
          <Submit>Send</Submit>
        </div>
      </form>
      <div className="img-container">
        <img src="public/images/Illustration_Contato.png" alt=""/>
      </div>
    </div>
  </section>;
}
