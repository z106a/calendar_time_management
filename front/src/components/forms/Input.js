import React from 'react';
import styled from 'styled-components';

function ContactInput(props) {
  return <Input {...props}></Input>
}

export const Input = styled.input`
  width: 60%;
  display: block;
  margin: 0 auto 5px;

  @media(max-width: 400px) {
    width: 100%;
  }
`;

export default ContactInput;
