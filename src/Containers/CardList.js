import React, { Fragment } from "react";

import { Card } from "@material-ui/core";

import { Layout, Text } from "./../Components";

const CardList = ({ shouldLoadIf, cards }) => {
  return shouldLoadIf ? (
    <Fragment>
      {cards.map(card => (
        <Card className="card" key={card.name}>
          <Layout stylesClass="card-layout">
            <Text stylesClass="card-name" text={card.name} />
            <img
              className="card-image"
              src={card.url || URL.createObjectURL(card)}
              alt={card.name}
            />
          </Layout>
        </Card>
      ))}
    </Fragment>
  ) : null;
};

export default CardList;
