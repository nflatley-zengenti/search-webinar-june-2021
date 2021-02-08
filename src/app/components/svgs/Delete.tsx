import React from 'react';

interface Props {
  props?: any;
}

const Delete: React.FC<Props> = props => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M1.5 4.5H22.5" stroke="#2B2F51" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.25 1.5H9.75C8.92157 1.5 8.25 2.17157 8.25 3V4.5H15.75V3C15.75 2.17157 15.0784 1.5 14.25 1.5Z" stroke="#2B2F51" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9.75 17.25V9.75" stroke="#2B2F51" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14.25 17.25V9.75" stroke="#2B2F51" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M18.865 21.124C18.8005 21.9017 18.1504 22.5001 17.37 22.5H6.631C5.8506 22.5001 5.20051 21.9017 5.136 21.124L3.75 4.5H20.25L18.865 21.124Z" stroke="#2B2F51" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
);

export default Delete;
