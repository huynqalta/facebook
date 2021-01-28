interface IModal {
    [ registerId: string ]: {
        setVisible: (value) => void;
        getState: () => { visible: any };
    }
}

class ModalManagement {
    private modal: IModal = {};

    register(registerId, action) {
        if (this.modal[ registerId ]) return;
        this.modal[ registerId ] = action;
    }

    getAllModalStatus() {
        return this.modal
    }

    getStatusByRegisterId(registerId) {
        return this.modal[ registerId ].getState();
    }

    open(registerId) {
        this.modal[ registerId ].setVisible(true);
    }

    close(registerId) {
        this.modal[ registerId ].setVisible(false);
    }

    toggle(registerId) {
        const { visible } = this.getStatusByRegisterId(registerId);
        this.modal[ registerId ].setVisible(!visible);
    }
}

const modal = new ModalManagement();
Object.freeze(modal);
export default modal;