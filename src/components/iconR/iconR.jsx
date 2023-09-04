import styles from "../AppHeader/AppHeader.module.css";


const textType = {
  primary: "text text_type_main-default",
  secondary: "text text_type_main-default text_color_inactive",
}


function ButtonS(props) {
  return (
    <li style={{display: 'flex', flexDirection: 'row', gap: '8px'}} className={`${styles.nav_link} pl-5 pr-5 pb-5 pt-5`}>
      {props.icon}
      <p className={textType[props.icon.props.type]} style={{textWrap: "nowrap"}}>
        {props.text}
      </p>
    </li>
  );
}

export {ButtonS}