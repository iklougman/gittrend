import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Card from "./Card";
import { mockRepoOne } from "./fixtures/github_repository_mock";

describe("<Card />", () => {
  describe("Given an empty repository object", () => {
    it("Shows ean empty card with default data ", async () => {
      const mockEmptyRepository = {};
      const { asFragment } = render(<Card repo={mockEmptyRepository} />);

      expect(asFragment()).toMatchSnapshot();
      screen.getByText("No description");
    });
  });

  describe("Given correct github repository data object:", () => {
    beforeEach(() => {
      localStorage.clear();
    });
    it("Shows ean empty card with default data ", async () => {
      const { asFragment } = render(<Card repo={mockRepoOne} />);

      screen.getByText(/hivemind/);
      screen.getByText(/253/);

      screen.getByText(
        "For creating distributed jobs using AWS Lambda functions"
      );
      expect(asFragment()).toMatchSnapshot();
    });
    describe("When clicking on the 'Star Repo' button", () => {
      it("Saves in the localStorage the 'id' of the starred repository", () => {
        render(<Card repo={mockRepoOne} />);
        expect(localStorage.getItem(101689336)).toBeNull();
        fireEvent.click(screen.getByTestId("star-repo-btn"));

        expect(localStorage.getItem(101689336)).not.toBeNull();
      });
    });
    describe("When clicking on the 'Star Repo' button of an already starred repository", () => {
      it("Removes from the localStorage the 'id' of the starred repository", async () => {
        render(<Card repo={mockRepoOne} />);
        fireEvent.click(screen.getByTestId("star-repo-btn"));
        expect(localStorage.getItem(101689336)).not.toBeNull();
        fireEvent.click(screen.getByTestId("star-repo-btn"));
        expect(localStorage.getItem(101689336)).toBeNull();
      });
    });
  });
});
