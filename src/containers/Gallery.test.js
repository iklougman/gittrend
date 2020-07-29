import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Gallery from "./Gallery";
import {
  mockRepoOne,
  mockRepoTwo,
  mockRepoThree,
} from "./fixtures/github_repository_mock";

describe("<Gallery />", () => {
  describe("Given no data from the API", () => {
    it("displays a no data text", async () => {
      const { getByTestId } = render(<Gallery fetcher={async () => []} />);
      await waitFor(() => {
        expect(getByTestId("no-data-from-api")).toBeInTheDocument();
      });
    });
  });
  describe("Given the API returning an error 4xx", () => {
    it("displays a service not available text", async () => {
      const { getByTestId } = render(
        <Gallery
          fetcher={async () => {
            throw new Error();
          }}
        />
      );
      await waitFor(() => {
        expect(getByTestId("error-from-api")).toBeInTheDocument();
      });
    });
  });
  describe("Given the API returning correct data", () => {
    it("displays a list of repositories in Cards", async () => {
      const repositories = [mockRepoOne, mockRepoTwo, mockRepoThree];
      render(<Gallery fetcher={async () => repositories} />);
      const items = await screen.findAllByTestId("repo-card");
      expect(items).toHaveLength(3);
      repositories.map((r) => {
        screen.getByText(r.full_name);
      });
    });
  });
});
