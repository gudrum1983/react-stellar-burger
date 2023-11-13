import React from "react";
import {Link} from "react-router-dom";

export function NotFound404() {

return(
    <div className="not-found">
      <div className="image-not"><Link className="text" to={"/"}><p className="text text_type_main-large text_color_primary">ДОМОЙ</p></Link></div>

    </div>
  )


}