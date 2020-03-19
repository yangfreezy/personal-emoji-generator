import React, { Fragment } from "react";

import { Card } from "@material-ui/core";

export const CardList = ({ cards }) => {
  return (
    <Fragment>
      {cards.map(card => (
        <Card className="card" key={card.name}>
          <div className="card-layout">
            <div className="card-name">{card.name} </div>
            <img
              className="card-image"
              src={card.url || URL.createObjectURL(card)}
              alt={card.name}
            />
          </div>
        </Card>
      ))}
    </Fragment>
  );
};
