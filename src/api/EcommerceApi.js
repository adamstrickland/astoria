import axios from "axios"
import Qs from "qs"

class EcommerceApi {
  constructor({
    endpointUrl,
    authToken,
    version,
  }) {
    this.endpointUrl = endpointUrl;
    this.authToken = authToken;
    this.version = version;
  }

  categories() {
    return this._get("/api/categories");
  }

  _urlFor(path) {
    return `${this.endpointUrl}${path}`;
  }

  _acceptFor(version) {
    const v = version || "2.0"
    return `application/json;v=${v};schema=gramercy`;
  }

  async _get(path, params = {}, headers = {}) {
    const authToken = this.authToken;
    const endpointUrl = this.endpointUrl;
    const accept = this._acceptFor(this.version);

    const client = axios.create({
      endpointUrl,
      headers: {
        "Accept": accept,
        "X-Client-Authentication-Token": authToken,
      },
      paramsSerializer: (p) => Qs.stringify(p, { arrayFormat: "brackets" }),
      validateStatus: (s) => s < 400,
    });

    const url = this._urlFor(path);

    return await client.get(
      url,
      {
        params: params,
        headers: headers,
      }
    );
  }
}

export default EcommerceApi;
