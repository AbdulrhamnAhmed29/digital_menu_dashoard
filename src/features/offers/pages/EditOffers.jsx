import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetOffers } from '../hooks/useGetOffers';
import OfferForm from '../componenets/OfferForm';
import OfferHeader from '../componenets/OfferHeader';
import { useOfferMutation } from '../hooks/useOfferMutation.js/useOfferMutation';

function EditOffers() {
    const id = useParams();
    const offerId = id?.id
    const { updateOfferFunction } = useOfferMutation()
    const { oneOffer } = useGetOffers(offerId);
    const mode = "update"
    return (
        <div className='p-5'>
            <header className=''>
                <OfferHeader
                    mode={mode}
                />
            </header>
            <main>
                <OfferForm
                    mode={mode}
                    offer={oneOffer}
                    id={offerId}
                    onConfirm={updateOfferFunction}
                />
            </main>
        </div>
    )
}

export default EditOffers
