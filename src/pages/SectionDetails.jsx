import React from 'react'
import { useParams } from 'react-router-dom'
import {useSectionGet} from "../features/categories/hooks/useSection_Get"

function SectionDetails() {
    const { id } = useParams();
    const { findOne } = useSectionGet(id);
    console.log(id);

    
    console.log(findOne);
    return (
        <div>
            SectionDetails
            SectionDetails
        </div>
    )
}

export default SectionDetails
