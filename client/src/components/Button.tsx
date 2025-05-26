import React from "react";
import './button.css'

type props = {
    title: string;
    onClick?: () => void;
}

const Button: React.FC<props> = ({title, onClick}) => {



    return (
        <button onClick={onClick} className="button">{title}</button>
    )
}

export default Button;