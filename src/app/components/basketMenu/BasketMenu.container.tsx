import React from 'react';
import { connect } from 'react-redux';
import { toJS } from '../../core/util/ToJs';

// Actions
import {
  setIsBasketOpen,
  setIsSearchOpen,
} from '../../core/redux/custom/ui/actions';
import { removeFromBasket } from '../../core/redux/custom/basket/actions';

// Selectors
import { selectIsBasketOpen } from '../../core/redux/custom/ui/selectors';

import {
  selectProductsInBasket,
  selectTotalProductsInBasket,
} from '../../core/redux/custom/basket/selectors';

// Components and Props
import BasketMenu, { Props } from './BasketMenu';

const BasketMenuContainer = ({
  className,
  isBasketOpen,
  _setIsBasketOpen,
  _removeFromBasket,
  _setIsSearchOpen,
  basket,
  totalItems,
}: Props) => {
  return (
    <BasketMenu
      className={className}
      _setIsSearchOpen={_setIsSearchOpen}
      isBasketOpen={isBasketOpen}
      _setIsBasketOpen={_setIsBasketOpen}
      _removeFromBasket={_removeFromBasket}
      basket={basket}
      totalItems={totalItems}
    />
  );
};

const mapStateToProps = (state: any) => {
  return {
    isBasketOpen: selectIsBasketOpen(state),
    basket: selectProductsInBasket(state),
    totalItems: selectTotalProductsInBasket(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    _setIsBasketOpen: (val: boolean) => dispatch(setIsBasketOpen(val)),
    _setIsSearchOpen: (val: boolean) => dispatch(setIsSearchOpen(val)),
    _removeFromBasket: (
      id: string,
      sku: string,
      quantity: number,
      price: number
    ) => dispatch(removeFromBasket(id, sku, quantity, price)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(BasketMenuContainer));
