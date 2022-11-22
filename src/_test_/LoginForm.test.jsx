import { render, cleanup, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import user from '@testing-library/user-event';
import { LoginForm } from '../pages/LoginForm';
import { LoginFormMock, LoginFormMockError } from '../_mock_/LoginMock';

describe('LoginForm', () => {
    afterEach(cleanup);
    afterEach(jest.clearAllMocks);

    beforeEach(()=> {
        render(<LoginForm />);
    });

    it('should display two inputs', () => {
        const usernameInput = screen.getByLabelText(/nombre de usuario/i);
        const passwordInput = screen.getByLabelText(/contraseña/i);

        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();

        expect(usernameInput).toHaveValue('');
        expect(passwordInput).toHaveValue('');        
    });

    it ('should exist button enable if form values are valid', async () => {
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

        //await waitFor(() => expect(submitButton).toBeDisabled(""));
        // const handleClick = jest.fn()
        // await user.click(submitButton);
        // expect(handleClick).toHaveBeenCalledTimes(1)
    });    

    it ('should disable submit button if form values are incorrect', async () => {
        const usernameInput = screen.getByLabelText(/nombre de usuario/i);
        const passwordInput = screen.getByLabelText(/contraseña/i);
        const submitButton = screen.getByRole('button', { name: /login/i });        

        await userEvent.type(usernameInput, LoginFormMock.username);
        await userEvent.type(passwordInput, LoginFormMock.password);

        await waitFor(() => {
          expect(usernameInput).toHaveValue(LoginFormMockError.username);
          expect(passwordInput).toHaveValue(LoginFormMockError.password);                         
        });
    });    
    
}); 