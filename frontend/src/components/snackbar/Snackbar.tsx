import './Snackbar.css'

export enum SnackbarStyle {
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning'
}

interface Props {
    style: SnackbarStyle,
    message: string
    open: boolean,
}

export default function Snackbar({style, message, open}: Props) {
    return open ? <div id='snackbar' className={style}>
        <p>{message}</p>
    </div> : <></>
}
