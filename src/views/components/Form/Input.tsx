import * as React from 'react';

interface InputProps {
  placeholder?: string;
  type: string;
  name: string;
  ariaLabel?: string;
}

export function Input(props: InputProps) {
  return <input 
    className="magitech-input" 
    name={props.name} 
    aria-label={props.ariaLabel}
    placeholder={props.placeholder} 
    type={props.type} />;
}
