import React, {MouseEventHandler} from 'react'
import "./Button.css"

export enum ButtonStyle {
    PRIMARY = 'primaryButton',
    SECONDARY = 'secondaryButton',
    DANGER = 'dangerButton',
}

interface Props {
    style: ButtonStyle,
    onClick: MouseEventHandler<HTMLButtonElement>,
    children: React.ReactNode,
}

const Button: React.FC<Props> = (props) => {
    return (
        <button className={props.style} onClick={props.onClick}>{props.children}</button>
    );
};

export default Button;
