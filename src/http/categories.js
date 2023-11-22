import {api} from "./api";

export default function categoriesApi() {
    return {
        listCategories: async () =>
            api().get('/categories',),
    }
}