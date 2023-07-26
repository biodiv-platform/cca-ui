import { ENDPOINT } from "@static/constants";
import { waitForAuth } from "@utils/auth";
import { cleanAggregationData } from "@utils/field";
import { http, plainHttp } from "@utils/http";
import { cleanTemplate } from "@utils/json";
import { stringify } from "@utils/query-string";

export const axGetTemplateByShortName = async (shortName, language?) => {
  try {
    const { data } = await plainHttp.get(`${ENDPOINT.CCA}/v1/template/${shortName}`, {
      params: { language }
    });

    return { success: true, data };
  } catch (e) {
    console.error(e);

    return { success: false, data: {} };
  }
};

export const getTemplateByShortOrParentName = async (shortName, locale?) => {
  const { data: _tMain } = await axGetTemplateByShortName(shortName, locale);

  // if template contains parent then re-fetch that template
  if (_tMain.parentName) {
    const { data: _tParent } = await axGetTemplateByShortName(_tMain.parentName, locale);
    return _tParent;
  }

  return _tMain;
};

export const axGetTemplateResponseById = async (responseId, params = {}) => {
  try {
    const { data } = await plainHttp.get(`${ENDPOINT.CCA}/v1/data/${responseId}`, { params });

    return { success: true, data };
  } catch (e) {
    console.error(e);

    return { success: false, data: null };
  }
};

export const axDeleteTemplateResponseById = async (responseId) => {
  try {
    const { data } = await http.delete(`${ENDPOINT.CCA}/v1/data/delete/${responseId}`);

    return { success: true, data };
  } catch (e) {
    console.error(e);

    return { success: false, data: {} };
  }
};

export const axGetAllTemplates = async (ctx, params = {}) => {
  try {
    const { data } = await http.get(`${ENDPOINT.CCA}/v1/template/all`, {
      params: { ctx, ...params }
    });

    return { success: true, data };
  } catch (e) {
    console.error(e);

    return { success: false, data: [] };
  }
};

export const axCreateTemplate = async (payload) => {
  try {
    const { data } = await http.post(`${ENDPOINT.CCA}/v1/template/save`, payload);

    return { success: true, data };
  } catch (e) {
    console.error(e);

    return { success: false, data: {} };
  }
};

export const axUpdateTemplate = async (payload, language?) => {
  try {
    const { data } = await http.put(`${ENDPOINT.CCA}/v1/template/update`, cleanTemplate(payload), {
      params: { language }
    });

    return { success: true, data };
  } catch (e) {
    console.error(e);

    return { success: false, data: {} };
  }
};

export const axDeleteTemplate = async (templateId) => {
  try {
    const { data } = await http.delete(`${ENDPOINT.CCA}/v1/template/delete/${templateId}`);

    return { success: true, data };
  } catch (e) {
    console.error(e);

    return { success: false, data: {} };
  }
};

export const axSaveParticipation = async (payload) => {
  try {
    const { data } = await http.post(`${ENDPOINT.CCA}/v1/data/save`, payload);

    return { success: true, data };
  } catch (e) {
    console.error(e);

    return { success: false, data: {} };
  }
};

export const axUpdateParticipation = async (payload) => {
  try {
    const { data } = await http.put(`${ENDPOINT.CCA}/v1/data/update`, payload);

    return { success: true, data };
  } catch (e) {
    console.error(e);

    return { success: false, data: {} };
  }
};

export const axToggleDocumentFollow = async (isFollow, id) => {
  try {
    const { data } = await http.put(`${ENDPOINT.CCA}/v1/data/update/followers`, {
      id,
      type: isFollow ? "follow" : "unfollow"
    });

    return { success: true, data };
  } catch (e) {
    console.error(e);

    return { success: false, data: {} };
  }
};

export const axGetTemplateResponseTableByShortName = async (shortName) => {
  try {
    const { data } = await http.get(`${ENDPOINT.CCA}/v1/data/all?${stringify(shortName)}`, {});

    return { success: true, data };
  } catch (e) {
    console.error(e);

    return { success: false, data: [] as any };
  }
};

export const getLoactionInfo = async ([lon, lat]) => {
  try {
    const { data } = await plainHttp.get(`${ENDPOINT.NAKSHA}/layer/locationInfo`, {
      params: { lat, lon }
    });

    return { success: true, data };
  } catch (e) {
    console.error(e);

    return { success: false, data: {} };
  }
};

export const axGetDataListAggregation = async (params) => {
  try {
    const { data } = await plainHttp.get(
      `${ENDPOINT.CCA}/v1/data/aggregation?${stringify(params)}`
    );

    return { success: true, data: cleanAggregationData(data) };
  } catch (e) {
    console.error(e);

    return { success: false, data: [], aggregation: {} };
  }
};

export const axGetDataListMap = async (params?) => {
  try {
    const { data } = await plainHttp.get(
      `${ENDPOINT.CCA}/v1/data/map/info?${stringify(params || {})}`
    );

    return { success: true, data };
  } catch (e) {
    console.error(e);

    return { success: false, data: [], aggregation: {} };
  }
};

export const axGetDataSummaryById = async (id) => {
  try {
    const { data } = await plainHttp.get(`${ENDPOINT.CCA}/v1/data/summary/${id}`);

    return { success: true, data };
  } catch (e) {
    console.error(e);

    return { success: false, data: {} };
  }
};

export const axGetMapAndAggregation = async (params) => {
  const [_aggregation, _map] = await Promise.all([
    axGetDataListAggregation(params),
    axSearchMapCCAData(params)
  ]);
  return {
    success: _aggregation.success && _map.success,
    aggregation: _aggregation.data,
    map: _map.data
  };
};

export const axGetDataListPage = async (params) => {
  try {
    const { data } = await plainHttp.get(`${ENDPOINT.CCA}/v1/data/page?${stringify(params)}`);

    return { success: true, ...data };
  } catch (e) {
    console.error(e);

    return { success: false, data: [] };
  }
};

export const axGetTemplateResponseList = async (params) => {
  try {
    const {
      data: { aggregation, ccaDataList }
    } = await plainHttp.get(`${ENDPOINT.CCA}/v1/data/list?${stringify(params)}`);

    return { success: true, data: ccaDataList, aggregation: cleanAggregationData(aggregation) };
  } catch (e) {
    console.error(e);

    return { success: false, data: [], aggregation: {} };
  }
};

export const axGetFiltersListByShortName = async (params) => {
  try {
    const { data } = await plainHttp.get(`${ENDPOINT.CCA}/v1/template/filter/fields`, { params });

    return { success: true, data };
  } catch (e) {
    console.error(e);

    return { success: false, data: {} };
  }
};

export const axGetUserParticipations = async (params) => {
  try {
    const { data } = await http.get(`${ENDPOINT.CCA}/v1/data/myList/?${stringify(params)}`);

    return { success: true, data: data.ccaDataList };
  } catch (e) {
    console.error(e);

    return { success: false, data: [] };
  }
};

export const axPullTemplateTranslations = async (params) => {
  try {
    const { data } = await http.get(`${ENDPOINT.CCA}/v1/template/pullMasterTranslation`, {
      params
    });

    return { success: true, data };
  } catch (e) {
    console.error(e);

    return { success: false, data: {} };
  }
};

export const axUpdateParticipationUsers = async (payload) => {
  try {
    const { data } = await http.put(`${ENDPOINT.CCA}/v1/data/update/permission`, payload);

    return { success: true, data };
  } catch (e) {
    console.error(e);

    return { success: false, data: {} };
  }
};

export const axAddAcitivityComment = async (payload) => {
  try {
    await waitForAuth();
    const { data } = await http.post(`${ENDPOINT.CCA}/v1/data/comment`, payload);
    return { success: true, data };
  } catch (e) {
    console.error(e);
    return { success: false, data: [] };
  }
};

export const axAddTemplateAcitivityComment = async (payload) => {
  try {
    await waitForAuth();
    const { data } = await http.post(`${ENDPOINT.CCA}/v1/template/comment`, payload);
    return { success: true, data };
  } catch (e) {
    console.error(e);
    return { success: false, data: [] };
  }
};

export const axsendContributorRequest = async (payload) => {
  try {
    const { data } = await http.post(`${ENDPOINT.CCA}/v1/data/request`, payload);
    return { success: true, data };
  } catch (e) {
    console.error(e);
    return { success: false, data: {} };
  }
};

export const axVerifyContributorPermission = async (token) => {
  try {
    await http.post(`${ENDPOINT.CCA}/v1/data/grant`, { token });
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};

export const axDownloadRequest = async (params) => {
  try {
    const { data } = await http.post(`${ENDPOINT.CCA}/v1/data/all/download?${stringify(params)}`);
    return { success: true, data };
  } catch (e) {
    return { success: false, data: {} };
  }
};

export const axGetCCAData = async (params) => {
  try {
    const { data } = await plainHttp.get(`${ENDPOINT.CCA}/v1/data/${params}`);
    return { success: true, data };
  } catch (e) {
    return { success: false, data: {} };
  }
};

export const axSearchCCAData = async (params) => {
  try {
    const { data } = await plainHttp.get(`${ENDPOINT.CCA}/v1/data/search?${stringify(params)}`);

    return { success: true, ...data };
  } catch (e) {
    return { success: false, data: {} };
  }
};

export const axSearchMapCCAData = async (params) => {
  try {
    const { data } = await plainHttp.get(`${ENDPOINT.CCA}/v1/data/search/map?${stringify(params)}`);
    return { success: true, data };
  } catch (e) {
    return { success: false, data: {} };
  }
};
