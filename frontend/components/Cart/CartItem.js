import React from 'react';
import ListItemText from "@material-ui/core/ListItemText";
import {Typography} from "@material-ui/core";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItem from "@material-ui/core/ListItem";
import RemoveFromCart from "./RemoveFromCart";
import Divider from "@material-ui/core/Divider";

const CartItem = ({classes, cart}) => {
    const {id, quantity} = cart;
    if (!cart.item)
        return (
            <>
                <ListItem>
                    <ListItemText className={classes.typography}
                                  primary={
                                      <Typography className={classes.typography} variant="h6">
                                          This Item has been removed
                                      </Typography>
                                  }
                    />
                    <ListItemSecondaryAction>
                        <RemoveFromCart id={id}/>
                    </ListItemSecondaryAction>
                </ListItem>
            </>
        );
    const {name, image, description, price} = cart.item;
    return (
        <ListItem button>
            <img className={classes.image} src={image} alt={`Product ${name}`}/>
            <ListItemText className={classes.typography}
                          primary={
                              <Typography className={classes.typography} variant="h5">
                                  {name}
                              </Typography>
                          }
                          secondary={
                              <>
                                  <Typography component={'span'} variant="overline">
                                      {description}
                                  </Typography>
                                  <Typography component={'span'} className={classes.typography}>
                                      ${price * quantity} - {`${quantity} * $${price}`}
                                  </Typography>
                              </>
                          }/>

            <ListItemSecondaryAction>
                <RemoveFromCart id={id}/>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default CartItem;
