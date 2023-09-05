import PropTypes from 'prop-types';

const textType = {
  primary: "text text_type_main-default",
  secondary: "text text_type_main-default text_color_inactive",
}

NavigationLink.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired}

function NavigationLink(props) {
  return (
    <>
      {props.icon}
      <p className={textType[props.icon.props.type]} style={{textWrap: "nowrap"}}>
        {props.text}
      </p>
    </>
  );
}

export {NavigationLink}