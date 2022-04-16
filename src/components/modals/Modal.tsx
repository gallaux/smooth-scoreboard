import React from 'react';
import ReactModal, { Props } from 'react-modal';

const Modal: React.FC<Props> = (props) => (
    <ReactModal
        appElement={document.getElementById('root') as HTMLElement}
        onRequestClose={props.onRequestClose}
        isOpen={props.isOpen}
        className={"modal"}
        overlayClassName={"modal-overlay"}
    >
        {props.children}
    </ReactModal>
)

export default Modal;