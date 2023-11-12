import React from "react";

//Заглушка
export function Orders() {

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
        История заказов
      </p>
    </div>
  )
}