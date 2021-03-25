/**
 * @jest-environment jsdom
 */
import { jest } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import fs from "fs";
import { JSDOM } from "jsdom";
import path from "path";
import { makeAPICall } from "../server/api";

const __dirname = path.resolve();

const html = fs.readFileSync(
  path.resolve(__dirname, "./public/index.html"),
  "utf8"
);
let dom;
let container;

describe("index.html", () => {
  beforeEach(() => {
    // https://github.com/jsdom/jsdom#executing-scripts
    dom = new JSDOM(html);
    container = dom.window.document.body;
  });

  it("Header", () => {
    const h1 = container.querySelector("h1");
    expect(h1).not.toBeNull();
    expect(h1.innerHTML).toEqual(expect.stringContaining("Flickr Gallery"));
  });

  it("Search", () => {
    const searchform = container.querySelector("#search-form");
    expect(searchform).not.toBeNull();

    const searchButton = container.querySelector("#submit-search");
    expect(searchButton).toHaveAttribute(
      "type",
      expect.stringContaining("sub")
    );

    const search = container.querySelector("#search-val");
    search.value = "dog";

    expect(search.value).not.toBeNull();
    expect(search.value).toBe("dog");
  });

  it("Results", () => {
    const label = container.querySelector("#results-label");
    expect(label).not.toBeNull();
    expect(label.innerHTML).toEqual(expect.stringContaining("No. of results:"));

    const select = container.querySelector("#results");
    expect(select.children.length).toBe(4);
  });

  it("Geo Query", () => {
    const geoQuery = container.querySelector("#radius-search");
    expect(geoQuery).not.toBeNull();
    expect(geoQuery).toBeInTheDocument();
    expect(geoQuery).not.toBeRequired();

    expect(geoQuery).not.toHaveAttribute("checked");
  });

  it("Search", () => {
    const searchform = container.querySelector("#search-form");
    expect(searchform).not.toBeNull();
    const search = container.querySelector("#search-val");
    search.value = "dog";

    expect(search.value).not.toBeNull();
    expect(search.value).toBe("dog");
  });

  it("Gallery", () => {
    const searchform = container.querySelector("#search-form");
    expect(searchform).not.toBeNull();
    const search = container.querySelector("#search-val");
    search.value = "dog";

    expect(search.value).not.toBeNull();
    expect(search.value).toBe("dog");

    // Check with mock data to simulate fetched images
    document.body.innerHTML = `
    <div id="gallery">
      <div class="cell">
        <img src="https://live.staticflickr.com/65535/51059959471_debef1da01_w.jpg">
      </div>
      <div class="cell">
        <img src="https://live.staticflickr.com/65535/51059959471_debef1da01_w.jpg">
      </div>
    </div>
    `;
    const gallery = document.querySelector("#gallery");
    expect(searchform).not.toBeNull();
    expect(gallery.children.length).toBe(2);
    // Test first <img> in first <div class="cell">
    const firstCell = gallery.children.item(0);
    expect(firstCell.children.item(0)).toHaveAttribute(
      "src",
      "https://live.staticflickr.com/65535/51059959471_debef1da01_w.jpg"
    );
  });
});

jest.mock("axios");
test("Test API response", async () => {
  /* I'm aware that doing an actual network request opens up to all sorts of false negatives.
   I've tried creating a mocks etc but decided to focus on other thing because of time constraints.
   To alleviate this issue, the API search is purposefully very specific such that 
   it is guaranteed to return the same response (1 photo).
 */
  const data = {
    text: "cygni star dog",
    resultsCount: 1,
    isRadiusSearch: false,
  };
  const response = await makeAPICall(data); // Run the function
  expect(response.status).toEqual(200);
  expect(response.headers).toHaveProperty("content-type");
  expect(response.headers["content-type"]).toBe("application/json");
  const photo = response.data.photos.photo[0];
  expect(photo.title).toEqual(
    expect.stringContaining("The Dog Star Over the Common")
  );
  expect(photo.id).toEqual(expect.stringContaining("13934024673"));
});
