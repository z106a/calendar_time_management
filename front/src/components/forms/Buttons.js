import React from 'react';
import styled from 'styled-components';

function SubmitButton({submit, children}) {
    return <Button onClick={submit}>{children}</Button>
}

export const Button=styled.button`
    width: 100%;
    background-color: #7d77a4;
    font-weight: 600;
    font-size: large;
    color: #eee;
    border-radius: 25px;
    -webkit-box-shadow: 17px -5px 24px 0px rgba(227,227,227,0.81);
-moz-box-shadow: 17px -5px 24px 0px rgba(227,227,227,0.81);
box-shadow: 17px -5px 24px 0px rgba(227,227,227,0.81);
`;

export default SubmitButton;