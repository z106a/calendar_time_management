import React from 'react';
import InputMask from 'react-input-mask';

class PhoneInput extends React.Component {
  render() {
    return <InputMask {...this.props} mask="+7(999)999-99-99" maskChar=" "/>;
  }
}

export default PhoneInput;