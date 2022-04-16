import { useState } from 'react';
import Modal from '../components/modals/Modal';
import ActionButton from "../components/buttons/ActionButton";

interface useConfirmationModalParameters {
    submitButtonOnClick: () => void;
    submitButtonText?: string;
    closeOnSubmit?: boolean;
    cancelButtonOnClick?: () => void;
    cancelButtonText?: string;
    showCancelButton?: boolean;
    confirmationText?: string;
};

const useConfirmationModal = (parameters: useConfirmationModalParameters) => {
    const {
        submitButtonOnClick = () => { },
        submitButtonText = "submitButtonText",
        closeOnSubmit = true,
        cancelButtonOnClick = () => { },
        cancelButtonText = "CANCEL",
        showCancelButton = true,
        confirmationText = "ARE YOU SURE?"
    } = parameters;

    const [isConfirmationModalOpened, setIsConfirmationModalOpened] = useState<boolean>(false);

    const showConfirmationModal = () => {
        setIsConfirmationModalOpened(true);
    };

    const closeConfirmationModal = () => {
        setIsConfirmationModalOpened(false);
    };

    const handleSubmitConfirmationModal = () => {
        submitButtonOnClick();
        closeOnSubmit && closeConfirmationModal();
    };

    const handleCancelConfirmationModal = () => {
        cancelButtonOnClick && cancelButtonOnClick();
        closeConfirmationModal();
    };

    const confirmationModal =
        <Modal
            isOpen={isConfirmationModalOpened}
            onRequestClose={closeConfirmationModal}
        >
            <h1>{confirmationText}</h1>
            <ActionButton
                text={submitButtonText}
                onClick={handleSubmitConfirmationModal}
            />
            {showCancelButton &&
                <ActionButton
                    text={cancelButtonText}
                    onClick={handleCancelConfirmationModal}
                />
            }
        </Modal>

    return { confirmationModal, showConfirmationModal, closeConfirmationModal };
};

export default useConfirmationModal;