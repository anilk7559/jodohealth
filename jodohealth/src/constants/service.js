import * as Url from "./urls";

export const get = async (url, token, hide = false) => {
  var headers;
  if (token == "" || token == null || token == undefined) {
    headers = {
      "Content-Type": "application/json",
    };
  } else {
    headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }
  const completeUrl = Url.BASE_URL + url;
  console.log("completeUrl", completeUrl);
  try {
    const res = await fetch(completeUrl, {
      method: "GET",
      headers,
    });
    const response = await res.json();
    if (response.code == 401) {
      window.location.replace("/");
    }
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const post = async (url, token, body, hide = false) => {
  var headers;
  if (token == "" || token == null || token == undefined) {
    headers = {
      "Content-Type": "application/json",
    };
  } else {
    headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
  }
  const completeUrl = Url.BASE_URL + url;
  let data = JSON.stringify(body);
  console.log("completeUrl", completeUrl, body, headers);
  try {
    const res = await fetch(completeUrl, {
      method: "POST",
      headers,
      body: data,
    });
    const response = await res.json();
    console.log(res, "resssssssssssssss");
    if (response.code == 401) {
      window.location.replace("/");
    }
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const put = async (url, token, body, hide = false) => {
  var headers;
  if (token == "" || token == null || token == undefined) {
    headers = {
      "Content-Type": "application/json",
    };
  } else {
    headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
  }
  const completeUrl = Url.BASE_URL + url;
  let data = JSON.stringify(body);
  console.log("completeUrl", completeUrl, body, headers);
  try {
    const res = await fetch(completeUrl, {
      method: "PUT",
      headers,
      body: data,
    });
    const response = await res.json();
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const deleteApi = async (url, token, body, hide = false) => {
  var headers;
  if (token == "" || token == null || token == undefined) {
    headers = {
      "Content-Type": "application/json",
    };
  } else {
    headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }
  const completeUrl = Url.BASE_URL + url;
  let data = JSON.stringify(body);
  console.log("completeUrl", completeUrl, body, headers);
  try {
    const res = await fetch(completeUrl, {
      method: "DELETE",
      headers,
      body: data,
    });
    const response = await res.json();
    if (response.code == 401) {
      window.location.replace("/");
    }
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const uploadImageApi = async (url, token, formData, hide = false) => {
  console.log(formData, token, url, "image upload=======");
  var headers;

  if (token == "" || token == null || token == undefined) {
    headers = {
      Accept: "application/json",
    };
  } else {
    headers = {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    };
  }
  const completeUrl = Url.BASE_URL + url;
  console.log("completeUrl", completeUrl);
  try {
    const res = await fetch(completeUrl, {
      method: "POST",
      headers: headers,
      body: formData,
    });
    console.log("check the response", res);
    let response = await res.json();
      if (response.status === 401) { 
        window.location.replace("/");
    }
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}
export const uploadImagePutApi = async (url, token, formData, hide = false) => {
  console.log(formData, token, url, "image upload=======");
  var headers;

  if (token == "" || token == null || token == undefined) {
    headers = {
      Accept: "application/json",
    };
  } else {
    headers = {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    };
  }
  const completeUrl = Url.BASE_URL + url;
  console.log("completeUrl", completeUrl);
  try {
    const res = await fetch(completeUrl, {
      method: "PUT",
      headers: headers,
      body: formData,
    });
    console.log("check the response", res);
    let response = await res.json();
      if (response.status === 401) { 
        window.location.replace("/");
    }
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}