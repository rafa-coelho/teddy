import axios from 'axios';
import { CustomerModel } from '../data/models/customer.model';
import ResponseListData from '../data/response-list.data';
import { useAppContext } from '../context/app.context';

type ErrorResponse = {
    message: string;
};

let mockData: CustomerModel[];

const useCustomerService = () => {
    const { state } = useAppContext();
    const apiUrl = import.meta.env.VITE_API_URL + '/customers';

    const handleApiError = (error: unknown): ErrorResponse => {
        if (axios.isAxiosError(error)) {
            return {
                message: error.response?.data?.message || 'Erro desconhecido.',
            };
        }
        return {
            message: 'Erro inesperado. Por favor, tente novamente.',
        };
    };

    const getAllCustomersAsync = async (page = 1, take = 16): Promise<ResponseListData<CustomerModel>> => {
        if (state.isMocked) {

            if (mockData == undefined) {
                mockData = Array(30)
                    .fill(0)
                    .map((_, index) => ({
                        id: index.toString(),
                        name: `Cliente ${(index + 1) + (page - 1) * take}`,
                        salary: parseFloat((Math.random() * 10000).toFixed(2)),
                        companyValue: parseFloat((Math.random() * 10000).toFixed(2)),
                    }));
            }

            const total = mockData.length;
            const currentPageTotal = Math.min(take, total - (page - 1) * take);

            const customers: CustomerModel[] = mockData.slice((page - 1) * take, (page - 1) * take + currentPageTotal);

            return {
                totalCount: total,
                list: customers,
            };
        }

        const response = await axios.get<ResponseListData<CustomerModel>>(apiUrl, {
            params: { page, take },
        });

        return response.data;
    };

    const createCustomerAsync = async (
        customer: Partial<CustomerModel>
    ): Promise<CustomerModel | ErrorResponse> => {
        if (state.isMocked) {
            console.log('Creating customer:', customer);

            const newCustomer: CustomerModel = {
                ...customer as CustomerModel,
                id: Math.random().toString(),
            };

            mockData.push(newCustomer);
            return newCustomer;
        }

        try {
            const response = await axios.post<CustomerModel>(apiUrl, customer);
            return response.data;
        } catch (error) {
            return handleApiError(error);
        }
    };

    const updateCustomerAsync = async (
        id: string,
        customer: Partial<CustomerModel>
    ): Promise<void | ErrorResponse> => {
        if (state.isMocked) {
            console.log('Updating customer:', id, customer);

            const index = mockData.findIndex((c) => c.id === id);
            if (index >= 0) {
                mockData[index] = { ...mockData[index], ...customer };
            } else {
                console.warn(`Cliente com ID ${id} não encontrado.`);
            }
            return;
        }

        try {
            await axios.put(`${apiUrl}/${id}`, customer);
        } catch (error) {
            return handleApiError(error);
        }
    };

    const deleteCustomerAsync = async (id: string): Promise<void | ErrorResponse> => {
        if (state.isMocked) {
            console.log('Deleting customer:', id);

            const index = mockData.findIndex((c) => c.id === id);
            if (index >= 0) {
                mockData.splice(index, 1);
            } else {
                console.warn(`Cliente com ID ${id} não encontrado.`);
            }
            return;
        }

        try {
            await axios.delete(`${apiUrl}/${id}`);
        } catch (error) {
            return handleApiError(error);
        }
    }


    return { getAllCustomersAsync, createCustomerAsync, updateCustomerAsync, deleteCustomerAsync };
};

export default useCustomerService;
