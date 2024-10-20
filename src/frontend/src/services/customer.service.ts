import axios from 'axios';
import { CustomerModel } from '../data/models/customer.model';
import ResponseListData from '../data/response-list.data';

class CustomerService {
    private static apiUrl = import.meta.env.VITE_API_URL + '/customers';

    static async findAll (page = 1, take = 16, mocked = false): Promise<ResponseListData<CustomerModel>> {
        if (mocked) {
            const total = 0;
            const maxPage = Math.ceil(total / take);
            const currentPageTotal = page < maxPage
                ? take
                : (
                    total - ((page - 1) * take) < take
                        ? total - ((page - 1) * take)
                        : take
                );

            const customers: CustomerModel[] = Array(currentPageTotal).fill(1).map((_, index) => ({
                id: index.toString(),
                name: `Cliente ${(index + 1) + ((page - 1) * take)}`,
                salary: Math.random() * 10000,
                company: Math.random() * 10000,
            }));

            return {
                totalCount: total,
                list: customers,
            };
        }

        const response = await axios.get<ResponseListData<CustomerModel>>(this.apiUrl, {
            params: {
                page,
                take,
            }
        });

        return response.data;
    }
}

export default CustomerService;
