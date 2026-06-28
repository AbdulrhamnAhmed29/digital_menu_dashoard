import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useSectionGet } from '../../categories/hooks/useSection_Get';
import { useGetOffers } from '../hooks/useGetOffers';
import { MODE } from '../constant/constant';

function OfferForm({  id, offer, onSubmitForm, onConfirm, mode }) {

    // ========= DESTRACTURING DATA FROM HOOKS ========
    const { sections } = useSectionGet();
    const { constantOffer } = useGetOffers()
    const arrayOfOffers = constantOffer?.data || [];
    const AVAILABLE_SECTIONS = sections || [];

    const currantOffer = offer?.data ;
    

    // ========= DESTRACTURING  FROM REACRT HOOK FORM  ========
    const method = useForm({
        defaultValues: {
            name: '',
            section: '',
            price: '',
        },
    });
    
    const { register, reset, formState: { errors, isSubmitting }, handleSubmit } = method

    // =========  ONSUBMIT FUNCTION ========
    const onSubmit = (data) => {
        console.log('Submitted Data:', data);
        const payload = {
            data: {
                menu_section: data.section,
                offer: data.name,
                price: data.price,
            }
        };
        console.log(payload);
        
        if (mode === MODE.CREATE) {
            return onConfirm(payload)
        } else if(mode === MODE.UPDATE) {
            return onConfirm({payload, id})
        }
    };

    useEffect(() => {
        if (currantOffer) {
            reset({
                name: currantOffer?.offer?.documentId,
                section: currantOffer?.menu_section?.documentId,
                price: currantOffer?.price,
            });
        }
    }, [currantOffer, reset]);
    return (
        <FormProvider {...method}>
            <div dir="rtl" className="w-full  p-6   ">

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* ==== OFFER SELECT  ==== */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-neutral-400">اسم العرض</label>
                        <select
                            {...register('name', { required: 'حقل اسم العرض مطلوب' })}
                            className="w-full px-4 py-3 bg-neutral-900/60 border border-neutral-800 rounded-xl text-neutral-200 focus:outline-none focus:border-amber-500/50 transition-all text-sm appearance-none"
                        >
                            <option value="" className="bg-neutral-950 text-neutral-600">اختر العرض...</option>
                            {arrayOfOffers.map((offerItem) => (
                                <option key={offerItem.id} value={offerItem.documentId} className="bg-neutral-950 text-neutral-300">
                                    {offerItem.offer_type} {offerItem.quantity}
                                </option>
                            ))}
                        </select>
                        {errors.name && <span className="text-xs text-red-500 font-medium">{errors.name.message}</span>}
                        {/* ==== price input  ==== */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-neutral-400">سعر العرض الإجمالي</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    {...register('price', { required: 'حقل السعر مطلوب', min: { value: 1, message: 'السعر يجب أن يكون أكبر من 0' } })}
                                    placeholder="0.00"
                                    className="w-full pl-14 pr-4 py-3 bg-neutral-900/60 border border-neutral-800 rounded-xl text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-amber-500/50 transition-all text-sm font-bold tracking-wide"
                                />
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-neutral-500 select-none">
                                    ج.م
                                </div>
                            </div>
                            {errors.price && <span className="text-xs text-red-500 font-medium">{errors.price.message}</span>}
                        </div>

                    </div>

                    <div className="space-y-3">

                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-neutral-400">  اختر السيكشن الذي سيظهر به العرض</label>
                            <div className="flex items-center gap-3 bg-neutral-900/30 p-3 rounded-xl border border-neutral-900/60">
                                <div className="flex-1">
                                    <select
                                        {...register(`section`, { required: 'يجب اختيار السيكشن' })}
                                        className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-neutral-300 focus:outline-none focus:border-amber-500/50 transition-all text-sm appearance-none"
                                    >
                                        <option value="" className="bg-neutral-950 text-neutral-600">اختر السيكشن الفعال...</option>
                                        {AVAILABLE_SECTIONS.map((sec) => (
                                            <option key={sec.id} value={sec.documentId} className="bg-neutral-950 text-neutral-300">
                                                {sec.Name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.section && (
                                        <span className="text-xs text-red-500 font-medium block mt-1">
                                            {errors.section.message}
                                        </span>
                                    )}

                                </div>


                            </div>

                        </div>
                    </div>


                    {/* ==== Submit ==== */}
                    <div className="pt-4 border-t border-neutral-900">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm rounded-xl shadow-[0_4px_20px_rgba(245,158,11,0.15)] transition-all active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
                        >
                            {isSubmitting ? 'جاري حفظ العرض...' : 'حفظ  العرض '}
                        </button>
                    </div>

                </form>
            </div>
        </FormProvider>
    );
}

export default OfferForm;