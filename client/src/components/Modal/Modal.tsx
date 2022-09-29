import React from 'react';
import Modal from '@mui/material/Modal';
import { ContentWrapper, CloseIconButton } from './Modal.styles';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import CloseIcon from '@mui/icons-material/Close';

export interface ICustomModal {
    open: boolean,
    handleClose: () => void;
    children?: React.ReactNode
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
                <CloseIconButton size='large' onClick={handleClose}>
                    <CloseIcon sx={{fontSize: '28px', color: 'black'}}/>
                </CloseIconButton>
                {children}
            </ContentWrapper>
        </Fade>
      </Modal>
    )
}

export default CustomModal