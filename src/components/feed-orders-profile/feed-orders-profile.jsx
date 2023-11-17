export function CardOrder() {

  return (
    <div className={cardOrder}>
      <div className={orderId}>
        <div className={orderIdNumber}>#034535</div>
        <div className={orderTimeStamp}>Сегодня, 16:20 i-GMT+3</div>
      </div>
      <div>
        <div className={burgerName}>Death Star Starship Main бургер</div>
        <div className={orderStatus}>Создан</div>
      </div>
      <div className={orderComponentsAndPrice}>
        <div className={orderIngredients}>{...ingredients}</div>
        <div className={orderPrice}>
          <div className={orderTextPrice}></div>
          <div className={orderIconPrice}></div>
        </div>
      </div>

    </div>
  )


}