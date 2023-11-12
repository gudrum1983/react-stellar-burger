import React from "react";

export function Feed() {

  const container = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  }

  return (
    <div style={container}>
      <p className="text text_type_main-medium">
        Лента заказов
      </p>
    </div>
  )
}