import * as React from 'react';

interface SubmitProps {
  children: string;
}

export function Submit(props: SubmitProps) {
  return <button type="submit">{props.children}</button>;
}
