import { render, cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '../pages/LoginForm';
import { LoginFormMock } from '../_mock_/LoginMock';

describe('LoginForm', () => {
    afterEach(cleanup);
    afterEach(jest.clearAllMocks);

    beforeAll(()=> {
        render(<LoginForm />);
    });

    it('should display two inputs', async () => {
        const usernameInput = screen.getByLabelText(/nombre de usuario/i);
        const passwordInput = screen.getByLabelText(/contraseña/i);

        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();

        expect(usernameInput).toHaveValue('');
        expect(passwordInput).toHaveValue('');

        await userEvent.type(usernameInput, LoginFormMock.username);
        await userEvent.type(passwordInput, LoginFormMock.password);
       

        await waitFor(() => {
            expect(usernameInput).toHaveValue(LoginFormMock.username);
            expect(passwordInput).toHaveValue(LoginFormMock.password);
        })
    });
}); 