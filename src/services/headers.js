export default {
  createHeadersGet(baseUrl, url, attachement) {
    if (attachement === undefined) {
      return {
        baseURL: baseUrl,
        url: url,
        method: "GET",
      };
    } else {
      return {
        baseURL: baseUrl,
        url: url,
        method: "GET",
        responseType: "arraybuffer",
      };
    }
  },
  createHeadersPost(baseUrl, url, body, attachement) {
    if (attachement === true) {
      return {
        baseURL: baseUrl,
        url: url,
        data: body,
        headers: {
          "content-type": "multipart/form-data",
        },
        method: "POST",
      };
    } else {
      return {
        baseURL: baseUrl,
        url: url,
        data: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          "Content-Length": JSON.stringify(body).length,
        },
        method: "POST",
      };
    }
  },
  createHeadersPut(baseUrl, url, body) {
    if (body !== undefined) {
      return {
        baseURL: baseUrl,
        url: url,
        data: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        method: "PUT",
      };
    } else {
      return {
        baseURL: baseUrl,
        url: url,
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        method: "PUT",
      };
    }
  },
  createHeadersPostMulti(baseUrl, url, body) {
    return {
      baseURL: baseUrl,
      url: url,
      data: JSON.stringify(body),
      headers: {
        "content-type": "multipart/form-data",
      },
      method: "POST",
    };
  },
  createHeadersPostDistinct(baseUrl, url, body) {
    return {
      baseURL: baseUrl,
      url: url,
      data: body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    };
  },
};
