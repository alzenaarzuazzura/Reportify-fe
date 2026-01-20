import { TComboFetchParams, TResponseCombo } from "@reportify/types";
import apiReportify from '@reportify/services/api';
import { AxiosResponse } from "axios";

const validateResponse = <T extends TResponseCombo = TResponseCombo>(
	response: AxiosResponse<T>,
) => {
	if (response.data && response.data.status) {
		return response.data.data
	}
	return Promise.reject(response.data)
}

export async function subject(params: TComboFetchParams) {
    return apiReportify
        .get<TResponseCombo>('/combo/subjects', { params: { ...params } })
        .then(validateResponse)
}

export async function level(params: TComboFetchParams) {
    return apiReportify
        .get<TResponseCombo>('/combo/levels', { params: { ...params } })
        .then(validateResponse)
}

export async function major(params: TComboFetchParams) {
    return apiReportify
        .get<TResponseCombo>('/combo/majors', { params: { ...params } })
        .then(validateResponse)
}

export async function rombel(params: TComboFetchParams) {
    return apiReportify
        .get<TResponseCombo>('/combo/rombels', { params: { ...params } })
        .then(validateResponse)
}

export async function classes(params: TComboFetchParams) {
    return apiReportify
        .get<TResponseCombo>('/combo/classes', { params: { ...params } })
        .then(validateResponse)
}

export async function teacher(params: TComboFetchParams) {
    return apiReportify
        .get<TResponseCombo>('/combo/teachers', { params: { ...params } })
        .then(validateResponse)
}

export async function role(params: TComboFetchParams) {
    return apiReportify
        .get<TResponseCombo>('/combo/roles', { params: { ...params } })
        .then(validateResponse)
}

export async function teachingAssignment(params: TComboFetchParams) {
    return apiReportify
        .get<TResponseCombo>('/combo/teaching-assignments', { params: { ...params } })
        .then(validateResponse)
}