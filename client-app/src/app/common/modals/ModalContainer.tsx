import { observer } from "mobx-react-lite";
import { Modal } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import "semantic-ui-css/semantic.min.css";

export default observer(function ModalContainer() {
  const { modalStore } = useStore();
  return (
    <Modal
      open={modalStore.modal.open}
      onClose={modalStore.closeModal}
      size="small"
    >
      <Modal.Content content={modalStore.modal.body}></Modal.Content>
    </Modal>
  );
});
