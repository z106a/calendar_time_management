import React from 'react';
import styled from 'styled-components';

export default (props) => <Span>{props.txt}</Span>;

const Span = styled.span`
  font-size: smaller;
  color: red;
`;