import React from "react";
import { render, screen } from "@testing-library/react";
import BookTable from "./BookTable";

const books = [
    {
        id: 1,
        book_author: 'herr schmidt',
        book_title: 'requim for a dream',
        book_publication_year: 2001, 
        book_publication_country: 'United States',
        book_publication_city: 'Los Angeles', 
        book_pages: 203,
    },
    {
        id: 2,
        book_author: 'barack obama',
        book_title: 'dream child from hawaii',
        book_publication_year: 1962, 
        book_publication_country: 'Angola',
        book_publication_city: 'Luanda', 
        book_pages: 503,
    }
]

it("renders without crashing", function () {
  // this is a low-value test, but better than nothing
  render(<BookTable books={books} />);
});

it("has the correct data in table", function () {
    render(<BookTable books={books} />);
    expect(screen.getByText('herr schmidt')).toBeInTheDocument()
});


it("matches snapshot", function () {
  const { container } = render(<BookTable books={books} />);
  expect(container).toMatchSnapshot();
});

