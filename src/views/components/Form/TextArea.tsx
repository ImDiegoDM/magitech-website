import * as React from 'react';

interface TextAreaProps {
  placeholder?: string;
  rows?: number;
  name: string;
  ariaLabel?: string;
}

export function TextArea(props: TextAreaProps) {

  return <textarea 
    name={props.name} 
    aria-label={props.ariaLabel} 
    rows={props.rows} className="magitech-textarea" 
    placeholder={props.placeholder} />;
}
