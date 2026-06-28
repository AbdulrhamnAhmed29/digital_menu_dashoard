import React from 'react'
import OfferForm from '../componenets/OfferForm';
import OfferHeader from '../componenets/OfferHeader';
import { useOfferMutation } from '../hooks/useOfferMutation.js/useOfferMutation';
function AddOffers() {
    const mode = "create";
    const { addOfferMutation } = useOfferMutation()
    return (
        <div className='p-5'>
            <header className='p-3'>
                <OfferHeader mode={mode} />
            </header>
            <main>
                <OfferForm
                    mode={mode}
                    offer={""}
                    id={""}
                    onConfirm={addOfferMutation}
                />
            </main>
        </div>
    )
}
export default AddOffers
