import { useMutation  ,useQueryClient} from "@tanstack/react-query";
import { productsservices } from "../productServices/productServises";

export const useProductMutation = () => {
    const queryClient = useQueryClient();
    const deleteProduct = useMutation({
        mutationFn: async (id) => {
            const res = await productsservices.productDelete(id);
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
        }
    });

    return {
        deleteFunction: deleteProduct.mutate
    };
}