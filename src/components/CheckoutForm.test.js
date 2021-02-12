import React from "react";
import { render, screen } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import userEvent from "@testing-library/user-event";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {

    render(<CheckoutForm />)

    const header = screen.getByText(/checkout form/i);

    expect(header).toBeInTheDocument();
});

test("form shows success message on submit with form details", () => {

    render(<CheckoutForm />)

    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const addressInput = screen.getByLabelText(/address/i);
    const cityInput = screen.getByLabelText(/city/i);
    const stateInput = screen.getByLabelText(/state/i);
    const zipInput = screen.getByLabelText(/zip/i);

    userEvent.type(firstNameInput, 'Alex');
    userEvent.type(lastNameInput, 'Wallander');
    userEvent.type(addressInput, '1234 Lulaby Lane');
    userEvent.type(cityInput, 'Cedar Rapids');
    userEvent.type(stateInput, 'Iowa');
    userEvent.type(zipInput, '52405');
    
    const button = screen.getByRole('button', {name: /checkout/i});
    expect.objectContaining({
        'firstName': 'Alex',
        'lastName': 'Wallander',
        'address': '1234 Lulaby Lane',
        'city': 'Cedar Rapids',
        'state': 'Iowa',
        'zip': '52405',
    })

    userEvent.click(button);

    const successMessage = screen.getByTestId(/successMessage/i);

    expect(successMessage).toBeInTheDocument();
});
