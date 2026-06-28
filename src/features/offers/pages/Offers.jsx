import Error from "../../../shared/Error";
import Loading from "../../../shared/Loading";
import OfferHeader from "../componenets/OfferHeader";
import OfferTable from "../componenets/OfferTable";
import { useGetOffers } from "../hooks/useGetOffers"
import { useOfferMutation } from "../hooks/useOfferMutation.js/useOfferMutation";

const Offers = () => {
  const { offersIsLoading, offerIsError, offers, } = useGetOffers();
  const { deleteOffer, isDeleting, deleteError, } = useOfferMutation();
  const mode = "show"

  // ================= IS LOADING ===================
  if (offersIsLoading) return <Loading />;
  // =============== IS ERORR ====================
  if (offerIsError) return <Error />;
  // =================== DATA ==============
  const offersData = offers?.data || [];
  return (
    <div className="p-6">
      {/* ============== Header =========== */}
      <header>
        <OfferHeader mode={mode} />
      </header>
      {/* ============== Main ============= */}
      <main dir="rtl">
        <OfferTable
          offersData={offersData}
          deleteOffer={deleteOffer}
          deleteError={deleteError}
          isDeleting={isDeleting}
        />
      </main>
    </div>
  )
}

export default Offers