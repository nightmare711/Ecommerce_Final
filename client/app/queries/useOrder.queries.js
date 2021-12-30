import { toast } from 'react-toastify';
import {  getContract, getWeb3 } from '../utils/getWeb3';
import WFABI from '../constants/WF.json';
import WALABI from '../constants/WAL.json';
import { WF, WAL } from '../constants/addresses';
import { onCheckStatusOfTransaction } from '../utils/checkStatus'
import { WAL_PRICE } from '../constants/price'

export function toFixed(x) {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split('e-')[1]);
      if (e) {
        x *= Math.pow(10,e-1);
        x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split('+')[1]);
      if (e > 20) {
        e -= 20;
        x /= Math.pow(10,e);
        x += (new Array(e+1)).join('0');
      }
    }
    return x;
  }

export const useApprove = (onDone) => {
    return () => {
        const web3 = getWeb3()
        const walContract = getContract(WALABI, WAL)
        const contractData = walContract.methods.approve(WF, web3.utils.toBN('20000000000000000000000000000')).encodeABI()
        const params = [
            {
                from: window.ethereum?.selectedAddress,
                to: WAL,
                data: contractData,
            },
        ]
        window.ethereum
    		?.request({
    			method: 'eth_sendTransaction',
    			params: params,
    		})
    		.then(async (res) => {
    			if (res) {
    				toast.success('Transaction submitted')
    				const status = await onCheckStatusOfTransaction(res)
    				if (status) {
    					toast.success('Approve successful')
                        onDone()
    				} else {
    					toast.error('Something went wrong')
    				}
    			} else {
    				toast.error('User rejected')
    			}
    		})
    		.catch((err) => {
    			toast.error('User rejected')
    		})
    }
}

export const useCheckout = (placeOrder) => {
  return async (cartTotal, _type) => {
    
    if( _type === 'coin') {
        const infoBlockchain = [];

        infoBlockchain.push({
            owner: '0xa846f0Fc66c5810E86a744BEc0Bc8CaBd1297bF0',
            amount: toFixed((cartTotal/WAL_PRICE) * 10 ** 18).toString()
        });

        const wfContract = getContract(WFABI, WF)
        const contractData = wfContract.methods.deposit(infoBlockchain).encodeABI()
        const params = [
            {
                from: window.ethereum?.selectedAddress,
                to: WF,
                data: contractData,
            },
        ]
        window.ethereum
                ?.request({
                    method: 'eth_sendTransaction',
                    params: params,
                })
                .then(async (res) => {
                    if (res) {
                        toast.success('Transaction submitted')
                        const status = await onCheckStatusOfTransaction(res)
                        if (status) {
                            const result = await placeOrder(_type)
                            
                        } else {
                            toast.error('Something went wrong')
                        }
                    } else {
                        toast.error('User rejected')
                    }
                })
                .catch((err) => {
                    toast.error('User rejected')
                })
    } else {
        placeOrder(_type)
    }
  };
};