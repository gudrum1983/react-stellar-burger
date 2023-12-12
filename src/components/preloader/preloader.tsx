import style from "./preloader.module.css"

export function Preloader() {
  return (
    <div className={style.preloader}>
      <div className={style.spinner}></div>
    </div>)
}
