import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '../pages/LoginForm';
import { LoginFormMock, LoginFormMockError } from '../_mock_/LoginMock';
import axios from 'axios';

jest.mock('axios');

describe('LoginForm', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: { LoginFormMock } });
    render(<LoginForm />);
  });

    test('should display two inputs', () => {
        const usernameInput = screen.getByLabelText(/nombre de usuario/i)
        const passwordInput = screen.getByLabelText(/contraseña/i);

        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();

        expect(usernameInput).toHaveValue('');
        expect(passwordInput).toHaveValue('');        
    });

    test('should display the submit button in the form', () => {
        expect(screen.getByText(/login/i)).toBeInTheDocument();
    });

    test ('should exist button enable if form values are valid', async () => {
        const usernameInput = screen.getByLabelText(/nombre de usuario/i);
        const passwordInput = screen.getByLabelText(/contraseña/i);
        const submitButton = screen.getByRole('button', { name: /login/i });

        expect(submitButton).toBeDisabled();

        await userEvent.type(usernameInput, LoginFormMock.username);
        await userEvent.type(passwordInput, LoginFormMock.password);

        await waitFor(() => {
          expect(usernameInput).toHaveValue(LoginFormMock.username);
          expect(passwordInput).toHaveValue(LoginFormMock.password);                         
        });

        await waitFor(() => {
            expect(screen.getByText(`Username: ${LoginFormMock.username}`)).toBeInTheDocument();
        });
      
        await waitFor(() => {
            expect(screen.getByText(`Password: ${LoginFormMock.password}`)).toBeInTheDocument();
        });        
    });    

    it ('should disable submit button if form values are incorrect', async () => {
        const usernameInput = screen.getByLabelText(/nombre de usuario/i);
        const passwordInput = screen.getByLabelText(/contraseña/i);
        const submitButton = screen.getByRole('button', { name: /login/i });        

        await userEvent.type(usernameInput, LoginFormMockError.username);
        await userEvent.type(passwordInput, LoginFormMockError.password);

        await waitFor(() => {
          expect(usernameInput).toHaveValue(LoginFormMockError.username);
          expect(passwordInput).toHaveValue(LoginFormMockError.password);
          expect(screen.getByText(/username debe ser máximo de 12 caracteres/i)).toBeInTheDocument();
          expect(submitButton).toBeDisabled();                         
        });
    });    

    it ('form can be submit when info is correct and button is clicked', async () => {
        const usernameInput = screen.getByLabelText(/nombre de usuario/i);
        const passwordInput = screen.getByLabelText(/contraseña/i);
        const submitButton = screen.getByRole('button');        

        await userEvent.type(usernameInput, LoginFormMock.username);
        await userEvent.type(passwordInput, LoginFormMock.password);

        await fireEvent.click(submitButton);
    });    
    
}); 