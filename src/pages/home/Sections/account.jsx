import React, { useContext, useRef, useState } from 'react'
import { AppContext } from '../../../contexts/AppContext'
import { toast } from 'react-toastify';

const AccountPage = () => {



    const { bankData, toastMessage, updateBank } = useContext(AppContext)

    if (!bankData) {
        // Bank data is not available yet, you can show a loading spinner or return null
        return <div>Loading...</div>;
    }

    console.log('Bank', bankData.bankAccount.accountNumber)
    const amtRef = useRef()
    const addAmtRef = useRef()

    const handleTransfer = () => {

    }

    const handleWithdraw = (e) => {
        e.preventDefault()
        const currentAmount = parseInt(bankData.bankAccount.balance)

        const withdrawalAmt = parseFloat(amtRef.current.value).toFixed()
        console.log(currentAmount, withdrawalAmt)

        if (currentAmount < withdrawalAmt) {
            toast('Insufficient Funds')

            return null
        }

        handleTransfer()

        const newBalance = currentAmount - withdrawalAmt

        updateBank(newBalance)
        toast('Withdrawal successful')


    }

    const handleDeposit = (e) => {
        e.preventDefault()
        const currentAmount = parseInt(bankData.bankAccount.balance)

        const depositAMt = parseFloat(addAmtRef.current.value).toFixed()
        console.log(currentAmount, depositAMt)

        if (depositAMt > 10000) {
            toast('Cannot deposit more than kSH 10,000')
            return null
        }

        handleTransfer()

        const newBalance = currentAmount + depositAMt

        updateBank(newBalance)
        toast('Deposit successful')


    }
    return (
        <div className="flex flex-col gap-5">
            <div className="rounded-lg bg-blue-400 gap-5 flex flex-col p-5 lg:w-1/2">
                <h1 className='text-2xl font-semibold'>Current Account Details</h1>
                <hr className="w-full" />
                <div className="flex flex-col gap-2">
                    <span className="w-full flex flex-row gap-3 items-center">
                        <label htmlFor="">Account Type:</label>
                        {bankData && <h3 className='text-2xl text-white capitalize font-bold'>{bankData.bankAccount.accountNumber}</h3>}

                    </span>
                    <span className="w-full flex flex-row gap-3 items-center">
                        <label htmlFor="">Account Balance:</label>
                        {bankData && <h3 className='text-2xl font-bold text-white capitalize'>KES. {bankData.bankAccount.balance}</h3>}

                    </span>
                </div>
            </div>

            <div className="rounded-lg bg-blue-400 gap-5 flex flex-col p-5 lg:w-1/2">
                <h1 className='font-bold text-gray-800'>Withdraw Funds</h1>
                <form onSubmit={handleWithdraw} action="" className="flex flex-col">

                    <div className="mb-5 w-full flex flex-col">
                        <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter amt to withdraw</label>
                        <input type="number" ref={amtRef} id="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="500.00" required />
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Withdraw</button>

                </form>

            </div><div className="rounded-lg bg-blue-400 gap-5 flex flex-col p-5 lg:w-1/2">
                <h1 className='font-bold text-gray-800'>Deposit Funds</h1>
                <form onSubmit={handleDeposit} action="" className="flex flex-col">

                    <div className="mb-5 w-full flex flex-col">
                        <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add funds </label>
                        <input type="number" ref={addAmtRef} id="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="500.00" required />
                    </div>
                    <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Deposit</button>

                </form>

            </div>



        </div>
    )
}

export default AccountPage