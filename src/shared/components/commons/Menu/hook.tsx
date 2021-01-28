import { useRef } from "react";
import { IUseMenu } from "./interface";

const useMenu: () => IUseMenu = () => {
    const ref = useRef({
        setOpenKey: null,
        setSelectedKey: null,
        getMenuState: null,
        setMode: null,
        setInlineCollapsed: null,
    })

    const getRef = () => {
        return { ...ref.current }
    }

    return {
        ...getRef(),
    }
}

export default useMenu;