import React, { ReactNode } from 'react';
import styled from 'styled-components';

const PopUpContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: hsla(202, 33%, 95%, 0.51);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  z-index: 999;
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;
  position: relative;
  font-size: 14px;
  font-weight: 500;
`

type IProp = {
  closeCallback?: () => void;
  children: ReactNode;
}

export default class PopUp extends React.Component<IProp, any> {

  render() {
    return <PopUpContainer>
        {this.props.children}
        {
          this.props.closeCallback && 
            <CloseButton onClick={this.props.closeCallback}>Close</CloseButton>
        }
    </PopUpContainer>
  }
}