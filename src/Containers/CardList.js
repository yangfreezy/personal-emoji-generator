import React, { Fragment } from "react";

import { Card } from "@material-ui/core";

import { Text } from "./../Components";
import { Layout } from "./../Layouts";

const CardList = ({ cards }) => {
  return (
    <Fragment>
      {cards.map(card => (
        <Card className="card" key={card.name}>
          <Layout stylesClass="card-layout">
            <Text stylesClass="card-name">{card.name} </Text>
            <img
              className="card-image"
              src={card.url || URL.createObjectURL(card)}
              alt={card.name}
            />
          </Layout>
        </Card>
      ))}
    </Fragment>
  );
};

export default CardList;
