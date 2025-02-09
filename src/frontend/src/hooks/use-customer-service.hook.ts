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

    type GetCustomersParams = {
        onlySelected?: boolean;
        page: number;
        take: number;
    };

    const getAllCustomersAsync = async (props: GetCustomersParams = { page: 1, take: 16, onlySelected: false }): Promise<ResponseListData<CustomerModel>> => {
        const { page, take, onlySelected } = props;

        if (state.isMocked) {
            if (mockData == undefined) {
                mockData = Array(30)
                    .fill(0)
                    .map((_, index) => ({
                        id: index.toString(),
                        name: `Cliente ${(index + 1) + (page - 1) * take}`,
                        salary: parseFloat((Math.random() * 10000).toFixed(2)),
                        companyValue: parseFloat((Math.random() * 10000).toFixed(2)),
                        selected: false,
                    }));
            }

            const customers: CustomerModel[] = mockData
                .filter((c) => (onlySelected ? c.selected : true));

            const total = customers.length;
            const currentPageTotal = Math.min(take, total - (page - 1) * take);

            return {
                totalCount: total,
                list: customers.slice((page - 1) * take, (page - 1) * take + currentPageTotal),
            };
        }

        const response = await axios.get<ResponseListData<CustomerModel>>(apiUrl, {
            params: { page, take, onlySelected },
        });

        return response.data;
    };

    const createCustomerAsync = async (
        customer: Partial<CustomerModel>
    ): Promise<CustomerModel | ErrorResponse> => {
        if (state.isMocked) {
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
    };

    const cleanSelectedCustomersAsync = async (): Promise<void | ErrorResponse> => {
        if (state.isMocked) {
            mockData.forEach((c) => {
                c.selected = false;
            });
            return;
        }

        try {
            await axios.put(`${apiUrl}/clean-selected`);
        } catch (error) {
            return handleApiError(error);
        }
    };

    return { getAllCustomersAsync, createCustomerAsync, updateCustomerAsync, deleteCustomerAsync, cleanSelectedCustomersAsync };
};

export default useCustomerService;
