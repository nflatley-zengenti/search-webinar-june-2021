import React from 'react';

interface Props {
  props?: any;
}

const Play: React.FC<Props> = props => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.338 3.255V20.745C2.33795 21.2725 2.61503 21.7613 3.06771 22.0322C3.52039 22.3032 4.0821 22.3164 4.547 22.067L20.87 13.322C21.3572 13.0608 21.6613 12.5528 21.6613 12C21.6613 11.4472 21.3572 10.9392 20.87 10.678L4.547 1.933C4.0821 1.68364 3.52039 1.69684 3.06771 1.96775C2.61503 2.23866 2.33795 2.72745 2.338 3.255Z" stroke="#2B2F51" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>  
);

export default Play;
