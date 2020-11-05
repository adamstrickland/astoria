import EcommerceApi from "./EcommerceApi"

describe("EcommerceApi", () => {
  const endpointUrl = "https://api.bonobos.com";
  const authToken = process.env.ASTORIA_FLATIRON_API_TOKEN;
  const version = 2.1;

  const instance = new EcommerceApi({
    endpointUrl: endpointUrl,
    authToken: authToken,
    version: version,
  });

  beforeEach(() => {
    expect(authToken).toBeDefined();
  });

  describe("_urlFor()", () => {
    const path = "/foo";
    const subject = (() => instance._urlFor(path));

    it("should be prepend the protocol", () => {
      expect(subject()).toMatch(/^http/);
    });

    it("should be prepend the domain", () => {
      expect(subject()).toMatch(endpointUrl);
    });

    it("should be prepend the port", () => {
      // expect(subject()).toMatch(/^http/);
    });
  });

  describe("categories()", () => {
    const subject = (() => instance.categories());

    it("should be JSON-ish", async () => {
      expect(subject()).resolves.toHaveProperty("data.categories");
    });

    it("should be JSON-ish", (done) => {
      subject().then((r) => {
        expect(r.data).toMatchObject({ categories: {}});
        done();
      });
    });
  });
});
