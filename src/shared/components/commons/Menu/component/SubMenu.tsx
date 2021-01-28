import React, { useContext, useRef } from "react";
import { ISubMenu } from "../interface";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { MenuContext } from './Menu';

const SubMenu = (props: ISubMenu) => {
    const { mode, setActiveKeys, onClick } = useContext(MenuContext);
    const ref = useRef(null);
    const {
        activeKey,
        icon,
        title,
        disabled,
        children,
        isOpen,
        isHasSelected,
        parentKeys = [],
    } = props;

    const handleClickSubmenuHeader = () => {
        if (mode == "horizontal") return;
        if (onClick) {
            onClick({ activeKey, parentKeys, type: "submenu" })
        }
        setActiveKeys(activeKey, parentKeys, 'submenu');
    }

    return <div className={`sub-menu ${ disabled && "disable" } ${ parentKeys.length == 0 && "first-submenu" }  ${ isHasSelected && "header-on" }`}>
        <div className={`header`} onClick={handleClickSubmenuHeader}>
            {parentKeys.map((item, index) => {
                return <span key={item} className="mr-child"></span>
            })}
            <span
                className={`icon-menu ${ isHasSelected && 'sub-menu-header-active' } `}
            >
                {icon}</span>
            <div className={`content`}>
                <div className={`title ${ isHasSelected && 'sub-menu-header-active' } `}>
                    {title}
                </div>
                <div className={`expand-icon ${ isOpen && "rotale-down" }`}>
                    <FontAwesomeIcon icon={faChevronUp} />
                </div>
            </div>
        </div>
        <div key={activeKey} className={`sub-children ${ isOpen && "sub-children-toggle-on" }`} ref={ref}>
            {children}
        </div>
    </div>
}

export default SubMenu;