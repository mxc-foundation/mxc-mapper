/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Faq from './Faq';

const ModalFAQ = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button style={{color: '#050319', backgroundColor: '#A885E0', borderColor: '#A885E0'}} onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} fade={false} toggle={toggle} className={className} size="lg">
        <ModalHeader toggle={toggle} style={{borderBottom: 'unset'}}/>
        <ModalBody>
          <Faq />
        </ModalBody>
        <ModalFooter>
          
          <Button color="secondary" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalFAQ;