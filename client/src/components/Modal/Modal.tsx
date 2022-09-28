import React from 'react';
import Modal from '@mui/material/Modal';
import { ContentWrapper } from './Modal.styles';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';

interface ICustomModal {
    open: boolean,
    handleClose: () => void;
    children: React.ReactNode
}

const CustomModal = ({open, handleClose, children}: ICustomModal) => {

    return (
        <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
            <ContentWrapper>
                {children}
            </ContentWrapper>
        </Fade>
      </Modal>
    )
}

export default CustomModal