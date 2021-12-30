/**
 *
 * Checkout
 *
 */

import React from 'react';

import Button from '../../Common/Button';
import { useConnectWallet, useCheckConnected } from '../../../utils/hooks/useWalletProviders';
import { useCheckout, useApprove } from '../../../queries/useOrder.queries'

const Checkout = props => {
  const { authenticated, handleShopping, handleCheckout, placeOrder, onDone, cartTotal, isApprove, paymentMethod } = props;
  const onConnect = useConnectWallet()
  const isConnected = useCheckConnected()
  const onCheckout = useCheckout(placeOrder)
  const onApprove = useApprove(onDone)
  return (
    <div className='easy-checkout'>
      <div className='checkout-actions'>
        <Button
          variant='primary'
          text='Continue shopping'
          onClick={() => handleShopping()}
        />
        {authenticated ? paymentMethod === 'coin' ? !isConnected ?  (
          <Button
            variant='primary'
            text='Connect'
            onClick={() => onConnect()}
          />
        ) : isApprove ? (
          <Button
            variant='primary'
            text='Place order'
            onClick={() => onCheckout(parseInt(cartTotal), paymentMethod)}
          />
        ) : (
          <Button
            variant='primary'
            text='Approve'
            onClick={() => onApprove()}
          />
        ) : (
          <Button
            variant='primary'
            text='Place order'
            onClick={() => onCheckout(parseInt(cartTotal), paymentMethod)}
          />
        ) : (
          <Button
            variant='primary'
            text='Proceed To Checkout'
            onClick={() => handleCheckout()}
          />
        )}
      </div>
    </div>
  );
};

export default Checkout;
