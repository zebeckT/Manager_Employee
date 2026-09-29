import axiosClient from "./axiosClient";

const END_POINT = {
    Employees: "employees",
}

export const getTodosAPI = () => {
    return axiosClient.get(`${END_POINT.Employees}`);
}

export const delTodosAPI = (id) => {
    return axiosClient.delete(`${END_POINT.Employees}/${id}`);
}

export const addTodosAPI = (todo) => {
    return axiosClient.post(`${END_POINT.Employees}`, todo);
}

export const editTodosAPI = (todo) => {
    return axiosClient.put(`${END_POINT.Employees}`, todo);
}