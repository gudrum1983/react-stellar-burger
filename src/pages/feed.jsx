import React from "react";
import {FeedHistory} from "../components/feed-orders-profile/feed-orders-profile";
import {Stats} from "../components/stats/stats";

//Заглушка
export function Feed() {

  return (
    <>
      <section className={'pl-5 pr-5 half-home'}>
        <p className="text text_type_main-large pb-5">Лента заказов</p>
        <FeedHistory/>
      </section>
      <section className={'pl-5 pr-5 pt-15 half-home'}>
        <Stats/>
      </section>
    </>

  )
}