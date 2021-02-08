import React from 'react';

interface Props {
  props?: any;
}

const Clock: React.FC<Props> = props => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.20101 17.799 1.5 12 1.5C6.20101 1.5 1.5 6.20101 1.5 12C1.5 17.799 6.20101 22.5 12 22.5Z" stroke="#2B2F51" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 12V8.25" stroke="#2B2F51" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 12L16.687 16.688" stroke="#2B2F51" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
);

export default Clock;
