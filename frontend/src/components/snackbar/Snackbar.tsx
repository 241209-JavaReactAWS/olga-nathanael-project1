import './Snackbar.css'

export enum SnackbarStyle {
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning'
}

export interface SnackbarProps {
    style: SnackbarStyle,
    message: string
    open: boolean,
}

export default function Snackbar({style, message, open}: SnackbarProps) {
    return open ? <div id='snackbar' className={style}>
        <p>{message}</p>
    </div> : <></>
}
