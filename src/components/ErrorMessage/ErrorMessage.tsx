import css from './errorMessage.module.css';

export default function errorMessage() {
    return (
        <p className={css.text}>There was an error, please try again...</p>
    )
}   