import React from 'react';

export default function CreateAccountButton({ onClick, disabled  }) {
  function onClick(){
    console.log("creating account")
  }
  return (
    <button 
    type="button" 
    onClick={onClick}
    disabled={disabled}
    aria-label="Create Account"
    >Create Account
    </button>
  );
}